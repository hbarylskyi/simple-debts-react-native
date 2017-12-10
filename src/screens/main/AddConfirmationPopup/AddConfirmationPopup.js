import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import Popup from '../../../components/Popup/Popup';
import Button from '../../../components/Button/Button';
import styles from './AddConfirmationPopup.styles';

export default class AddConfirmationPopup extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    createDebt: PropTypes.func.isRequired,
    goToDebt: PropTypes.func.isRequired,
    onConfirmation: PropTypes.func.isRequired
  };

  state = {
    loading: false
  };

  createDebt = async () => {
    const { user, createDebt, goToDebt, onConfirmation } = this.props;

    this.setState({ createLoading: true });
    try {
      await createDebt(user.id || user.name, !user.id);
      goToDebt();
      onConfirmation();
    } catch (e) {
      alert(e.message);
    } finally {
      this.setState({ createLoading: false });
    }
  };

  render() {
    const { user, onConfirmation } = this.props;
    const { createLoading } = this.state;

    return (
      <Popup title={'Create a debt collection'} style={styles.container} {...this.props} >
        <Text style={styles.text}>{`Do you want to add ${user.name}?`}</Text>

        <Image source={user.picture} style={styles.avatar} />

        <View style={styles.buttons}>
          <Button
            onPress={this.createDebt}
            loading={createLoading}
            title={'Yep'}
            style={styles.greenBtn}
            textStyle={styles.btnText}
          />
          <Button
            onPress={onConfirmation}
            title={'Nah'}
            style={styles.redBtn}
            textStyle={styles.btnText}
          />
        </View>
      </Popup>
    );
  }
}
