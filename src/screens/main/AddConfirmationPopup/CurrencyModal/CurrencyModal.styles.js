import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  popupContainer: {
    maxHeight: null,
    borderRadius: 0
  },

  itemWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },

  item: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: 'green'
  }
});
