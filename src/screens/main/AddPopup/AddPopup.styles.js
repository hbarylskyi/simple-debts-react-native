import { StyleSheet } from 'react-native';
import * as colors from '../../../utils/colors';

export default StyleSheet.create({
  popup: {
    paddingHorizontal: 30
  },

  top: {
    flex: 1,
    justifyContent: 'space-evenly'
  },

  bottom: {
    flex: 0.5,
    justifyContent: 'center'
  },

  description: {
    fontSize: 12,
    color: colors.black,
    textAlign: 'center'
  },

  input: {
    marginBottom: 15,
    marginTop: 10
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.lightGray
  }
});
