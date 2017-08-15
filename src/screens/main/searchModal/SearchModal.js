import React from 'react';
import { View, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PopupDialog from 'react-native-popup-dialog';
import styles from './SearchModal.styles';

export default ({ refer }) =>
  (<PopupDialog ref={refer}>
    <View>
      <Text>MODAL</Text>
    </View>
  </PopupDialog>);
