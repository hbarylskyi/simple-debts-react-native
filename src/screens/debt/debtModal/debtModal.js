/* @flow */

import React from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import styles from './debtModal.styles';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';

export default (onRequestClose, text, onChangeVal, onChangeDescr, onSubmit) =>
  (<Modal animationType={'fade'} transparent={false} onRequestClose={onRequestClose}>
    <View style={styles.modal}>
      <Text>
        {arguments}
      </Text>

      <MKTextField
        style={styles.debtVal}
        keyboardType="numeric"
        placeholder="Debt value"
        onChangeText={onChangeVal}
      />

      <MKTextField
        style={styles.description}
        placeholder="Description"
        onChangeText={onChangeDescr}
      />

      <Button title="OK" onPress={onSubmit} />
    </View>
  </Modal>);
