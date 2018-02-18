import React, { Component } from 'react';
import { Text, View, Platform, ActivityIndicator, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import TouchableArea from '../TouchableArea/TouchableArea';
import styles from './Button.styles';
import * as colors from '../../colors';

const isIOS = Platform.OS === 'ios';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onPress: PropTypes.func,
    renderText: PropTypes.func,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    lowercase: PropTypes.bool,
    style: ViewPropTypes.style,
    disabledStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    disabledTextStyle: Text.propTypes.style,
    spinnerColor: PropTypes.string
  };

  static defaultProps = {
    title: '',
    disabled: false,
    loading: false,
    lowercase: false,
    spinnerColor: colors.white
  };

  renderText = () => {
    const { title, disabled, renderText, textStyle, disabledTextStyle, lowercase } = this.props;
    let text;

    if (renderText) return renderText();

    if (Platform.OS === 'android' && !lowercase) {
      text = typeof title === 'string' ? title.toUpperCase() : title;
    } else {
      text = title;
    }

    return (
      <View>
        <Text
          style={[
            styles.defTextStyle,
            textStyle,
            disabled ? disabledTextStyle || styles.disabledText : null
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };

  renderSpinner = () => <ActivityIndicator color={this.props.spinnerColor} />;

  renderContent = () => (this.props.children ? this.props.children : this.renderText());

  render() {
    const { disabled, loading, lowercase, style, disabledStyle, onPress, ...rest } = this.props;

    return (
      <TouchableArea
        onPress={disabled || loading ? null : onPress}
        style={[styles.container, style, disabled ? disabledStyle : null]}
        noRipple={disabled || !onPress || (lowercase && !isIOS)}
        {...rest}
      >
        {loading ? this.renderSpinner() : this.renderContent()}
      </TouchableArea>
    );
  }
}
