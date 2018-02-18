import { StyleSheet } from 'react-native';
import * as colors from '../../../colors';

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 14
  },

  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20
  },

  currencyContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
