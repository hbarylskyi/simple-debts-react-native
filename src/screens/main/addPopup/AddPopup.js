import React from 'react';
import { View, Text } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import PopupDialog from 'react-native-popup-dialog';
import styles from './addPopup.styles';

export default ({ findFriend, refer }) =>
  (<PopupDialog ref={refer}>
    <View>
      <MKButton onPress={findFriend}>
        <Text>Find friend</Text>
      </MKButton>
    </View>
  </PopupDialog>);
