import { StyleSheet } from 'react-native';
import * as colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },

  flex: {
    flex: 1
  },

  lineTop: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: colors.lightGray
  },

  lineBottom: {
    flex: 1
  }
});
