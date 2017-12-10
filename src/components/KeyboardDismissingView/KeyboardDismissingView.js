import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

const KeyboardDismissingView = (props) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View {...props} />
  </TouchableWithoutFeedback>
);

export default KeyboardDismissingView;
