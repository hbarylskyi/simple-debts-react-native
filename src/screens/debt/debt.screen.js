import React, { Component } from "react";
import { View, Text } from "react-native";
import styles from "./debt.styles";

export default class DebtScreen extends Component {
  componentDidMount = () => {
    this.props.fetchDebt(this.props.debtId);
  };

  render() {
    const { name } = this.props.debt.user;

    return (
      <View style={styles.container}>
        <Text>
          {name}
        </Text>
      </View>
    );
  }
}
