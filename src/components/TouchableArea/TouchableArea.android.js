import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableNativeFeedback } from 'react-native';

const getBackground = borderless =>
  (borderless
    ? TouchableNativeFeedback.SelectableBackgroundBorderless()
    : TouchableNativeFeedback.SelectableBackground());

const TouchableArea = ({ noRipple, onPress, borderless, ...rest }) => (
  <TouchableNativeFeedback
    onPress={onPress}
    delayLongPress={200}
    background={noRipple ? null : getBackground(borderless)}
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
