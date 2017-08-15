import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '../../../colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    borderRadius: 0,
    width: width - 20
  },

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

  debtText: { color: 'white' },

  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#9F8A8A'
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
    margin: 10
  },

  submitText: {
    fontSize: 15
  }
});
