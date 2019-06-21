import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Debt from '../../components/Debt/Debt.presenter';
import styles from './main.styles';
import * as colors from '../../utils/colors';
import TouchableArea from '../../components/TouchableArea/TouchableArea';
import AddPopup from './AddPopup/AddPopup';
import AddConfirmationPopup from './AddConfirmationPopup/AddConfirmationPopup.presenter';
import HeaderButton from '../../components/HeaderButton/HeaderButton';

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
    debts: PropTypes.array.isRequired
  };

  state = {
    scrollEnabled: true,
    refreshing: false,
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
  }

  onFocus = () => {
    const { fetchDebts } = this.props;
    fetchDebts();
  };

  signOut = () => {
    this.props.signOut();
  };

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

  renderEmptyPlaceholder = () => (
    <View style={styles.placeholderContainer}>
      <IonIcon name="ios-paper" size={40} />
      <Text style={styles.placeholderText}>
        There are no records yet. Tap '+' to add one!
      </Text>
    </View>
  );

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
    const { scrollEnabled, refreshing } = this.state;

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
                onSwipe={swipeFinished =>
                  this.setState({ scrollEnabled: swipeFinished })
                }
                onPress={async () => {
                  navigation.navigate('DebtScreen', { debtId: item.id });
                }}
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
            scrollEnabled={scrollEnabled}
          />
        </View>
      </View>
    );
  }
}
