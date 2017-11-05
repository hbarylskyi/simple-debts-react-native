import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Debt from '../../components/Debt/Debt.presenter';
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
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    fetchDebts: PropTypes.func.isRequired,
    goToDebt: PropTypes.func.isRequired,
    loadDebt: PropTypes.func.isRequired,
    selectDebt: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    debts: PropTypes.array.isRequired
  };

  state = {
    scrollEnabled: true,
    refreshing: false,
    loading: false
  };

  componentDidMount = () => {
    this.props.fetchDebts();
    this.props.navigation.setParams({ toggleAddPopup: this.toggleAddPopup });
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDebts();
    this.setState({ refreshing: false });
  };

  togglePopup = popup =>
    (popup.dialog.state.dialogState === 'opened' ? popup.dismiss() : popup.show());

  toggleSearchModal = () => this.togglePopup(this.searchModal);

  toggleAddPopup = () => this.togglePopup(this.popup);

  goToDebt = debtId => {
    this.props.selectDebt(debtId);
    this.props.goToDebt();
  };

  renderPopup = () =>
    <Popup findFriend={this.toggleSearchModal} _ref={popup => (this.popup = popup)} />;

  renderSearchModal = () =>
    <SearchModal closeModal={this.toggleSearchModal} _ref={modal => (this.searchModal = modal)} />;

  renderSummary = () => {
    const { user } = this.props;

    // <Button title="Logout" onPress={this.props.logout} />
    return (
      <View style={styles.summaryContainer}>
        <Image source={{ uri: user.picture }} style={styles.summaryAvatar} />

        <Text style={styles.summaryText}>
          {user.name}
        </Text>
      </View>
    );
  };

  renderSpinner = () =>
    (<Modal
      transparent
      visible={this.state.loading}
      animationType={'fade'}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size={'large'} color={colors.lightGray} />
      </View>
    </Modal>);

  render() {
    const { debts, loadDebt, goToDebt } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <View style={styles.container}>
        {this.renderPopup()}
        {this.renderSearchModal()}
        {this.renderSummary()}
        {this.renderSpinner()}
        <View style={styles.listContainer}>
          <FlatList
            data={debts}
            renderItem={({ item }) =>
              (<Debt
                debt={item}
                onSwipe={swipeFinished => this.setState({ scrollEnabled: swipeFinished })}
                onPress={async () => {
                  this.setState({ loading: true });
                  await loadDebt(item.id);
                  this.setState({ loading: false });
                  goToDebt();
                }}
              />)}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
                colors={['gray']}
                tintColor={'gray'}
              />
            }
            scrollEnabled={scrollEnabled}
          />
        </View>
      </View>
    );
  }
}
