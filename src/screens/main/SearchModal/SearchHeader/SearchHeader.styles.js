import { StyleSheet } from 'react-native';
import * as colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    flex: 0,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray
  },

  buttonWrapper: {
    width: 56,
    height: 56,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },

  backButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  searchInput: {
    marginRight: 50,
    fontSize: 14
  },

  backIcon: {
    tintColor: colors.black
  },

  searchIcon: {
    marginHorizontal: 5
  }
});
