import { StyleSheet } from 'react-native';
import * as colors from '../../../colors';

const btn = {
  alignSelf: 'center',
  padding: 10,
  borderRadius: 2,
  minWidth: 80
};

export default StyleSheet.create({
  container: {
    alignItems: 'stretch',
    justifyContent: 'space-around'
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

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  greenBtn: {
    ...btn,
    backgroundColor: colors.green
  },

  redBtn: {
    ...btn,
    backgroundColor: colors.red
  },

  btnText: {
    color: colors.white
  }
});
