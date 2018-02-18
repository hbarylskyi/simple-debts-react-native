import { StyleSheet } from 'react-native';
import * as colors from '../../../colors';
import { CURRENCY_SIZE } from './CurrencyModal/CurrencyModal.styles';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 20
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },

  currencyBtn: {
    margin: 12,
    padding: 12,
    backgroundColor: colors.lightGray,
    alignSelf: 'center'
  }
});
