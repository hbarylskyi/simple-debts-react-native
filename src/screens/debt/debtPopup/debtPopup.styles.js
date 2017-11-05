import { StyleSheet } from 'react-native';
import * as colors from '../../../colors';

export default StyleSheet.create({
  takeBackgr: {
    backgroundColor: colors.red
  },

  giveBackgr: {
    backgroundColor: colors.green
  },

  input: {
    paddingBottom: 30,
    width: 175
  },

  debtText: {
    color: 'white'
  },

  top: {
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },

  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  submit: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5
  },

  submitText: {
    fontSize: 15
  }
});
