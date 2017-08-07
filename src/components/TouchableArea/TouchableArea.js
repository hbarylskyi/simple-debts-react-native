import React, { Component } from "react";
import {
  Platform,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from "react-native";

export default class TouchableArea extends Component {
  render() {
    const { children, isTransparent } = this.props;
    const Touchable =
      Platform.OS === "ios" || isTransparent
        ? TouchableWithoutFeedback
        : TouchableNativeFeedback;

    return (
      <Touchable
        {...this.props}
        delayLongPress={Platform.OS === "ios" ? 600 : 100}
      >
        {children}
      </Touchable>
    );
  }
}
