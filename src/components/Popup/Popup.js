import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './Popup.styles';

const Popup = ({ onBackdropPress, style, children, ...rest }) =>
  (<Modal
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackdropPress}
    backdropOpacity={0.5}
    useNativeDriver
    animationIn={'fadeIn'}
    animationOut={'fadeOut'}
    avoidKeyboard
    {...rest}
  >
    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={-50}>
      <View style={[styles.defContent, style]}>
        {children}
      </View>
    </KeyboardAvoidingView>
  </Modal>);

Popup.propTypes = {
  onBackdropPress: PropTypes.func.isRequired,
  style: View.propTypes.style,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

Popup.defaultProps = {
  style: null
};

export default Popup;
