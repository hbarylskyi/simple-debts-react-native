import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PopupDialog from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';
import styles from './AddPopup.styles';
import popupStyle from '../../../components/styles/basicPopup';
import Divider from './Divider/Divider';

export default class AddPopup extends Component {
  static propTypes = {
    _ref: PropTypes.func,
    findFriend: PropTypes.func,
    createDebts: PropTypes.func
  };

  setVirtName = virtName => this.setState({ virtName });

  createDebts = () => this.props.createDebts(this.state.virtName);

  render() {
    const { _ref, findFriend } = this.props;

    return (
      <PopupDialog ref={_ref} dialogStyle={popupStyle}>
        <View style={styles.container}>
          <View style={styles.header}>
            <MKTextField
              placeholder="Friend name"
              floatingLabelEnabled
              underlineEnabled={false}
              onChangeText={this.setVirtName}
            />
          </View>

          <View style={styles.body}>
            <TouchableArea onPress={this.createDebts} style={styles.button}>
              <Text>ADD VIRTUAL USER</Text>
            </TouchableArea>

            <Divider />

            <TouchableArea onPress={findFriend} style={styles.button}>
              <Text>FIND YOUR FRIEND</Text>
            </TouchableArea>
          </View>
        </View>
      </PopupDialog>
    );
  }
}
