import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './debtPopup.styles';
import ButtonDeprecated from '../../../components/Button/ButtonDeprecated';
import Popup from '../../../components/Popup/Popup';

export default class DebtPopup extends Component {
  static propTypes = {
    onChangeVal: PropTypes.func.isRequired,
    onChangeDescr: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isGivePopup: PropTypes.bool.isRequired
  };

  state = {
    loading: false
  };

  onSubmit = async () => {
    this.setState({ loading: true });
    await this.props.onSubmit();
    this.setState({ loading: false });
  };

  render() {
    const { isGivePopup, onChangeVal, onChangeDescr, ...rest } = this.props;
    const backgr = isGivePopup ? styles.giveBackgr : styles.takeBackgr;
    const buttonText = isGivePopup ? 'Give' : 'Take';

    return (
      <Popup {...rest}>
        <View style={[styles.top, backgr]}>
          <TextInput
            placeholder={`How much you ${isGivePopup ? 'gave' : 'took'}?`}
            onChangeText={onChangeVal}
            placeholderTextColor="white"
            keyboardType="numeric"
            autoFocus
            style={styles.input}
          />
        </View>

        <View style={styles.bottom}>
          <TextInput
            placeholder="Description"
            onChangeText={onChangeDescr}
            onSubmitEditing={this.onSubmit}
            autoCorrect={false}
            autoCapitalize="sentences"
            returnKeyType="done"
            style={styles.inputBlack}
          />

          <ButtonDeprecated
            onPress={this.onSubmit}
            title={buttonText}
            loading={this.state.loading}
            textStyle={styles.submitText}
            style={styles.submit}
          />
        </View>
      </Popup>
    );
  }
}
