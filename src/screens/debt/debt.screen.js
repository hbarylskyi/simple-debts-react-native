import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './debt.styles';
import DebtPopup from './debtPopup/debtPopup';
import Operation from '../../components/Operation/Operation.presenter';
import OperationPopup from './OperationPopup/OperationPopup';
import ButtonDeprecated from '../../components/Button/ButtonDeprecated';
import * as colors from '../../utils/colors';
import Hamburger from '../../components/Hamburger/Hamburger';
import SearchModal from '../main/SearchModal/SearchModal.presenter';
import Button from '../../components/Button/Button';
import HeaderButton from '../../components/HeaderButton/HeaderButton';

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
    deleteDebt: PropTypes.func.isRequired,
    connectUser: PropTypes.func.isRequired,
    declineUserConnection: PropTypes.func.isRequired,
    acceptUserConnection: PropTypes.func.isRequired,
    operations: PropTypes.arrayOf(PropTypes.object)
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const { hamburgerData = [] } = params;

    return {
      headerTransparent: true,
      headerTintColor: 'white',
      headerRight: (
        <View style={{ marginHorizontal: 22 }}>
          <Hamburger data={hamburgerData} />
        </View>
      )
    };
  };

  state = {
    givePopupVisible: false,
    takePopupVisible: false,
    scrollEnabled: true,
    refreshing: false,
    loading: false,
    opPopupShown: false,
    chosenOperation: {}
  };

  async componentDidMount() {
    const { navigation, fetchDebt, debt } = this.props;
    navigation.setParams({
      hamburgerData: this.getHamburgerData()
    });

    this.setState({ loading: true });
    await fetchDebt(debt.id);
    this.setState({ loading: false });
  }

  getHamburgerData = () => {
    const { debt } = this.props;
    const data = [];

    if (this.getDebtState() === debtStates.NORMAL) {
      data.push({ text: 'Delete this debt', onPress: this.deleteDebt });
      if (debt.type === 'SINGLE_USER') {
        // data.push({ text: 'Connect to a friend', onPress: this.toggleSearch }); TODO
      }
    }

    return data;
  };

  onRefresh = async () => {
    const { fetchDebt, debt } = this.props;

    this.setState({ refreshing: true });
    await fetchDebt(debt.id);
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

    return this.props
      .newOperation(debt.id, val, receiver, descr)
      .then(response => {
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

  toggleSearch = () =>
    this.setState(prevState => ({ searchVisible: !prevState.searchVisible }));

  toggleTakePopup = () =>
    this.setState(prevState => ({
      takePopupVisible: !prevState.takePopupVisible
    }));

  toggleGivePopup = () =>
    this.setState(prevState => ({
      givePopupVisible: !prevState.givePopupVisible
    }));

  toggleOpPopup = item =>
    this.setState(prevState => ({
      opPopupShown: !prevState.opPopupShown,
      chosenOperation: item || prevState.chosenOperation
    }));

  goBack = async () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  // Operations with debt

  deleteDebt = async () => {
    const { debt, deleteDebt } = this.props;

    try {
      if (debt.type === 'SINGLE_USER') {
        this.goBack();
      }

      await deleteDebt();
    } catch (e) {
      alert(e.message);
    }
  };

  declineDebt = async () => {
    try {
      await this.props.declineDebt();
      this.goBack();
    } catch (e) {
      alert(e.message);
    }
  };

  acceptUserConnection = async () => {
    const { acceptUserConnection } = this.props;

    try {
      await acceptUserConnection();
    } catch (e) {
      alert(e.message);
    }
  };

  declineUserConnection = async isSingle => {
    const { fetchDebt, declineUserConnection, debt } = this.props;

    try {
      await declineUserConnection();

      if (isSingle) await fetchDebt(debt.id);
      else this.goBack();
    } catch (e) {
      alert(e.message);
    }
  };

  renderTakePopup = () => (
    <DebtPopup
      isGivePopup={false}
      isVisible={this.state.takePopupVisible}
      onChangeVal={text => this.setTakeValue(text)}
      onChangeDescr={takeDescr => this.setState({ takeDescr })}
      onBackdropPress={this.toggleTakePopup}
      onSubmit={() => this.newOperation(this.state.takeValue, false)}
    />
  );

  renderGivePopup = () => (
    <DebtPopup
      isGivePopup
      isVisible={this.state.givePopupVisible}
      onChangeVal={text => this.setGiveValue(text)}
      onChangeDescr={giveDescr => this.setState({ giveDescr })}
      onBackdropPress={this.toggleGivePopup}
      onSubmit={() => this.newOperation(this.state.giveValue, true)}
    />
  );

  renderSummary = () => {
    const { debt, user } = this.props;

    const isTaken = debt.moneyReceiver === user.id;
    const style = isTaken ? styles.summaryTaken : styles.summaryGiven;
    const debtText = `${
      isTaken ? `you owe ${debt.user.name}` : `${debt.user.name} owes you`
    }\n${debt.currency}${debt.summary}`;

    return (
      <View style={[styles.summaryContainer, style]}>
        <Text style={styles.moneyAmount}>{debtText}</Text>
      </View>
    );
  };

  renderBottomButtons = () => {
    const { acceptDebt } = this.props;
    const buttons = [];

    console.log(this.getDebtState());

    switch (this.getDebtState()) {
      case debtStates.REQUEST_RECEIVED:
        buttons.push(
          { color: colors.green, text: 'Accept', onPress: acceptDebt },
          { color: colors.red, text: 'Decline', onPress: this.declineDebt }
        );
        break;

      case debtStates.REQUEST_SENT:
        buttons.push({
          color: colors.red,
          text: 'Cancel request',
          onPress: this.declineDebt
        });
        break;

      case debtStates.JOIN_VIRTUAL_RECEIVED:
        buttons.push(
          {
            color: colors.green,
            text: 'Accept',
            onPress: this.acceptUserConnection
          },
          {
            color: colors.red,
            text: 'Decline',
            onPress: () => this.declineUserConnection(false)
          }
        );
        break;

      case debtStates.JOIN_VIRTUAL_SENT:
        buttons.push({
          color: colors.red,
          text: 'Cancel request',
          onPress: () => this.declineUserConnection(true)
        });
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
        {buttons.map((btn, index) => (
          <ButtonDeprecated
            key={index}
            onPress={btn.onPress}
            title={btn.text}
            style={[styles.creationButton, { backgroundColor: btn.color }]}
            textStyle={styles.creationText}
          />
        ))}
      </View>
    );
  };

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
        <Text style={styles.messageText}>{text}</Text>
      </View>
    );
  };

  renderOperationPopup = () => (
    <OperationPopup
      isVisible={this.state.opPopupShown}
      onBackdropPress={this.toggleOpPopup}
      onClosePress={this.toggleOpPopup}
      operation={this.state.chosenOperation}
      user={this.props.user}
      debt={this.props.debt}
    />
  );

  renderSearchModal = () => (
    <SearchModal
      isVisible={this.state.searchVisible}
      onBackdropPress={this.toggleSearch}
      onSelected={user => {
        this.props.connectUser(user.id);
        this.toggleSearch();
      }}
    />
  );

  renderListEmpty = () => {
    const { loading } = this.state;

    return loading ? (
      <ActivityIndicator size="large" style={styles.spinner} />
    ) : (
      // button is here to make it possible to use pull-to-refresh when
      // the list is empty
      <Button onPress={() => {}} style={{ flex: 1 }} />
    );
  };

  render() {
    const { debt, user, operations } = this.props;
    const { scrollEnabled } = this.state;

    if (!debt) return null;

    return (
      <View style={styles.container}>
        {this.renderTakePopup()}
        {this.renderGivePopup()}
        {this.renderOperationPopup()}
        {this.renderSearchModal()}
        {this.renderSummary()}

        <View style={styles.listContainer}>
          {this.renderStateMessage()}
          <FlatList
            data={operations}
            renderItem={({ item }) => (
              <Operation
                operation={item}
                debt={debt}
                user={user}
                onSwipe={event => this.setState({ scrollEnabled: event })}
                onPress={() => this.toggleOpPopup(item)}
              />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={scrollEnabled}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                colors={['gray']}
                tintColor="gray"
              />
            }
            ListEmptyComponent={this.renderListEmpty}
          />

          {this.renderBottomButtons()}
        </View>
      </View>
    );
  }
}
