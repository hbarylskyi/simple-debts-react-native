import React, { PropTypes } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';

const TouchableArea = ({ noRipple, onPress, borderless, ...rest }) => (
  <TouchableNativeFeedback
    onPress={onPress}
    delayLongPress={200}
    background={noRipple ? null : TouchableNativeFeedback.Ripple(null, borderless)}
  >
    <View {...rest} />
  </TouchableNativeFeedback>
);

TouchableArea.propTypes = {
  borderless: PropTypes.bool,
  noRipple: PropTypes.bool,
  onPress: PropTypes.func
};

TouchableArea.defaultProps = {
  borderless: false,
  noRipple: false,
  onPress: () => null
};

export default TouchableArea;
