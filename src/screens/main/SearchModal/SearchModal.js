import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import PopupDialog from 'react-native-popup-dialog';
import TouchableArea from '.././../../components/TouchableArea/TouchableArea';
import PropTypes from 'prop-types';
import modalStyle from '../../../components/styles/basicModal';
import SearchHeader from './SearchHeader/SearchHeader';
import styles from './SearchModal.styles';
import Popup from '../../../components/Popup/Popup';

export default class SearchModal extends Component {
  static propTypes = {
    createDebt: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    onBackdropPress: PropTypes.func.isRequired
  };

  search = term => this.props.search(term);

  selectUser = async userId => {
    try {
      await this.props.createDebt(userId);
      this.props.onSelected();
    } catch (e) {
      console.error(e.message);
    }
  };

  renderUser = user =>
    (<TouchableArea key={user.id} style={styles.user} onPress={() => this.selectUser(user.id)}>
      <Image source={{ uri: user.picture }} style={styles.avatar} />

      <View style={{ justifyContent: 'center' }}>
        <Text>
          {user.name}
        </Text>
      </View>
    </TouchableArea>);

  render() {
    const { users, onBackdropPress } = this.props;

    return (
      <Popup {...this.props}>
        <SearchHeader onBackPress={onBackdropPress} onTextChange={this.search} />
        {users.map(this.renderUser)}
      </Popup>
    );
  }
}
