import { StyleSheet } from 'react-native';
import * as colors from '../../colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  summaryContainer: {
    flex: 1.5
  },

  summaryTop: {
    flex: 1,
    justifyContent: 'center'
  },

  summaryText: {
    color: colors.white,
    fontSize: 26,
    textAlign: 'center'
  },

  summaryTextBig: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold'
  },

  summaryTextBottom: {
    flex: 1,
    color: colors.white,
    fontSize: 30,
    textAlign: 'center',
    padding: 12
  },

  debtContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  listContainer: {
    flex: 2,
    backgroundColor: colors.white,
    borderTopWidth: 0.5,
    borderTopColor: '#D7D7D7'
  },

  valuesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white
  },

  toTake: {
    color: colors.red
  },

  toGive: {
    color: colors.green
  },

  popupButtonWrapper: {
    width: 56,
    height: 56,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },

  popupButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
