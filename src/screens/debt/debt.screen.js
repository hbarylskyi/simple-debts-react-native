import React, { Component } from "react";
import { View, Text, Button, Image, Modal, TextInput } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { MKTextField, MKButton } from "react-native-material-kit";
import styles from "./debt.styles";
import TouchableArea from "../../components/TouchableArea/TouchableArea";
import Icon from "react-native-vector-icons/FontAwesome";

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

  take = val => {
    const { debt, userId } = this.props;
    this.props.take(debt.id, val, userId).then(response => {
      if (response.error) {
        alert(
          `Error: ${response.payload.message}` +
            `Response: ${JSON.stringify(response.payload.response)}`
        );
      } else {
        this.setState({
          takeModalVisible: !this.state.takeModalVisible
        });
      }
    });
  };

  give = val => {
    const { debt } = this.props;
    this.props.give(debt.id, val, debt.user.id).then(response => {
      if (response.error) {
        alert(
          `Error: ${response.payload.message}` +
            `Response: ${JSON.stringify(response.payload.response)}`
        );
      } else {
        this.setState({
          giveModalVisible: !this.state.giveModalVisible
        });
      }
    });
  };

  acceptOperation = (oid, accepted) => {
    this.props.acceptOperation(oid, accepted).then(response => {
      if (response.error) {
        alert(
          `Error: ${response.payload.message}` +
            `Response: ${JSON.stringify(response.payload.response)}`
        );
      }
    });
  };

  // TODO modal to separate file
  renderTakeModal = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.state.takeModalVisible}
        onRequestClose={() => {
          this.setState({
            takeModalVisible: !this.state.takeModalVisible
          });
        }}
      >
        <View style={styles.modal}>
          <Text>Take</Text>
          <MKTextField
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Debt value"
            onChangeText={text => {
              this.state.takeValue = parseInt(text);
            }}
          />

          <Button
            title="Ok"
            onPress={() => {
              this.take(this.state.takeValue);
            }}
          />
        </View>
      </Modal>
    );
  };

  renderGiveModal = () => {
    return (
      <Modal
        animationType={"fade"}
        transparent={false}
        visible={this.state.giveModalVisible}
        onRequestClose={() => {
          this.setState({
            giveModalVisible: !this.state.giveModalVisible
          });
        }}
      >
        <View style={styles.modal}>
          <Text>Give</Text>
          <MKTextField
            style={styles.textInput}
            keyboardType="numeric"
            placeholder="Debt value"
            onChangeText={text => {
              this.state.giveValue = parseInt(text);
            }}
          />

          <Button
            title="Ok"
            onPress={() => {
              this.give(this.state.giveValue);
            }}
          />
        </View>
      </Modal>
    );
  };

  renderSummaryValue = isGiven => {
    const { summary } = this.props.debt;

    if (isGiven) {
      return (
        <Text style={styles.toTakeValue}>
          Given: {summary}
        </Text>
      );
    } else {
      return (
        <Text style={styles.toGiveValue}>
          Taken: {summary}
        </Text>
      );
    }
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
            <Button
              title="Take"
              onPress={() => {
                this.setState({
                  takeModalVisible: !this.state.takeModalVisible
                });
              }}
            />
            <Button
              title="Give"
              onPress={() => {
                this.setState({
                  giveModalVisible: !this.state.giveModalVisible
                });
              }}
            />
          </View>
        </View>

        {this.renderTakeModal()}
        {this.renderGiveModal()}
      </View>
    );
  };

  renderAcceptanceButtons = operation => {
    if (operation.statusAcceptor === this.props.userId) {
      return (
        <View style={{ flexDirection: "row" }}>
          <MKButton
            style={styles.acceptanceButton}
            onPress={() => this.acceptOperation(operation.id, true)}
          >
            <Icon name="check-circle" size={30} color="#17840C" />
          </MKButton>
          <MKButton
            style={styles.acceptanceButton}
            onPress={() => this.acceptOperation(operation.id, false)}
          >
            <Icon name="times-circle" size={30} color="#9E0E15" />
          </MKButton>
        </View>
      );
    }
  };

  renderOperation = operation => {
    const { name, picture } = this.props.debt.user;
    const { status } = operation;

    const textColorStyle =
      operation.moneyReceiver === this.props.userId
        ? styles.toTakeValue
        : styles.toGiveValue;

    return (
      <View key={operation.id} style={styles.operation}>
        <View style={styles.personContainer}>
          <Image style={styles.avatar} source={{ uri: picture }} />
          <View>
            <Text>
              {name}
            </Text>
            <Text>
              {status}
            </Text>
          </View>
        </View>

        {this.renderAcceptanceButtons(operation)}

        <Text style={textColorStyle}>
          {operation.moneyAmount}
        </Text>
      </View>
    );
  };

  renderForeground = () =>
    <View style={styles.foreground} pointerEvents="none" />;

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
