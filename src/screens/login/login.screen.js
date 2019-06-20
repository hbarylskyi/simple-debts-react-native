import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './login.styles';
import ButtonDeprecated from '../../components/Button/ButtonDeprecated';
import { createResetAction } from '../../utils/helpers';

export default class LoginScreen extends Component {
  static propTypes = {
    fbLogin: PropTypes.func.isRequired,
    standardLogin: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = {
    header: null
  };

  state = {
    // TODO remove
    email: 'hleb.barylskyi@gmail.com',
    pass: 'secret',
    signinLoading: false,
    signupLoading: false,
    fbLoading: false
  };

  standardLogin = async () => {
    const { email, pass } = this.state;

    this.setState({ signinLoading: true });

    try {
      await this.props.standardLogin(email, pass);

      this.props.navigation.dispatch(createResetAction('MainScreen'));
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
      this.props.navigation.navigate('MainScreen');
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
          <Text style={styles.title}>{'Simple\nDebts'}</Text>
        </View>

        <View style={styles.middle} />

        <View style={styles.bottom}>
          <View>
            <View style={styles.inputRow}>
              <Icon size={24} name="envelope-o" style={styles.icon} />
              <TextInput
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.passInput.focus()}
                returnKeyType="next"
                placeholder="Email"
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <IonIcon size={36} name="ios-key" style={styles.icon} />
              <TextInput
                ref={ref => (this.passInput = ref)}
                onChangeText={pass => this.setState({ pass })}
                placeholder="Password"
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.buttonsRow}>
            <ButtonDeprecated
              title="Sign up"
              onPress={this.signUp}
              disabled={!email || !pass}
              loading={signupLoading}
              style={styles.btn}
            />
            <ButtonDeprecated
              title="Sign in"
              onPress={this.standardLogin}
              disabled={!email || !pass}
              loading={signinLoading}
              style={styles.btn}
            />
          </View>
          <ButtonDeprecated
            onPress={this.fbLogin}
            loading={fbLoading}
            style={styles.fbBtn}
          >
            <Icon name="facebook-square" size={30} color={'white'} />
            <Text style={styles.fbText}>Log in with Facebook</Text>
          </ButtonDeprecated>
        </View>
      </View>
    );
  }
}
