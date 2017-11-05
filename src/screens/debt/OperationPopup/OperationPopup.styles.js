import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '../../../colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: width - 20,
    borderRadius: 2
  },

  top: {
    flex: 1.4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray
  },

  bottom: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between'
  },

  moneyAmount: {
    color: colors.white,
    fontSize: 30
  },

  mainInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },

  text: {
    color: colors.gray,
    fontSize: 12
  },

  big: {
    fontSize: 20,
    color: colors.black
  },

  button: {
    alignSelf: 'flex-end',
    padding: 14
  }
});
