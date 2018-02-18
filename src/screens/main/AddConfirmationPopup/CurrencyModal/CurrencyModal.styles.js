import { StyleSheet } from 'react-native';
import * as colors from '../../../../colors';

export default StyleSheet.create({
  popupContainer: {
    maxHeight: null,
    borderRadius: 0,
    backgroundColor: colors.blue
  },

  pagination: {
    bottom: 0
  },

  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  item: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },

  itemText: {
    fontSize: 18,
    color: colors.white
  },

  cancelBtn: {
    padding: 16,
    alignSelf: 'center'
  },

  cancelBtnText: {
    color: colors.white
  }
});
