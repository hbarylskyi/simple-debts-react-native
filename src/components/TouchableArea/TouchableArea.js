import React, { Component, PropTypes } from 'react';
import { Platform, View, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';

export default class TouchableArea extends Component {
  static propTypes = {
    children: PropTypes.object,
    isTransparent: PropTypes.bool,
    pressColor: PropTypes.string,
    borderless: PropTypes.bool
  };

  static defaultProps = {
    pressColor: 'black'
  };

  render() {
    const { children, isTransparent } = this.props;
    const Touchable =
      Platform.OS === 'ios' || isTransparent ? TouchableWithoutFeedback : TouchableNativeFeedback;

    const { style, ...rest } = this.props;

    return (
      <Touchable
        {...rest}
        style={null}
        delayLongPress={Platform.OS === 'ios' ? 600 : 100}
        background={TouchableNativeFeedback.Ripple(this.props.pressColor, this.props.borderless)}
      >
        <View style={style}>
          {children}
        </View>
      </Touchable>
    );
  }
}
