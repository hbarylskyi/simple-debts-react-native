import { StyleSheet } from 'react-native';
import * as colors from '../../../../utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  user: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10
  }
});
