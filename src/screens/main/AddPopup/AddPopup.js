import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import TouchableArea from '../../../components/TouchableArea/TouchableArea';
import styles from './AddPopup.styles';
import Divider from './Divider/Divider';
import Popup from '../../../components/Popup/Popup';
import SearchModal from '../SearchModal/SearchModal.presenter';

export default class AddPopup extends Component {
  static propTypes = {
    findFriend: PropTypes.func,
    createEntity: PropTypes.func,
    goToDebt: PropTypes.func
  };

  state = {
    virtName: '',
    searchVisible: false
  };

  setVirtName = virtName => this.setState({ virtName });

  toggleSearch = () => this.setState(prevState => ({ searchVisible: !prevState.searchVisible }));

  createDebts = () => {
    this.props.createEntity(this.state.virtName).then(response => {
      if (!response.error) {
        this.props.goToDebt(response.payload.id);
      }
    });
  };

  renderSearchModal = () =>
    (<SearchModal
      isVisible={this.state.searchVisible}
      onBackdropPress={this.toggleSearch}
      onSelected={this.toggleSearch}
    />);

  render() {
    const { findFriend } = this.props;

    return (
      <Popup {...this.props}>
        {this.renderSearchModal()}
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
      </Popup>
    );
  }
}
