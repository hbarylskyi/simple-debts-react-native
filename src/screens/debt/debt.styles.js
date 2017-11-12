import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '../../colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  summaryContainer: {
    flex: 1.5,
    justifyContent: 'center'
  },

  summaryGiven: { backgroundColor: colors.green },

  summaryTaken: { backgroundColor: colors.red },

  name: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },

  moneyAmount: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },

  stateMessage: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray
  },

  messageText: {
    color: colors.gray,
    textAlign: 'center'
  },

  listContainer: {
    flex: 2
  },

  listContent: {
    paddingBottom: 50
  },

  creationButtons: {
    height: 50,
    width,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },

  creationText: { fontSize: 20, color: 'white' },

  creationButton: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  redBtn: { backgroundColor: colors.red },

  greenBtn: { backgroundColor: colors.green }
});
