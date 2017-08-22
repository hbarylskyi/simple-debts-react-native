import { StyleSheet } from 'react-native';
import * as colors from '../../../colors';

export default StyleSheet.create({
  swipeout: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray
  },

  acceptanceButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  personContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  operation: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },

  operationMiddle: {
    flex: 2
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10
  },

  top: {
    fontSize: 20
  },

  descr: {
    color: colors.black
  }
});
