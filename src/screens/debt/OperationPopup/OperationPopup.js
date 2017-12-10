import React from 'react';
import { View, Text } from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import isoCurrency from 'iso-country-currency';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './OperationPopup.styles';
import * as colors from '../../../colors';
import Button from '../../../components/Button/Button';
import Popup from "../../../components/Popup/Popup";

const getCurrency = isoCode => {
  try {
    return isoCurrency.getAllInfoByISO(isoCode).symbol;
  } catch (e) {
    console.warn(e);
  }
};

const OperationPopup = ({ operation, user, debt, onClosePress, ...rest }) => {
  const { moneyReceiver, moneyAmount, description } = operation;
  const isTaken = moneyReceiver === user.id;
  const backgroundColor = isTaken ? colors.red : colors.green;
  const topText = getCurrency(debt.countryCode) + moneyAmount;
  const userName = operation.moneyReceiver === user.id ? user.name : debt.user.name;
  const date = moment(new Date()).format('ll');

  return (
    <Popup {...rest}>
      <View style={[styles.top, { backgroundColor }]}>
        <Text style={styles.moneyAmount}>
          {topText}
        </Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.mainInfo}>
          <Text style={[styles.text, styles.big]}>
            {userName}
          </Text>
          <Text style={[styles.text, styles.big]}>
            {date}
          </Text>
        </View>
        <Text style={styles.text}>
          {description}
        </Text>
        <Button
          onPress={onClosePress}
          title={'Close'}
          textStyle={styles.text}
          style={styles.button}
        />
      </View>
    </Popup>
  );
};

OperationPopup.propTypes = {
  operation: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  debt: PropTypes.object.isRequired,
  onClosePress: PropTypes.func.isRequired
};

export default OperationPopup;
