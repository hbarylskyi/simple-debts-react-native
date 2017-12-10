import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '../../colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 3,
    maxHeight: height / 1.8,
    backgroundColor: colors.white
  },

  popup: {
    flex: 1
  },

  body: {
    flex: 1
  },

  title: {
    fontSize: 18,
    padding: 12,
    alignSelf: 'center'
  },

  divider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.lightGray
  }
});
