import React, { Component } from "react";
import { View, Text, Button, Image, Modal, TextInput } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { MKTextField, MKButton } from "react-native-material-kit";
import styles from "./debt.styles";
import TouchableArea from "../../components/TouchableArea/TouchableArea";
import Icon from "react-native-vector-icons/FontAwesome";
import DebtModal from "./debtModal/debtModal";

export default class DebtScreen extends Component {
  constructor() {
    super();
    this.state = { giveModalVisible: false, takeModalVisible: false };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name
  });

  componentDidMount = () => {
    this.props.fetchDebt(this.props.debtId);
  };

  newOperation = (val, isGiven) => {
    const { debt } = this.props;
    const uid = isGiven ? debt.user.id : this.props.userId;
    const descr = isGiven ? this.state.takeDescr : this.state.giveDescr;

    this.props.newOperation(debt.id, val, uid, descr).then(response => {
      if (response.error) {
        const { payload } = response;
        this.props.processError(payload.message, payload.response);
      } else {
        isGiven ? toggleGiveModal() : toggleTakeModal();
      }
    });
  };

  acceptOperation = (oid, accepted) => {
    this.props.acceptOperation(oid, accepted).then(response => {
      if (response.error) {
        const { payload } = response;
        this.props.processError(payload.message, payload.response);
      }
    });
  };

  setTakeValue = text => (this.state.takeValue = parseInt(text));

  setGiveValue = text => (this.state.giveValue = parseInt(text));

  toggleTakeModal = () =>
    this.setState({ takeModalVisible: !this.state.takeModalVisible });

  toggleGiveModal = () =>
    this.setState({ giveModalVisible: !this.state.giveModalVisible });

  changeTakeDescr = descr => this.setState({ takeDescr: descr });

  changeGiveDescr = descr => this.setState({ giveDescr: descr });

  renderTakeModal = () =>
    <DebtModal
      onChangeText={text => this.setTakeValue(text)}
      onSubmit={() => this.newOperation(this.state.takeValue, false)}
      onRequestClose={this.toggleTakeModal}
      onChangeDescr={this.changeTakeDescr}
      text={"Take"}
    />;

  renderGiveModal = () =>
    <DebtModal
      onChangeText={text => this.setGiveValue(text)}
      onSubmit={() => this.newOperation(this.state.takeValue, true)}
      onRequestClose={this.toggleTakeModal}
      onChangeDescr={this.changeGiveDescr}
      text={"Give"}
    />;

  renderSummaryValue = isGiven => {
    const { summary } = this.props.debt;
    const text = isGiven ? "Given:" : "Taken:";
    const style = isGiven ? styles.toGiveValue : styles.toTakeValue;

    return (
      <Text style={style}>
        {text} {summary}
      </Text>
    );
  };

  renderSummary = () => {
    const isGiven = this.props.debt.moneyReceiver === this.props.userId;

    return (
      <View style={styles.summaryContainer}>
        <View style={styles.textContainer}>
          {this.renderSummaryValue(isGiven)}
        </View>

        <View style={styles.buttonsContainerContainer}>
          <View style={styles.buttonsContainer}>
            <Button title="Take" onPress={toggleTakeModal} />
            <Button title="Give" onPress={toggleGiveModal} />
          </View>
        </View>

        {this.renderTakeModal()}
        {this.renderGiveModal()}
      </View>
    );
  };

  // TODO move to other file
  renderOperation = operation => {
    const { name, picture } = this.props.debt.user;
    const { status } = operation;
    const oid = operation.id;

    const textColorStyle =
      operation.moneyReceiver === this.props.userId
        ? styles.toTakeValue
        : styles.toGiveValue;

    return (
      <View key={oid} style={styles.operation}>
        <View style={styles.personContainer}>
          <Image style={styles.avatar} source={{ uri: picture }} />
          <View>
            <Text>
              {name}
            </Text>
            <Text>
              {operation.description}
            </Text>
            <Text>
              {status}
            </Text>
          </View>
        </View>

        <MKButton
          style={styles.acceptanceButton}
          onPress={() => this.acceptOperation(oid, true)}
        >
          <Icon name="check-circle" size={30} color="#17840C" />
        </MKButton>
        <MKButton
          style={styles.acceptanceButton}
          onPress={() => this.acceptOperation(oid, false)}
        >
          <Icon name="times-circle" size={30} color="#9E0E15" />
        </MKButton>

        <Text style={textColorStyle}>
          {operation.moneyAmount}
        </Text>
      </View>
    );
  };

  render() {
    const operations = this.props.debt.moneyOperations;
    // TODO renderScrollComponent
    return (
      <View style={styles.container}>
        <ParallaxScrollView
          style={styles.container}
          parallaxHeaderHeight={300}
          backgroundColor="white"
          renderForeground={this.renderSummary}
        >
          <View style={styles.listContainer}>
            {operations.map(this.renderOperation)}
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}
