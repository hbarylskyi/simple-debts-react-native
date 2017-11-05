import { StyleSheet } from 'react-native';
import * as colors from '../../colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  summaryContainer: {
    flex: 1.5,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center'
  },

  summaryTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  summaryText: {
    color: colors.white,
    fontSize: 35
  },

  summaryAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 10
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
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay
  }
});
