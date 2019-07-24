import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import isoCurrency from 'iso-country-currency';
import DeviceInfo from 'react-native-device-info';
import Popup from '../../../components/Popup/Popup';
import styles from './AddConfirmationPopup.styles';
import CurrencyModal from './CurrencyModal/CurrencyModal';
import Button from '../../../components/Button/Button';

export default class AddConfirmationPopup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    createDebt: PropTypes.func.isRequired,
    onConfirmation: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    currencyModalVisible: false,
    currency: isoCurrency.getAllInfoByISO(DeviceInfo.getDeviceCountry())
      .currency
  };

  onCurrencySelected = currency => {
    this.setState({ currency });
    this.toggleCurrencyModal();
  };

  toggleCurrencyModal = () =>
    this.setState(prevState => ({
      currencyModalVisible: !prevState.currencyModalVisible
    }));

  createDebt = async () => {
    const { currency } = this.state;
    const { user, createDebt, onConfirmation } = this.props;

    this.setState({ createLoading: true });
    const { payload, error } = await createDebt(
      user.id || user.name,
      !user.id,
      currency
    );
    this.setState({ createLoading: false });

    if (error) {
      const { response = {} } = payload;
      alert(response.error || payload.message);
    } else {
      onConfirmation(payload.id);
    }
  };

  renderCurrencyModal = () => (
    <CurrencyModal
      isVisible={this.state.currencyModalVisible}
      onSelected={this.onCurrencySelected}
      onBackdropPress={this.toggleCurrencyModal}
    />
  );

  render() {
    const { user, onClose } = this.props;
    const { createLoading, currency } = this.state;

    if (!user) return null;

    return (
      <Popup
        title={`Do you want to add ${user.name}?`}
        style={styles.container}
        {...this.props}
        confirmBtnProps={{
          onPress: this.createDebt,
          loading: createLoading,
          title: 'Yes'
        }}
        cancelBtnProps={{ onPress: onClose, title: 'No' }}
      >
        {this.renderCurrencyModal()}

        <View>
          <Text style={styles.text}>Currency: {currency}</Text>
          <Button
            onPress={this.toggleCurrencyModal}
            text="Select another currency"
            style={styles.currencyBtn}
          />
        </View>
      </Popup>
    );
  }
}
