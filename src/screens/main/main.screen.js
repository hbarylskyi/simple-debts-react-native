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
import AddPopup from './AddPopup/AddPopup.presenter';
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
    debts: PropTypes.array.isRequired
  };

  state = {
    scrollEnabled: true,
    refreshing: false,
    loading: false,
    popupVisible: false,
    searchVisible: false
  };

  componentDidMount() {
    this.props.fetchDebts();
    this.props.navigation.setParams({ toggleAddPopup: this.togglePopup });
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.fetchDebts();
    this.setState({ refreshing: false });
  };

  togglePopup = () => this.setState(prevState => ({ popupVisible: !prevState.popupVisible }));

  toggleSearch = () => this.setState(prevState => ({ searchVisible: !prevState.searchVisible }));

  renderPopup = () =>
    (<AddPopup
      isVisible={this.state.popupVisible}
      onBackdropPress={this.togglePopup}
    />);

  renderSummary = () => {
    const { user } = this.props;

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
