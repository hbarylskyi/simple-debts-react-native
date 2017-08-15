import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  position: 'absolute',
  backgroundColor: 'transparent',
  height: 50,
  width,
  top: 0,
  left: 0
};
