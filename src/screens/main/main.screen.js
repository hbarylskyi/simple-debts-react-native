import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import styles from "./main.styles";
import TouchableArea from "../../components/TouchableArea/TouchableArea";

export default class MainScreen extends Component {
  static navigationOptions = {
    title: "Dashboard"
  };

  componentDidMount() {
    this.props.fetchDebts();
  }

  goToDebt(debtId) {
    this.props.selectDebt(debtId);
    this.props.goToDebt(debtId);
  }

  renderSummary = () => {
    const { toGive, toTake } = this.props.summary;

    return (
      <View style={styles.summaryContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.toGiveValue}>
            Given: {toTake}
          </Text>
          <Text style={styles.toTakeValue}>
            Taken: {toGive}
          </Text>
        </View>
      </View>
    );
  };

  renderDebt = debt => {
    const { name, picture } = debt.user;
    const textColorStyle =
      debt.moneyReceiver === this.props.userId
        ? styles.toTakeValue
        : styles.toGiveValue;

    return (
      <TouchableArea key={debt.id} onPress={() => this.goToDebt(debt.id)}>
        <View style={styles.debtContainer}>
          <View style={styles.personContainer}>
            <Image style={styles.avatar} source={{ uri: picture }} />
            <Text>
              {name}
            </Text>
          </View>

          <Text style={[styles.debtValue, textColorStyle]}>
            {debt.summary}
          </Text>
        </View>
      </TouchableArea>
    );
  };

  render() {
    const { debts } = this.props;

    return (
      <View style={styles.container}>
        <ParallaxScrollView
          style={styles.container}
          parallaxHeaderHeight={300}
          backgroundColor="white"
          renderBackground={this.renderSummary}
        >
          <View style={styles.listContainer}>
            {debts.map(this.renderDebt)}
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}
