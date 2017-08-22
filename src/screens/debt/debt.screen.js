import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import PropTypes from 'prop-types';
import interpolate from 'color-interpolate';
import styles from './debt.styles';
import TouchableArea from '../../components/TouchableArea/TouchableArea';
import DebtPopup from './debtPopup/debtPopup';
import Operation from '../../components/Operation/Operation';
import headerStyle from '../../components/styles/opaqueHeader';

export default class DebtScreen extends Component {
  static navigationOptions = {
    headerStyle,
    headerTintColor: 'white'
  };

  static propTypes = {
    processError: PropTypes.func.isRequired,
    fetchDebt: PropTypes.func.isRequired,
    acceptOperation: PropTypes.func.isRequired,
    newOperation: PropTypes.func.isRequired,
    debtId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userPic: PropTypes.string.isRequired,
    debt: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = { giveModalVisible: false, takeModalVisible: false, scrollEnabled: true };
  }

  componentDidMount = () => {
    this.props.fetchDebt(this.props.debtId);
  };

  setTakeValue = text => {
    this.state.takeValue = parseInt(text, 10);
  };

  setGiveValue = text => {
    this.state.giveValue = parseInt(text, 10);
  };

  acceptOperation = (oid, accepted) => {
    this.props.acceptOperation(oid, accepted).then(response => {
      if (response.error) {
        const { payload } = response;
        this.props.processError(payload.message, payload.response);
      }
    });
  };

  newOperation = (val, isGiven) => {
    const { debt } = this.props;
    const receiver = isGiven ? debt.user.id : this.props.userId;
    const descr = isGiven ? this.state.giveDescr : this.state.takeDescr;

    if (!val || !descr) return;

    this.props.newOperation(debt.id, val, receiver, descr).then(response => {
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

  toggleTakePopup = () => this.togglePopup(this.takePopup);

  toggleGivePopup = () => this.togglePopup(this.givePopup);

  processScrollPosition = event => {
    let scrollFactor = event.nativeEvent.contentOffset.y / 250;
    scrollFactor = scrollFactor > 1 ? 1 : scrollFactor;
    this.setState({ scrollFactor });
  };

  renderTakePopup = () =>
    (<DebtPopup
      refer={takePopup => {
        this.takePopup = takePopup;
      }}
      isGivePopup={false}
      onChangeVal={text => this.setTakeValue(text)}
      onChangeDescr={descr => this.setState({ takeDescr: descr })}
      onSubmit={() => this.newOperation(this.state.takeValue, false)}
    />);

  renderGivePopup = () =>
    (<DebtPopup
      refer={givePopup => {
        this.givePopup = givePopup;
      }}
      isGivePopup
      onChangeVal={text => this.setGiveValue(text)}
      onChangeDescr={descr => this.setState({ giveDescr: descr })}
      onSubmit={() => this.newOperation(this.state.giveValue, true)}
    />);

  renderSummary = () => {
    const { debt } = this.props;
    const isTaken = debt.moneyReceiver === debt.user.id;
    const style = isTaken ? styles.summaryTaken : styles.summaryGiven;

    return (
      <View style={[styles.summaryContainer, style]}>
        <Text style={styles.name}>
          {debt.user.name}
        </Text>
        <Text style={styles.moneyAmount}>
          {isTaken ? '-' : ''}
          {debt.summary}
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

  renderParallaxHeader = () =>
    (<View style={styles.parallaxHeader}>
      <Text>
        {this.props.debt.user.name}
      </Text>
    </View>);

  render() {
    const operations = this.props.debt.moneyOperations;

    return (
      <View style={styles.container}>
        {this.renderTakePopup()}
        {this.renderGivePopup()}

        <ParallaxScrollView
          parallaxHeaderHeight={300}
          backgroundColor="white"
          renderForeground={this.renderSummary}
          renderStickyHeader={this.renderParallaxHeader}
          stickyHeaderHeight={50}
          fadeOutForeground={false}
          onScroll={this.processScrollPosition}
          renderScrollComponent={() => <ScrollView scrollEnabled={this.state.scrollEnabled} />}
          style={styles.container}
        >
          <FlatList
            data={operations}
            renderItem={({ item }) =>
              (<Operation
                operation={item}
                onAccept={this.acceptOperation}
                debt={this.props.debt}
                userId={this.props.userId}
                userPic={this.props.userPic}
                onSwipe={event => this.setState({ scrollEnabled: event })}
              />)}
            keyExtractor={item => item.id}
          />
        </ParallaxScrollView>

        {this.renderCreationButtons()}
      </View>
    );
  }
}
