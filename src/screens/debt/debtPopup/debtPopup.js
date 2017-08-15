import React from 'react';
import { View, Text } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PopupDialog from 'react-native-popup-dialog';
import styles from './debtPopup.styles';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';
import * as colors from '../../../colors';

export default ({ isGivePopup, onChangeVal, onChangeDescr, onSubmit, refer }) => {
  const backgr = isGivePopup ? styles.giveBackgr : styles.takeBackgr;
  const buttonText = isGivePopup ? 'Give' : 'Take';

  return (
    <PopupDialog dialogStyle={styles.container} ref={refer}>
      <View style={[styles.top, backgr]}>
        <MKTextField
          style={styles.input}
          textInputStyle={styles.debtText}
          highlightColor={'white'}
          tintColor={'white'}
          keyboardType="numeric"
          placeholder="Debt value"
          onChangeText={onChangeVal}
          floatingLabelEnabled
          underlineEnabled={false}
        />
      </View>

      <View style={styles.bottom}>
        <MKTextField
          style={styles.input}
          placeholder="Description"
          onChangeText={onChangeDescr}
          floatingLabelEnabled
          underlineEnabled={false}
          highlightColor={colors.gray}
        />

        <TouchableArea onPress={onSubmit} style={styles.submit}>
          <Text style={styles.submitText}>
            {buttonText}
          </Text>
        </TouchableArea>
      </View>
    </PopupDialog>
  );
};
