import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, Image } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './main.styles';
import * as colors from '../../colors';
import TouchableArea from '../../components/TouchableArea/TouchableArea';
import Popup from './AddPopup/AddPopup.presenter';
import SearchModal from './SearchModal/SearchModal.presenter';
import headerStyle from '../../components/styles/opaqueHeader';

export default class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerRight: (
        <View style={styles.popupButtonWrapper}>
          <TouchableArea onPress={params.toggleAddPopup} borderless style={styles.popupButton}>
            <Icon name={'plus'} size={20} color={'white'} />
          </TouchableArea>
        </View>
      ),

      headerStyle
    };
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired,
    fetchDebts: PropTypes.func.isRequired,
    goToDebt: PropTypes.func.isRequired,
    selectDebt: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    debts: PropTypes.array.isRequired
  };

  componentDidMount = () => {
    this.props.fetchDebts();
    this.props.navigation.setParams({ toggleAddPopup: this.toggleAddPopup });
  };

  togglePopup = popup =>
    (popup.dialog.state.dialogState === 'opened' ? popup.dismiss() : popup.show());

  toggleSearchModal = () => this.togglePopup(this.searchModal);

  toggleAddPopup = () => this.togglePopup(this.popup);

  goToDebt(debtId) {
    this.props.selectDebt(debtId);
    this.props.goToDebt();
  }

  renderPopup = () =>
    (<Popup
      findFriend={this.toggleSearchModal}
      _ref={popup => {
        this.popup = popup;
      }}
    />);

  renderSearchModal = () =>
    (<SearchModal
      closeModal={this.toggleSearchModal}
      _ref={modal => {
        this.searchModal = modal;
      }}
    />);

  renderSummary = () => {
    const { toGive, toTake } = this.props.summary;
    const color = colors.green;

    return (
      <View style={[styles.summaryContainer, { backgroundColor: color }]}>
        <View style={styles.summaryContainer}>
          <Text style={styles.toGiveValue}>
            Given: {toTake}
          </Text>
          <Text style={styles.toTakeValue}>
            Taken: {toGive}
          </Text>
        </View>
      </View>
    );
  };

  renderForeground = () =>
    (<View style={styles.logoutButton}>
      <Button title="Logout" onPress={this.props.logout} />
    </View>);

  renderDebt = debt => {
    const { name, picture } = debt.user;
    const textColorStyle =
      debt.moneyReceiver === this.props.userId ? styles.toTakeValue : styles.toGiveValue;

    return (
      <TouchableArea key={debt.id} onPress={() => this.goToDebt(debt.id)}>
        <View style={styles.debtContainer}>
          <View style={styles.personContainer}>
            <Image style={styles.avatar} source={{ uri: picture }} />
            <Text>
              {name}
            </Text>
          </View>

          <Text style={[styles.debtValue, textColorStyle]}>
            {debt.summary}
          </Text>
        </View>
      </TouchableArea>
    );
  };

  render() {
    const { debts } = this.props;

    return (
      <View style={styles.container}>
        {this.renderPopup()}
        {this.renderSearchModal()}
        <ParallaxScrollView
          style={styles.container}
          parallaxHeaderHeight={300}
          backgroundColor="white"
          renderBackground={this.renderSummary}
          renderForeground={this.renderForeground}
        >
          <View style={styles.listContainer}>
            {debts.map(this.renderDebt)}
          </View>
        </ParallaxScrollView>
      </View>
    );
  }
}
