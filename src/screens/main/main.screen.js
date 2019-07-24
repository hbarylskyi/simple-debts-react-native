import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Debt from '../../components/Debt/Debt.presenter';
import debtScreenStyles from '../debt/debt.styles';
import styles from './main.styles';
import * as colors from '../../utils/colors';
import TouchableArea from '../../components/TouchableArea/TouchableArea';
import AddPopup from './AddPopup/AddPopup';
import AddConfirmationPopup from './AddConfirmationPopup/AddConfirmationPopup.presenter';
import HeaderButton from '../../components/HeaderButton/HeaderButton';
import * as firebase from 'react-native-firebase';

export default class MainScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const { signOut } = params;

    return {
      headerLeft: (
        <HeaderButton onPress={signOut}>
          <IonIcon name="ios-log-out" size={22} color={colors.white} />
        </HeaderButton>
      ),

      headerRight: (
        <View style={styles.popupButtonWrapper}>
          <TouchableArea
            onPress={params.toggleAddPopup}
            borderless
            style={styles.popupButton}
          >
            <Icon name="plus" size={20} color="white" />
          </TouchableArea>
        </View>
      ),

      headerTransparent: true
    };
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    fetchDebts: PropTypes.func.isRequired,
    debts: PropTypes.array.isRequired,
    uploadPushToken: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  };

  state = {
    refreshing: false,
    loading: false,
    popupVisible: false,
    userToAdd: {}
  };

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({
      toggleAddPopup: this.toggleAddPopup,
      signOut: this.signOut
    });

    navigation.addListener('didFocus', this.onFocus);

    this.requestPushNotificationsPermissions();
  }

  requestPushNotificationsPermissions = async () => {
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      console.log("we've got push permissions");
    } else {
      try {
        console.log('requesting permission');
        await firebase.messaging().requestPermission();
      } catch (error) {
        console.log('permissions rejected :(');
      }
    }

    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      this.props.uploadPushToken(fcmToken);
    } else {
      console.log('could not get push token from firebase');
    }
  };

  onFocus = async () => {
    const { fetchDebts } = this.props;

    this.setState({ loading: true });
    await fetchDebts();
    this.setState({ loading: false });
  };

  signOut = () => this.props.signOut();

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDebts();
    this.setState({ refreshing: false });
  };

  toggleAddPopup = () =>
    this.setState(prevState => ({ popupVisible: !prevState.popupVisible }));

  toggleConfirmationPopup = () =>
    this.setState(prevState => ({
      confirmationPopupVisible: !prevState.confirmationPopupVisible
    }));

  renderEmptyPlaceholder = () => {
    const { loading } = this.state;

    return loading ? (
      <ActivityIndicator size="large" style={debtScreenStyles.spinner} />
    ) : (
      <TouchableWithoutFeedback>
        <View style={styles.placeholderContainer}>
          <IonIcon name="ios-paper" size={40} color={colors.black} />
          <Text style={styles.placeholderText}>
            There are no records yet. Tap '+' to add one!
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderAddPopup = () => (
    <AddPopup
      isVisible={this.state.popupVisible}
      onBackdropPress={this.toggleAddPopup}
      onUserSelected={userToAdd => {
        this.setState({ userToAdd });

        this.toggleAddPopup();

        setTimeout(this.toggleConfirmationPopup, 700);
      }}
    />
  );

  renderAddConfirmationPopup = () => (
    <AddConfirmationPopup
      isVisible={this.state.confirmationPopupVisible}
      onBackdropPress={this.toggleConfirmationPopup}
      onClose={this.toggleConfirmationPopup}
      onConfirmation={debtId => {
        this.toggleConfirmationPopup();
        this.props.navigation.navigate('DebtScreen', { debtId });
      }}
      user={this.state.userToAdd}
    />
  );

  renderSummary = () => {
    const { user } = this.props;

    return (
      <View style={styles.summaryContainer}>
        <Image source={{ uri: user.picture }} style={styles.summaryAvatar} />

        <Text style={styles.summaryText}>{user.name}</Text>
      </View>
    );
  };

  render() {
    const { debts, navigation } = this.props;
    const { refreshing } = this.state;

    return (
      <View style={styles.container}>
        {this.renderAddPopup()}
        {this.renderSummary()}
        {this.renderAddConfirmationPopup()}
        <View style={styles.listContainer}>
          <FlatList
            data={debts}
            renderItem={({ item }) => (
              <Debt
                debt={item}
                onPress={async () =>
                  navigation.navigate('DebtScreen', { debtId: item.id })
                }
              />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.renderEmptyPlaceholder}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.onRefresh}
                colors={['gray']}
                tintColor="gray"
              />
            }
          />
        </View>
      </View>
    );
  }
}
