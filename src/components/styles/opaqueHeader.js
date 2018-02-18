import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  position: 'absolute',
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
  elevation: 0,
  width,
  top: 0,
  left: 0
};
