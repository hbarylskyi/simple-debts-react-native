import { StyleSheet } from 'react-native';
import * as colors from '../../../../colors';

export const CURRENCY_SIZE = 50;

export default StyleSheet.create({
  popupContainer: {
    maxHeight: null,
    borderRadius: 0,
    backgroundColor: colors.green
  },

  slide: {
    flex: 1,
    justifyContent: 'flex-start'
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
    height: CURRENCY_SIZE,
    width: CURRENCY_SIZE,
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center'
  },

  cancelBtnText: {
    color: colors.white
  }
});
