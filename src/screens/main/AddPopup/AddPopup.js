import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import ButtonDeprecated from '../../../components/Button/ButtonDeprecated';
import styles from './AddPopup.styles';
import Divider from './Divider/Divider';
import Popup from '../../../components/Popup/Popup';
import SearchModal from '../SearchModal/SearchModal.presenter';
import * as colors from '../../../utils/colors';

export default class AddPopup extends Component {
  static propTypes = {
    onUserSelected: PropTypes.func.isRequired
  };

  state = {
    virtName: '',
    searchVisible: false
  };

  setVirtName = virtName => this.setState({ virtName });

  onUserSelected = user => {
    this.toggleSearch();
    this.props.onUserSelected(user);
  };

  toggleSearch = () =>
    this.setState(prevState => ({ searchVisible: !prevState.searchVisible }));

  renderSearchModal = () => (
    <SearchModal
      isVisible={this.state.searchVisible}
      onBackdropPress={this.toggleSearch}
      onSelected={this.onUserSelected}
    />
  );

  render() {
    const { onUserSelected } = this.props;
    const { virtName } = this.state;

    return (
      <Popup title="Create a Debt" style={styles.popup} {...this.props}>
        {this.renderSearchModal()}

        <View style={styles.top}>
          <View>
            <Text style={styles.description}>
              You can create a Debt with a 'virtual' user:
            </Text>
            <MKTextField
              placeholder="User name"
              underlineEnabled
              highlightColor={colors.lightGray}
              tintColor={colors.lightGray}
              onChangeText={this.setVirtName}
              value={virtName}
              autoCapitalize="sentences"
              autoCorrect={false}
              style={styles.input}
              maxLength={50}
            />

          </View>
          <ButtonDeprecated
            onPress={() => onUserSelected({ name: virtName })}
            disabled={!virtName}
            title="Create a Debt with virtual user"
            style={styles.button}
          />
        </View>

        <Divider />

        <View style={styles.bottom}>
          <ButtonDeprecated
            onPress={this.toggleSearch}
            title="Search for a registered user"
            style={styles.button}
          />
        </View>
      </Popup>
    );
  }
}
