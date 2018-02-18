import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const TouchableArea = ({ noRipple, ...rest }) => (
  <TouchableOpacity
    delayLongPress={600}
    activeOpacity={noRipple ? 1 : 0.7}
    underlayColor={null}
    {...rest}
  />
);

TouchableArea.propTypes = {
  noRipple: PropTypes.bool
};

TouchableArea.defaultProps = {
  noRipple: null
};


export default TouchableArea;