import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchHeader from './SearchHeader/SearchHeader';
import styles from './SearchModal.styles';
import Popup from '../../../components/Popup/Popup';
import SearchItem from './SearchItem/SearchItem';

export default class SearchModal extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    onSelected: PropTypes.func.isRequired,
    onBackdropPress: PropTypes.func.isRequired
  };

  state = {
    searchTerm: null,
    users: []
  };

  searchTextChanged = async searchTerm => {
    this.setState({ searchTerm });

    const users = await this.props.search(searchTerm);
    this.setState({ users });
  };

  render() {
    const { onBackdropPress, onSelected, ...rest } = this.props;
    const { users } = this.state;

    return (
      <Popup
        onBackdropPress={onBackdropPress}
        containerStyle={styles.popupContainer}
        noMargin
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        {...rest}
      >
        <SearchHeader
          onBackPress={onBackdropPress}
          onTextChange={this.searchTextChanged}
        />
        {users.map(user => (
          <SearchItem
            user={user}
            onPress={() => onSelected(user)}
            key={user.id}
          />
        ))}
      </Popup>
    );
  }
}
