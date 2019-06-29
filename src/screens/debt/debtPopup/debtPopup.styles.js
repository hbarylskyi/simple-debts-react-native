import { StyleSheet } from 'react-native';
import * as colors from '../../../utils/colors';

export default StyleSheet.create({
  takeBackgr: {
    backgroundColor: colors.red
  },

  giveBackgr: {
    backgroundColor: colors.green
  },

  input: {
    width: 175,
    color: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth*2,
    borderBottomColor: colors.white,
    padding: 0
  },

  inputBlack: {
    width: 175,
    color: colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.black,
    padding: 0
  },

  top: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray
  },

  bottom: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  submit: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 5
  },

  submitText: {
    fontSize: 15
  }
});
