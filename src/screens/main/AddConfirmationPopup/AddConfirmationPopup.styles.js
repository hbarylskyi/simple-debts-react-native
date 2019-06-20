import { StyleSheet } from 'react-native';
import * as colors from '../../../utils/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    textAlign: 'center',
    fontSize: 20
  },

  avatar: {
    marginVertical: 20,
    height: 80,
    width: 80,
    borderRadius: 20
  },

  currencyBtn: {
    margin: 12,
    padding: 12,
    backgroundColor: colors.lightGray,
    alignSelf: 'center'
  }
});
