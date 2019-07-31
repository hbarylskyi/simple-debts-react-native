import React, { Component } from 'react';
import config from 'react-native-config';
import { View, Text, TextInput, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './login.styles';
import ButtonDeprecated from '../../components/Button/ButtonDeprecated';
import { createResetAction } from '../../utils/helpers';
import Button from '../../components/Button/Button';
import * as colors from '../../utils/colors';

const isDevEnv = config.env === 'dev';

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
    email: isDevEnv ? 'hleb.barylskyi@gmail.com' : '',
    pass: isDevEnv ? 'secret' : '',
    signinLoading: false,
    fbLoading: false,
  };

  goToMainScreen = () => {
    const { navigation } = this.props;
    navigation.dispatch(createResetAction('MainScreen'));
  };

  // openSignUp = async () => this.setState({ signUpModalVisible: true });
  //
  // closeSignUp = async () => this.setState({ signUpModalVisible: false });

  standardLogin = async () => {
    const { email, pass } = this.state;
    const { standardLogin } = this.props;

    this.setState({ signinLoading: true });
    const { error, payload } = await standardLogin(email, pass);
    this.setState({ signinLoading: false });

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else {
      this.goToMainScreen();
    }
  };

  signUp = async () => {
    const { email, pass } = this.state;
    const { signup } = this.props;

    this.setState({ signupLoading: true });
    const { error, payload } = await signup(email, pass);
    this.setState({ signupLoading: false });

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else {
      this.goToMainScreen();
    }
  };

  fbLogin = async () => {
    const { fbLogin } = this.props;

    this.setState({ fbLoading: true });

    const { error, payload } = await fbLogin();

    if (error) {
      const { response = {} } = payload;
      alert(`Login unsuccessful: ${response.error || payload.message}`);
    } else {
      this.goToMainScreen();
    }

    this.setState({ fbLoading: false });
  };

  render() {
    const {
      email,
      pass,
      signinLoading,
      signupLoading,
      fbLoading,
    } = this.state;

    return (
      <View style={styles.main}>
        <View style={styles.top}>
          <Text style={styles.title}>{'Simple\nDebts'}</Text>
        </View>

        <View style={styles.middle} />

        <View style={styles.bottom}>
          <View>
            <View style={styles.inputRow}>
              <Icon
                size={24}
                name="envelope-o"
                style={styles.icon}
                color={colors.black}
              />
              <TextInput
                onChangeText={email => this.setState({ email })}
                onSubmitEditing={() => this.passInput.focus()}
                returnKeyType="next"
                placeholder="Email"
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                maxLength={50}
              />
            </View>

            <View style={styles.inputRow}>
              <IonIcon
                size={30}
                name="ios-key"
                style={styles.icon}
                color={colors.black}
              />
              <TextInput
                ref={ref => (this.passInput = ref)}
                onChangeText={pass => this.setState({ pass })}
                placeholder="Password"
                style={styles.input}
                underlineColorAndroid="transparent"
                autoCorrect={false}
                secureTextEntry
                maxLength={50}
              />
            </View>
          </View>

          <View>
            <View style={styles.buttonsRow}>
              <ButtonDeprecated
                title="Sign in"
                onPress={this.standardLogin}
                disabled={!email || !pass}
                loading={signinLoading}
                style={styles.btn}
              />
              <ButtonDeprecated
                title="Sign up"
                onPress={this.signUp}
                disabled={!email || !pass}
                loading={signupLoading}
                style={styles.btn}
              />
            </View>

            <View style={styles.policyRow}>
              <Text style={styles.policyText}>
                By continuing you accept our
              </Text>
              <Button
                onPress={this.openPrivacyPolicy}
                text=" privacy policy"
                textStyle={styles.policyBtnText}
              />
            </View>
          </View>

          <View>
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
      </View>
    );
  }
}
