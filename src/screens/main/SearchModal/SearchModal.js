import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import PopupDialog from 'react-native-popup-dialog';
import TouchableArea from '.././../../components/TouchableArea/TouchableArea';
import PropTypes from 'prop-types';
import modalStyle from '../../../components/styles/basicModal';
import SearchHeader from './SearchHeader/SearchHeader';
import styles from './SearchModal.styles';

export default class SearchModal extends Component {
  static propTypes = {
    _ref: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  search = term => this.props.search(term);

  selectUser = userId => {
    this.props.select(userId).then(data => {
      if (!data.error) this.props.closeModal();
    });
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
    const { _ref, closeModal, users } = this.props;

    return (
      <PopupDialog ref={_ref} dialogStyle={modalStyle}>
        <SearchHeader onBackPress={closeModal} onTextChange={this.search} />

        {users.map(this.renderUser)}
      </PopupDialog>
    );
  }
}
