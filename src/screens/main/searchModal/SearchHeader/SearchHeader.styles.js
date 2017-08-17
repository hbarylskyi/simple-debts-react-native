import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    flex: 0,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center'
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

  searchInput: { flex: 1 }
});
