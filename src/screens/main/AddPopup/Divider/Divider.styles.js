import { StyleSheet } from 'react-native';
import * as colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row'
  },

  line: {
    flex: 1,
    marginHorizontal: 12
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
