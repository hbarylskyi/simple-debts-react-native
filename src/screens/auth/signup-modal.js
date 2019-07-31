import React, { PureComponent } from 'react';
import config from 'react-native-config';
import { View, Text, TextInput, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './login.styles';
import ButtonDeprecated from '../../components/Button/ButtonDeprecated';
import { createResetAction } from '../../utils/helpers';
import Button from '../../components/Button/Button';
import NavigationService from '../../utils/NavigationService';
import * as colors from '../../utils/colors';
import Popup from '../../components/Popup/Popup';
import Modal from 'react-native-modal';

export default class SignUpModal extends PureComponent {

  state = {
    signupLoading: false,
  };

  openPrivacyPolicy = () => {
    Linking.openURL('https://simple-debts.flycricket.io/privacy.html');
  };

  render() {
    const { ...rest } = this.props;
    const {signupLoading} = this.state;
    const email = ''
    const pass = ''

    return (
      <Modal
        backdropOpacity={0.5}
        animationIn="fadeInUpBig"
        animationOut="fadeOutDownBig"
        useNativeDriver
        hideModalContentWhileAnimating
        style={{ margin: 0 }}
        {...rest}
      >
        <View>
          <Text>lalala</Text>
          <Text>
            lalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalalavlalalalalalalalalalalalalalalalalalalalalalalalalalalalalala
          </Text>

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
                title="Sign up"
                onPress={this.openSignUp}
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
        </View>
      </Modal>
    );
  }
}
