/* @flow */

import React from "react";
import { View, Text, Button, Image, Modal, TextInput } from "react-native";
import { MKTextField } from "react-native-material-kit";
import styles from "./debtModal.styles";
import TouchableArea from "../../../components/TouchableArea/TouchableArea";

export default (onChangeVal, onChangeDescr, onSubmit, onRequestClose, text) =>
  <Modal
    animationType={"fade"}
    transparent={false}
    onRequestClose={onRequestClose}
  >
    <View style={styles.modal}>
      <Text>
        {text}
      </Text>

      <MKTextField
        style={styles.debtVal}
        keyboardType="numeric"
        placeholder="Debt value"
        onChangeText={this.props.onChangeVal}
      />

      <MKTextField
        style={styles.description}
        placeholder="Description"
        onChangeText={this.props.onChangeDescr}
      />

      <Button title="OK" onPress={onSubmit} />
    </View>
  </Modal>;
