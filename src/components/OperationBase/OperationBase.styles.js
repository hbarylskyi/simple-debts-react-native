import { StyleSheet } from 'react-native';
import * as colors from '../../utils/colors';

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },

  operationMiddle: {
    flex: 2
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10
  },

  top: {
    color: colors.black,
    fontSize: 20
  },

  descr: {
    color: colors.black
  }
});
