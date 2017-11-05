import React, { Component } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from './debt.styles';
import TouchableArea from '../../components/TouchableArea/TouchableArea';
import DebtPopup from './debtPopup/debtPopup';
import Operation from '../../components/Operation/Operation.presenter';
import headerStyle from '../../components/styles/opaqueHeader';
import OperationPopup from './OperationPopup/OperationPopup';

export default class DebtScreen extends Component {
  static navigationOptions = {
    headerStyle,
    headerTintColor: 'white'
  };

  static propTypes = {
    processError: PropTypes.func.isRequired,
    fetchDebt: PropTypes.func.isRequired,
    processOperation: PropTypes.func.isRequired,
    newOperation: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    debt: PropTypes.object.isRequired
  };

  state = {
    givePopupVisible: false,
    takePopupVisible: false,
    scrollEnabled: true,
    refreshing: false,
    opPopupShown: false,
    chosenOperation: {}
  };

  componentDidMount = () => {
    this.props.fetchDebt(this.props.debt.id);
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDebt(this.props.debt.id);
    this.setState({ refreshing: false });
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

  togglePopup = popup =>
    (popup.dialog.state.dialogState === 'opened' ? popup.dismiss() : popup.show());

  toggleTakePopup = () =>
    this.setState(prevState => ({ takePopupVisible: !prevState.takePopupVisible }));

  toggleGivePopup = () =>
    this.setState(prevState => ({ givePopupVisible: !prevState.givePopupVisible }));

  showOpPopup = chosenOperation => this.setState({ opPopupShown: true, chosenOperation });

  closeOpPopup = () => this.setState({ opPopupShown: false });

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

  renderCreationButtons = () =>
    (<View style={styles.creationButtons}>
      <TouchableArea
        onPress={this.toggleGivePopup}
        style={[styles.creationButton, styles.giveButton]}
      >
        <Text style={styles.creationText}>Give</Text>
      </TouchableArea>

      <TouchableArea
        onPress={this.toggleTakePopup}
        style={[styles.creationButton, styles.takeButton]}
      >
        <Text style={styles.creationText}>Take</Text>
      </TouchableArea>
    </View>);

  renderOperationPopup = () =>
    (<OperationPopup
      show={this.state.opPopupShown}
      operation={this.state.chosenOperation}
      onDismissed={this.closeOpPopup}
      user={this.props.user}
      onClosePress={this.closeOpPopup}
      debt={this.props.debt}
    />);

  render() {
    const { debt, user } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <View style={styles.container}>
        {this.renderTakePopup()}
        {this.renderGivePopup()}
        {this.renderSummary()}
        {this.renderOperationPopup()}

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
        {this.renderCreationButtons()}
      </View>
    );
  }
}
