import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './debtPopup.styles';
import ButtonDeprecated from '../../../components/Button/ButtonDeprecated';
import Popup from '../../../components/Popup/Popup';

export default class DebtPopup extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isGivePopup: PropTypes.bool.isRequired
  };

  state = {
    loading: false,
    value: '',
    description: ''
  };

  onSubmit = async () => {
    const { isGivePopup, onSubmit } = this.props;
    const { value, description } = this.state;

    this.setState({ loading: true });
    await onSubmit(isGivePopup, value, description);
    this.setState({ loading: false });

    // clear values after popup is hidden
    setTimeout(() => {
      this.setState({ value: '', description: '' });
    }, 300);
  };

  onChangeDescr = description => this.setState({ description });

  onChangeVal = value => this.setState({ value: parseInt(value, 10) });

  render() {
    const { isGivePopup, ...rest } = this.props;
    const { value, description, loading } = this.state;
    const backgr = isGivePopup ? styles.giveBackgr : styles.takeBackgr;
    const buttonText = isGivePopup ? 'Give' : 'Take';

    return (
      <Popup {...rest}>
        <View style={[styles.top, backgr]}>
          <TextInput
            placeholder={
              isGivePopup
                ? 'How much you did you give?'
                : 'How much did you take?'
            }
            onChangeText={this.onChangeVal}
            placeholderTextColor="white"
            keyboardType="numeric"
            autoFocus
            style={styles.input}
            maxLength={50}
          />
        </View>

        <View style={styles.bottom}>
          <TextInput
            placeholder="Description"
            onChangeText={this.onChangeDescr}
            onSubmitEditing={this.onSubmit}
            autoCapitalize="sentences"
            returnKeyType="done"
            style={styles.inputBlack}
            maxLength={50}
          />

          <ButtonDeprecated
            onPress={this.onSubmit}
            title={buttonText}
            loading={loading}
            textStyle={styles.submitText}
            disabled={!value || !description}
            style={styles.submit}
          />
        </View>
      </Popup>
    );
  }
}
