import React, { Component } from 'react';
import { Platform, TouchableWithoutFeedback, TouchableNativeFeedback, View } from 'react-native';

export default class TouchableArea extends Component {
  render() {
    const { children, isTransparent } = this.props;
    const Touchable =
      Platform.OS === 'ios' || isTransparent ? TouchableWithoutFeedback : TouchableNativeFeedback;

    return (
      <Touchable
        {...this.props}
        delayLongPress={Platform.OS === 'ios' ? 600 : 100}
        style={{ borderRadius: 100 }}
      >
        <View style={this.props.style}>
          {children}
        </View>
      </Touchable>
    );
  }
}
