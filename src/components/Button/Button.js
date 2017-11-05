import React, { Component } from 'react';
import { Text, View, Platform, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import TouchableArea from '../TouchableArea/TouchableArea';
import styles from './Button.styles';
import * as colors from '../../colors';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    onPress: PropTypes.func,
    renderText: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    lowercase: PropTypes.bool,
    style: View.propTypes.style,
    disabledStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    disabledTextStyle: Text.propTypes.style
  };

  static defaultProps = {
    children: null,
    onPress: null,
    renderText: undefined,
    title: '',
    disabled: false,
    loading: false,
    lowercase: false,
    style: null,
    disabledStyle: null,
    textStyle: null,
    disabledTextStyle: null
  };

  renderText = () => {
    const { title, disabled, renderText, textStyle, disabledTextStyle, lowercase } = this.props;
    const disabledText = [styles.disabledText, disabledTextStyle];
    let text;

    if (renderText) return renderText();

    if (Platform.OS === 'android' && !lowercase) {
      text = title.toUpperCase();
    } else {
      text = title;
    }

    return (
      <View>
        <Text style={[styles.defTextStyle, textStyle, disabled ? disabledText : null]}>
          {text}
        </Text>
      </View>
    );
  };

  renderSpinner = () => <ActivityIndicator color={colors.white} />;

  renderContent = () => (this.props.children ? this.props.children : this.renderText());

  render() {
    const { disabled, loading, style, disabledStyle, onPress, children, ...rest } = this.props;

    return (
      <TouchableArea
        onPress={disabled || loading ? null : onPress}
        style={[styles.container, style, disabled ? disabledStyle : null]}
        noRipple={disabled || !onPress}
        {...rest}
      >
        {loading ? this.renderSpinner() : this.renderContent()}
      </TouchableArea>
    );
  }
}
