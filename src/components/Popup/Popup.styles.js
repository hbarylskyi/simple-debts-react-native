import { Dimensions, StyleSheet } from 'react-native';
import * as colors from '../../utils/colors';

const { height } = Dimensions.get('window');

const btn = {
  borderRadius: 10,
  minWidth: 100,
  marginBottom: 16,
  padding: 16,
  backgroundColor: colors.lightGray
};

export default StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
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
  },

  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  btn,

  btnText: {
    color: colors.black
  }
});
