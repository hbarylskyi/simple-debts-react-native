import React, { Component } from 'react';
import { View } from 'react-native';
import { MKTextField } from 'react-native-material-kit';
import PropTypes from 'prop-types';
import Button from '../../../components/Button/Button';
import styles from './AddPopup.styles';
import Divider from './Divider/Divider';
import Popup from '../../../components/Popup/Popup';
import SearchModal from '../SearchModal/SearchModal.presenter';
import * as colors from '../../../colors';

export default class AddPopup extends Component {
  static propTypes = {
    onUserSelected: PropTypes.func.isRequired
  };

  state = {
    virtName: '',
    searchVisible: false
  };

  setVirtName = virtName => this.setState({ virtName });

  toggleSearch = () => this.setState(prevState => ({ searchVisible: !prevState.searchVisible }));

  renderSearchModal = () =>
    (<SearchModal
      isVisible={this.state.searchVisible}
      onBackdropPress={this.toggleSearch}
      onSelected={this.props.onUserSelected}
    />);

  render() {
    const { onUserSelected } = this.props;
    const { virtName } = this.state;

    return (
      <Popup title={'Create a debt collection'} style={styles.popup} {...this.props}>
        {this.renderSearchModal()}

        <View style={styles.top}>
          <MKTextField
            placeholder="Friend name"
            floatingLabelEnabled
            underlineEnabled
            highlightColor={colors.lightGray}
            tintColor={colors.lightGray}
            onChangeText={this.setVirtName}
            style={styles.input}
            value={virtName}
          />
        </View>

        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={() => onUserSelected({ name: virtName })}
            disabled={!virtName}
            title={'Add virtual user'}
            style={styles.button}
          />

          <Divider />

          <View style={styles.bottom}>
            <Button onPress={this.toggleSearch} title={'Find your friend'} style={styles.button} />
          </View>
        </View>
      </Popup>
    );
  }
}
