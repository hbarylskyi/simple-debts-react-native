import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './debt.styles';
import mainScreenStyles from '../main/main.styles';
import DebtPopup from './debtPopup/debtPopup';
import Operation from '../../components/Operation/Operation.presenter';
import OperationPopup from './OperationPopup/OperationPopup';
import ButtonDeprecated from '../../components/Button/ButtonDeprecated';
import * as colors from '../../utils/colors';
import Hamburger from '../../components/Hamburger/Hamburger';
import SearchModal from '../main/SearchModal/SearchModal.presenter';
import Button from '../../components/Button/Button';
import { currencyToSymbol } from '../../utils/helpers';

// list of states the debt can be in. Calculated depending on
// debt.statusAcceptor and debt.status
const debtStates = {
  NORMAL: 'NORMAL',
  REQUEST_RECEIVED: 'REQUEST_RECEIVED',
  REQUEST_SENT: 'REQUEST_SENT',
  BECAME_VITUAL: 'BECAME_VITUAL',
  JOIN_VIRTUAL_SENT: 'JOIN_VIRTUAL_SENT',
  JOIN_VIRTUAL_RECEIVED: 'JOIN_VIRTUAL_RECEIVED',
  USER_DELETED: 'USER_DELETED'
};

export default class DebtScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    fetchDebt: PropTypes.func.isRequired,
    newOperation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    debt: PropTypes.object.isRequired,
    declineDebt: PropTypes.func.isRequired,
    acceptDebt: PropTypes.func.isRequired,
    deleteDebt: PropTypes.func.isRequired,
    connectUser: PropTypes.func.isRequired,
    declineUserConnection: PropTypes.func.isRequired,
    acceptUserConnection: PropTypes.func.isRequired,
    operations: PropTypes.arrayOf(PropTypes.object),
    acceptAll: PropTypes.func.isRequired
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
      data.push({
        text: 'Delete this debt',
        onPress: this.deleteDebt
      });
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
    }
    if (debt.status === 'CREATION_AWAITING') {
      return debt.statusAcceptor === user.id
        ? debtStates.REQUEST_RECEIVED
        : debtStates.REQUEST_SENT;
    }
    if (debt.status === 'CONNECT_USER') {
      return debt.statusAcceptor === user.id
        ? debtStates.JOIN_VIRTUAL_RECEIVED
        : debtStates.JOIN_VIRTUAL_SENT;
    }
    if (debt.status === 'USER_DELETED') {
      return debtStates.USER_DELETED;
    }
  };

  setTakeValue = text => {
    this.state.takeValue = parseInt(text, 10);
  };

  setGiveValue = text => {
    this.state.giveValue = parseInt(text, 10);
  };

  newOperation = async (val, isGiven) => {
    const { debt, user, newOperation } = this.props;
    const receiver = isGiven ? debt.user.id : user.id;
    const descr = isGiven ? this.state.giveDescr : this.state.takeDescr;

    if (!val || !descr) return;

    const { error, payload } = await newOperation(
      debt.id,
      val,
      receiver,
      descr
    );

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else if (isGiven) {
      this.toggleGivePopup();
    } else {
      this.toggleTakePopup();
    }
  };

  toggleSearch = () =>
    this.setState(prevState => ({
      searchVisible: !prevState.searchVisible
    }));

  toggleTakePopup = () =>
    this.setState(prevState => ({
      takePopupVisible: !prevState.takePopupVisible
    }));

  toggleGivePopup = () =>
    this.setState(prevState => ({
      givePopupVisible: !prevState.givePopupVisible
    }));

  showOpPopup = item =>
    this.setState({ opPopupShown: true, chosenOperation: item });

  hideOpPopup = () => this.setState({ opPopupShown: false });

  goBack = async () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  // Operations with debt

  deleteDebt = async () => {
    const { debt, deleteDebt } = this.props;

    const { error, payload } = await deleteDebt();

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else if (debt.type === 'SINGLE_USER') {
      this.goBack();
    }
  };

  declineDebt = async () => {
    const { declineDebt } = this.props;

    const { error, payload } = await declineDebt();

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else {
      this.goBack();
    }
  };

  acceptDebt = async () => {
    const { acceptDebt } = this.props;

    const { error, payload } = await acceptDebt();

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    }
  };

  acceptUserConnection = async () => {
    const { acceptUserConnection } = this.props;

    const { error, payload } = await acceptUserConnection();

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    }
  };

  declineUserConnection = async isSingle => {
    const { fetchDebt, declineUserConnection, debt } = this.props;

    const { error, payload } = await declineUserConnection();

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else if (isSingle) await fetchDebt(debt.id);
    else this.goBack();
  };

  acceptAll = async () => {
    const { acceptAll, debt } = this.props;

    const { error, payload } = await acceptAll(debt.id);

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    }
  };

  saveDeletedDebt = () => {};

  deleteDeletedDebt = () => {};

  shouldRenderAcceptAll = () => {
    const { operations, user } = this.props;

    const operationToAccept = operations.find(
      op => op.status === 'CREATION_AWAITING' && op.statusAcceptor === user.id
    );

    return Boolean(operationToAccept);
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
      onChangeVal={text => this.setGiveValue(text, console.log(text))}
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
    }\n${currencyToSymbol(debt.currency)}${debt.summary}`;

    return (
      <View style={[styles.summaryContainer, style]}>
        <Image
          source={{ uri: debt.user.picture }}
          style={styles.summaryAvatar}
        />
        <Text style={styles.moneyAmount}>{debtText}</Text>

        {this.shouldRenderAcceptAll() ? (
          <Button
            text="Accept all"
            textStyle={{
              color: isTaken ? colors.red : colors.green,
              fontSize: 16
            }}
            onPress={this.acceptAll}
            style={styles.acceptAllBtn}
            wrapperStyle={styles.acceptAllWrapper}
          />
        ) : null}
      </View>
    );
  };

  renderBottomButtons = () => {
    const buttons = [];

    switch (this.getDebtState()) {
      case debtStates.REQUEST_RECEIVED:
        buttons.push(
          {
            color: colors.green,
            text: 'Accept',
            onPress: this.acceptDebt
          },
          {
            color: colors.red,
            text: 'Decline',
            onPress: this.declineDebt
          }
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

      case debtStates.USER_DELETED:
        buttons.push(
          {
            color: colors.green,
            text: 'Save',
            onPress: this.saveDeletedDebt
          },
          {
            color: colors.red,
            text: 'Delete',
            onPress: this.deleteDeletedDebt
          }
        );
        break;

      default:
        buttons.push(
          {
            color: colors.green,
            text: 'Give',
            onPress: this.toggleGivePopup
          },
          {
            color: colors.red,
            text: 'Take',
            onPress: this.toggleTakePopup
          }
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
        text = `${debt.user.name} sent you a request\nto create new debts collection.`;
        break;
      case debtStates.REQUEST_SENT:
        text = `You have sent a request to ${debt.user.name}.\nWait for them to accept it.`;
        break;
      case debtStates.JOIN_VIRTUAL_RECEIVED:
        text = `${debt.user.name} sent you a request\nto join this debts collection.`;
        break;
      case debtStates.JOIN_VIRTUAL_SENT:
        text = `You have requested ${debt.user.name}\nto join this collection.`;
        break;
      case debtStates.USER_DELETED:
        text =
          `${debt.user.name} deleted this debts collection. ` +
          `You can save it and continue using it; ${debt.user.name} will ` +
          "become your 'virtual' user. Or you can delete this collection and it will disappear.";
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
      onBackdropPress={this.hideOpPopup}
      onClosePress={this.hideOpPopup}
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
    const { debt } = this.props;

    return loading ? (
      <ActivityIndicator size="large" style={styles.spinner} />
    ) : (
      // button is here to make it possible to use pull-to-refresh when
      // the list is empty
      <TouchableWithoutFeedback>
        <View style={mainScreenStyles.placeholderContainer}>
          {debt.status === 'UNCHANGED' ? (
            <View style={{ alignItems: 'center' }}>
              <IonIcon name="ios-paper" size={40} color={colors.black} />
              <Text style={mainScreenStyles.placeholderText}>
                There are no records yet. You can create one by tapping on
                buttons below
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { debt, user, operations } = this.props;

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
                onPress={() => this.showOpPopup(item)}
              />
            )}
            keyExtractor={item => item.id}
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
        </View>
        {this.renderBottomButtons()}
      </View>
    );
  }
}
