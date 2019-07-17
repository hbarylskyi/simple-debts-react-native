import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({
  onPress,
  loading,
  disabled,
  text,
  icon,
  style,
  textStyle,
  wrapperStyle,
  iconStyle,
  children,
  ...props
}) => (
  <TouchableOpacity
    onPress={loading || disabled ? undefined : onPress}
    style={style}
    {...props}
  >
    {loading ? (
      <ActivityIndicator />
    ) : (
      <View style={wrapperStyle}>
        {text && <Text style={textStyle}>{text}</Text>}
        {icon && <Image source={icon} style={[styles.btnIcon, iconStyle]} />}
        {children && children}
      </View>
    )}
  </TouchableOpacity>
);

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnIcon: {
    height: 20,
    width: 20
  }
});

export default Button;
