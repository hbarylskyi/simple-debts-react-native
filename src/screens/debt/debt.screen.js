import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from './debt.styles';
import DebtPopup from './debtPopup/debtPopup';
import Operation from '../../components/Operation/Operation.presenter';
import opaqueHeader from '../../components/styles/opaqueHeader';
import OperationPopup from './OperationPopup/OperationPopup';
import Button from '../../components/Button/Button';
import * as colors from '../../colors';
import Hamburger from '../../components/Hamburger/Hamburger';

// list of states the debt can be in. Calculated depending on
// debt.statusAcceptor and debt.status
const debtStates = {
  NORMAL: 'NORMAL',
  REQUEST_RECEIVED: 'REQUEST_RECEIVED',
  REQUEST_SENT: 'REQUEST_SENT',
  BECAME_VITUAL: 'BECAME_VITUAL',
  JOIN_VIRTUAL_SENT: 'JOIN_VIRTUAL_SENT',
  JOIN_VIRTUAL_RECEIVED: 'JOIN_VIRTUAL_RECEIVED'
};

export default class DebtScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    processError: PropTypes.func.isRequired,
    fetchDebt: PropTypes.func.isRequired,
    fetchDebts: PropTypes.func.isRequired,
    processOperation: PropTypes.func.isRequired,
    newOperation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    debt: PropTypes.object.isRequired,
    declineDebt: PropTypes.func.isRequired,
    acceptDebt: PropTypes.func.isRequired,
    deleteDebt: PropTypes.func.isRequired
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerStyle: opaqueHeader,
      headerTintColor: 'white',
      headerRight: params.headerRight
    };
  };

  state = {
    givePopupVisible: false,
    takePopupVisible: false,
    scrollEnabled: true,
    refreshing: false,
    opPopupShown: false,
    chosenOperation: {}
  };

  componentDidMount() {
    this.props.navigation.setParams({ headerRight: this.renderHeaderRight() });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDebt(this.props.debt.id);
    this.setState({ refreshing: false });
  };

  getDebtState = () => {
    const { debt, user } = this.props;

    if (debt.statusAcceptor === null || debt.status === 'CHANGE_AWAITING') {
      return debtStates.NORMAL;
    } else if (debt.status === 'CREATION_AWAITING') {
      return debt.statusAcceptor === user.id
        ? debtStates.REQUEST_RECEIVED
        : debtStates.REQUEST_SENT;
    } else if (debt.status === 'CONNECT_USER') {
      return debt.statusAcceptor === user.id
        ? debtStates.JOIN_VIRTUAL_RECEIVED
        : debtStates.JOIN_VIRTUAL_SENT;
    }
    // else if (debt.status === 'USER_DELETED') {
    //
    // }
  };

  setTakeValue = text => {
    this.state.takeValue = parseInt(text, 10);
  };

  setGiveValue = text => {
    this.state.giveValue = parseInt(text, 10);
  };

  processOperation = (oid, accepted) => {
    this.props.processOperation(oid, accepted).then(response => {
      if (response.error) {
        const { payload } = response;
        this.props.processError(payload.message, payload.response);
      }
    });
  };

  newOperation = (val, isGiven) => {
    const { debt, user } = this.props;
    const receiver = isGiven ? debt.user.id : user.id;
    const descr = isGiven ? this.state.giveDescr : this.state.takeDescr;

    if (!val || !descr) return;

    return this.props.newOperation(debt.id, val, receiver, descr).then(response => {
      if (response.error) {
        const { payload } = response;
        this.props.processError(payload.message, payload.response);
      } else if (isGiven) {
        this.toggleGivePopup();
      } else {
        this.toggleTakePopup();
      }
    });
  };

  toggleTakePopup = () =>
    this.setState(prevState => ({ takePopupVisible: !prevState.takePopupVisible }));

  toggleGivePopup = () =>
    this.setState(prevState => ({ givePopupVisible: !prevState.givePopupVisible }));

  showOpPopup = chosenOperation => this.setState({ opPopupShown: true, chosenOperation });

  closeOpPopup = () => this.setState({ opPopupShown: false });

  goBack = async () => {
    await this.props.fetchDebts();
    this.props.navigation.goBack();
  };

  // Operations with debt

  deleteDebt = async () => {
    try {
      await this.props.deleteDebt();
      this.goBack();
    } catch (e) {
      console.error(e.message);
    }
  };

  declineDebt = async () => {
    try {
      await this.props.declineDebt();
      this.goBack();
    } catch (e) {
      console.error(e.message);
    }
  };

  renderHeaderRight = () => {
    const data = [];

    if (this.getDebtState() === debtStates.NORMAL) {
      data.push(
        { text: 'Connect to a friend', onPress: () => {} },
        { text: 'Delete', onPress: this.deleteDebt }
      );
    }

    return <Hamburger data={data} />;
  };

  renderTakePopup = () =>
    (<DebtPopup
      isGivePopup={false}
      isVisible={this.state.takePopupVisible}
      onChangeVal={text => this.setTakeValue(text)}
      onChangeDescr={takeDescr => this.setState({ takeDescr })}
      onBackdropPress={this.toggleTakePopup}
      onSubmit={() => this.newOperation(this.state.takeValue, false)}
    />);

  renderGivePopup = () =>
    (<DebtPopup
      isGivePopup
      isVisible={this.state.givePopupVisible}
      onChangeVal={text => this.setGiveValue(text)}
      onChangeDescr={giveDescr => this.setState({ giveDescr })}
      onBackdropPress={this.toggleGivePopup}
      onSubmit={() => this.newOperation(this.state.giveValue, true)}
    />);

  renderSummary = () => {
    const { debt, user } = this.props;

    const isTaken = debt.moneyReceiver === user.id;
    const style = isTaken ? styles.summaryTaken : styles.summaryGiven;
    const debtText = `${isTaken
      ? `you owe ${debt.user.name}`
      : `${debt.user.name} owes you`}\n${debt.currency}${debt.summary}`;

    return (
      <View style={[styles.summaryContainer, style]}>
        <Text style={styles.moneyAmount}>
          {debtText}
        </Text>
      </View>
    );
  };

  renderBottomButtons = () => {
    const { acceptDebt } = this.props;
    const buttons = [];

    switch (this.getDebtState()) {
      case debtStates.REQUEST_RECEIVED:
        buttons.push(
          { color: colors.green, text: 'Accept', onPress: acceptDebt },
          { color: colors.red, text: 'Decline', onPress: this.declineDebt }
        );
        break;

      case debtStates.REQUEST_SENT:
        buttons.push({ color: colors.red, text: 'Cancel request', onPress: this.declineDebt });
        break;

      case debtStates.JOIN_VIRTUAL_RECEIVED:
        buttons.push(
          { color: colors.green, text: 'Accept', onPress: undefined },
          { color: colors.red, text: 'Decline', onPress: undefined }
        );
        break;

      case debtStates.JOIN_VIRTUAL_SENT:
        buttons.push({ color: colors.red, text: 'Cancel request', onPress: undefined });
        break;

      default:
        buttons.push(
          { color: colors.green, text: 'Give', onPress: this.toggleGivePopup },
          { color: colors.red, text: 'Take', onPress: this.toggleTakePopup }
        );
        break;
    }

    return (
      <View style={styles.creationButtons}>
        {buttons.map((btn, index) =>
          (<Button
            key={index}
            onPress={btn.onPress}
            title={btn.text}
            style={[styles.creationButton, { backgroundColor: btn.color }]}
            textStyle={styles.creationText}
          />)
        )}
      </View>
    );
  };

  renderOperationPopup = () =>
    (<OperationPopup
      show={this.state.opPopupShown}
      operation={this.state.chosenOperation}
      onDismissed={this.closeOpPopup}
      user={this.props.user}
      onClosePress={this.closeOpPopup}
      debt={this.props.debt}
    />);

  renderStateMessage = () => {
    const { debt } = this.props;
    let text = '';

    switch (this.getDebtState()) {
      case debtStates.REQUEST_RECEIVED:
        text = `${debt.user.name} sent you a request\nto create new debts collection`;
        break;
      case debtStates.REQUEST_SENT:
        text = `You have sent a request to ${debt.user.name}.\nWait for the response`;
        break;
      case debtStates.JOIN_VIRTUAL_RECEIVED:
        text = `${debt.user.name} sent you a request\nto join their debts collection`;
        break;
      case debtStates.JOIN_VIRTUAL_SENT:
        text = `You have requested ${debt.user.name}\nto join this collection`;
        break;
      default:
        return;
    }

    return (
      <View style={styles.stateMessage}>
        <Text style={styles.messageText}>
          {text}
        </Text>
      </View>
    );
  };

  render() {
    const { debt, user } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <View style={styles.container}>
        {this.renderTakePopup()}
        {this.renderGivePopup()}
        {this.renderSummary()}
        {this.renderOperationPopup()}
        {this.renderStateMessage()}

        <View style={styles.listContainer}>
          <FlatList
            data={debt.moneyOperations}
            renderItem={({ item }) =>
              (<Operation
                operation={item}
                debt={debt}
                user={user}
                onSwipe={event => this.setState({ scrollEnabled: event })}
                onPress={() => this.showOpPopup(item)}
              />)}
            keyExtractor={item => item.id}
            scrollEnabled={scrollEnabled}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                colors={['gray']}
                tintColor={'gray'}
              />
            }
          />
        </View>
        {this.renderBottomButtons()}
      </View>
    );
  }
}
