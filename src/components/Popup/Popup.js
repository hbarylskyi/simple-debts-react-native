import React from 'react';
import { View, KeyboardAvoidingView, Platform, Text, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './Popup.styles';
import KeyboardDismissingView from '../KeyboardDismissingView/KeyboardDismissingView';

const Popup = ({ onBackdropPress, style, containerStyle, children, title, noMargin, ...rest }) =>
  (<Modal
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackdropPress}
    backdropOpacity={0.5}
    useNativeDriver
    animationIn={'fadeIn'}
    animationOut={'fadeOut'}
    avoidKeyboard
    style={noMargin && { margin: 0 }}
    {...rest}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={-50}
      style={[styles.container, containerStyle]}
    >
      <KeyboardDismissingView style={styles.popup}>
        {title && <Text style={styles.title}>{title}</Text>}
        {title && <View style={styles.divider} />}
        <View style={[styles.body, style]}>
          {children}
        </View>
      </KeyboardDismissingView>
    </KeyboardAvoidingView>
  </Modal>);

Popup.propTypes = {
  onBackdropPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string,
  noMargin: PropTypes.bool
};

Popup.defaultProps = {
  style: null,
  title: null,
  noMargin: false
};

export default Popup;
