import { StyleSheet } from 'react-native';
import * as colors from '../../colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    padding: 0,
    margin: 0
  },

  summaryContainer: {
    flex: 1,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center'
  },

  giveSummary: { backgroundColor: colors.green },

  takeSummary: { backgroundColor: colors.red },

  name: {
    fontSize: 30,
    color: 'white'
  },

  moneyAmount: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white'
  },

  creationButtons: {
    height: 50,
    flexDirection: 'row'
  },

  creationText: { fontSize: 20, color: 'white' },

  creationButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  takeButton: { backgroundColor: colors.red },

  giveButton: { backgroundColor: colors.green },

  parallaxHeader: { justifyContent: 'center', height: 50, paddingLeft: 50 },

  toTakeValue: {
    color: '#9E0E15'
  },

  toGiveValue: {
    color: '#17840C'
  }
});
