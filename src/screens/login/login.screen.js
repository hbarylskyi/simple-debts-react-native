import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './login.styles';
import Button from '../../components/Button/Button';

export default class LoginScreen extends Component {
  static propTypes = {
    fbLogin: PropTypes.func.isRequired,
    standardLogin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    goToMainScreen: PropTypes.func.isRequired
  };

  static navigationOptions = {
    header: null
  };

  state = {
    email: '',
    pass: '',
    signinLoading: false,
    signupLoading: false,
    fbLoading: false
  };

  standardLogin = async () => {
    const { email, pass } = this.state;

    this.setState({ signinLoading: true });

    try {
      await this.props.standardLogin(email, pass);
      this.props.goToMainScreen();
    } catch (e) {
      console.error(e.message);
    } finally {
      this.setState({ signinLoading: false });
    }
  };

  signUp = async () => {
    const { email, pass } = this.state;

    this.setState({ signupLoading: true });

    try {
      await this.props.signup(email, pass);
      this.props.goToMainScreen();
    } catch (e) {
      console.error(e.message);
    } finally {
      this.setState({ signupLoading: false });
    }
  };

  fbLogin = async () => {
    this.setState({ fbLoading: true });
    await this.props.fbLogin();
    this.setState({ fbLoading: false });
  };

  render() {
    const { email, pass, signinLoading, signupLoading, fbLoading } = this.state;

    return (
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={styles.title}>
            {'Simple\nDebts'}
          </Text>
        </View>

        <View style={styles.middle} />

        <View style={styles.bottom}>
          <View>
            <View style={styles.inputRow}>
              <Icon size={24} name="envelope-o" style={styles.icon} />
              <TextInput
                onChangeText={email => this.setState({ email })}
                placeholder="Email"
                style={styles.input}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputRow}>
              <IonIcon size={36} name="ios-lock-outline" style={styles.icon} />
              <TextInput
                onChangeText={pass => this.setState({ pass })}
                placeholder="Password"
                style={styles.input}
                underlineColorAndroid={'transparent'}
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.buttonsRow}>
            <Button
              title="Sign up"
              onPress={this.signUp}
              disabled={!email || !pass}
              loading={signupLoading}
              style={styles.btn}
            />
            <Button
              title="Sign in"
              onPress={this.standardLogin}
              disabled={!email || !pass}
              loading={signinLoading}
              style={styles.btn}
            />
          </View>
          <Button onPress={this.fbLogin} loading={fbLoading} style={styles.fbBtn}>
            <Icon name="facebook-square" size={30} color={'white'} />
            <Text style={styles.fbText}>Log in with Facebook</Text>
          </Button>
        </View>
      </View>
    );
  }
}
