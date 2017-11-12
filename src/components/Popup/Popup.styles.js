import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '../../colors';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  avoidingView: {
    flex: 1,
    justifyContent: 'center'
  },

  defContent: {
    borderRadius: 3,
    maxHeight: height / 2,
    flex: 1,
    backgroundColor: colors.white
  }
});
