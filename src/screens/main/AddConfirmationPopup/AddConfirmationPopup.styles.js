import { StyleSheet } from 'react-native';
import * as colors from '../../../utils/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  text: {
    textAlign: 'center',
    fontSize: 20,
    color: colors.black
  },

  avatar: {
    marginVertical: 20,
    height: 80,
    width: 80,
    borderRadius: 20
  },

  currencyBtn: {
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: colors.lightGray,
    alignSelf: 'center',
    borderRadius: 10
  }
});
