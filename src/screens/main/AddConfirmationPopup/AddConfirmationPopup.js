import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Flag from 'react-native-flags';
import isoCurrency from 'iso-country-currency';
import DeviceInfo from 'react-native-device-info';
import Popup from '../../../components/Popup/Popup';
import Button from '../../../components/Button/Button';
import styles from './AddConfirmationPopup.styles';
import CurrencyModal from './CurrencyModal/CurrencyModal';

export default class AddConfirmationPopup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    createDebt: PropTypes.func.isRequired,
    goToDebt: PropTypes.func.isRequired,
    onConfirmation: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    currency: null,
    currencyModalVisible: true
  };

  onCurrencySelected = currency => {
    this.setState({ currency });
  };

  toggleCurrencyModal = () =>
    this.setState(prevState => ({ currencyModalVisible: !prevState.currencyModalVisible }));

  createDebt = async () => {
    const { user, createDebt, goToDebt, onConfirmation } = this.props;

    this.setState({ createLoading: true });
    try {
      await createDebt(user.id || user.name, !user.id);
      goToDebt();
      onConfirmation();
    } catch (e) {
      alert(e.message);
    } finally {
      this.setState({ createLoading: false });
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
    const { user, onConfirmation } = this.props;
    const { createLoading } = this.state;
    const country = DeviceInfo.getDeviceCountry();
    const currency = isoCurrency.getAllInfoByISO(country);

    return (
      <Popup
        title={'Create a debt collection'}
        style={styles.container}
        {...this.props}
        confirmBtnProps={{ onPress: this.createDebt, loading: createLoading, title: 'Yes' }}
        cancelBtnProps={{ onPress: onConfirmation, title: 'No' }}
      >
        {this.renderCurrencyModal()}
        <Text style={styles.text}>{`Do you want to add ${user.name}?`}</Text>
        <Button onPress={this.toggleCurrencyModal} style={styles.currencyContainer}>
          <Text>Currency: </Text>
          <Text>{`${currency.symbol}, ${currency.currency}`}</Text>
          <Flag type={'flat'} code={country} size={24} style={{ marginLeft: 10 }} />
        </Button>
        <Image source={user.picture} style={styles.avatar} />
      </Popup>
    );
  }
}
