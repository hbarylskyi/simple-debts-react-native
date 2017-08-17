import React from 'react';
import { View, Text } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PopupDialog from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';
import styles from './AddPopup.styles';
import popupStyle from '../../../components/styles/basicPopup';

const AddPopup = ({ _ref, findFriend }) =>
  (<PopupDialog ref={_ref} dialogStyle={popupStyle}>
    <View style={styles.container}>
      <MKTextField placeholder="this does nothing" floatingLabelEnabled underlineEnabled={false} />

      <TouchableArea onPress={findFriend} style={styles.button}>
        <Text>FIND YOUR FRIEND</Text>
      </TouchableArea>
    </View>
  </PopupDialog>);

AddPopup.propTypes = {
  _ref: PropTypes.func.isRequired,
  findFriend: PropTypes.func.isRequired
};

export default AddPopup;
