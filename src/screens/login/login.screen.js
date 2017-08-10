import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import styles from "./login.styles";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome!</Text>

        <View style={styles.loginButtonContainer}>
          <Button
            title="Continue with Facebook"
            onPress={this.props.login}
            color="#3b5998"
          />
        </View>
      </View>
    );
  }
}
