import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import styles from './Popup.styles';
import KeyboardDismissingView from '../KeyboardDismissingView/KeyboardDismissingView';
import ButtonDeprecated from '../Button/ButtonDeprecated';

const Popup = ({
  onBackdropPress,
  style,
  containerStyle,
  children,
  title,
  noMargin,
  cancelBtnProps,
  confirmBtnProps,
  ...rest
}) => (
  <Modal
    onBackdropPress={onBackdropPress}
    onBackButtonPress={onBackdropPress}
    backdropOpacity={0.5}
    animationIn="fadeIn"
    animationOut="fadeOut"
    avoidKeyboard
    style={noMargin && { margin: 0 }}
    useNativeDriver
    hideModalContentWhileAnimating
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
        <View style={[styles.body, style]}>{children}</View>

        {(cancelBtnProps || confirmBtnProps) && (
          <View style={styles.btnsContainer}>
            {cancelBtnProps && (
              <ButtonDeprecated
                title="CANCEL"
                {...cancelBtnProps}
                style={[styles.btn, cancelBtnProps.style]}
                textStyle={styles.btnText}
              />
            )}
            {confirmBtnProps && (
              <ButtonDeprecated
                title="OK"
                {...confirmBtnProps}
                style={[styles.btn, confirmBtnProps.style]}
                textStyle={styles.btnText}
              />
            )}
          </View>
        )}
      </KeyboardDismissingView>
    </KeyboardAvoidingView>
  </Modal>
);

Popup.propTypes = {
  onBackdropPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string,
  noMargin: PropTypes.bool,
  cancelBtnProps: PropTypes.object,
  confirmBtnProps: PropTypes.object
};

Popup.defaultProps = {
  style: null,
  title: null,
  noMargin: false,
  cancelBtnProps: null,
  confirmBtnProps: null
};

export default Popup;
