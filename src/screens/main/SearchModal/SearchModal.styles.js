import { StyleSheet, Dimensions } from 'react-native';
import * as colors from '../../../colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {},

  user: {
    flexDirection: 'row',
    padding: 10
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10
  }
});
