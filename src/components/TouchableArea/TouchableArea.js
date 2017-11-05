import React, { Component, PropTypes } from 'react';
import { Platform, View, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';

export default class TouchableArea extends Component {
  static defaultProps = {
    children: [],
    isTransparent: false,
    borderless: false,
    noRipple: false,
    style: {}
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    isTransparent: PropTypes.bool,
    pressColor: PropTypes.string,
    borderless: PropTypes.bool,
    noRipple: PropTypes.bool,
    style: View.propTypes.style
  };

  static defaultProps = {
    pressColor: null
  };

  render() {
    const { children, isTransparent, noRipple, style, ...rest } = this.props;
    const Touchable =
      Platform.OS === 'ios' || isTransparent || noRipple
        ? TouchableWithoutFeedback
        : TouchableNativeFeedback;
    const background =
      Platform.OS === 'ios' || noRipple
        ? null
        : TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless);

    return (
      <Touchable
        {...rest}
        delayLongPress={Platform.OS === 'ios' ? 600 : 100}
        background={background}
      >
        <View style={style}>
          {children}
        </View>
      </Touchable>
    );
  }
}
