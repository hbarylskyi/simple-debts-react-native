import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
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
    summary: PropTypes.object.isRequired,
    fetchDebts: PropTypes.func.isRequired,
    goToDebt: PropTypes.func.isRequired,
    selectDebt: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    debts: PropTypes.array.isRequired
  };

  state = {
    scrollEnabled: true
  };

  componentDidMount = () => {
    this.props.fetchDebts();
    this.props.navigation.setParams({ toggleAddPopup: this.toggleAddPopup });
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
    const { summary, user } = this.props;
    const { toGive, toTake } = summary;
    const calculatedSummary = toTake - toGive;
    const color = calculatedSummary < 0 ? colors.red : colors.green;

    // <Button title="Logout" onPress={this.props.logout} />
    return (
      <View style={[styles.summaryContainer, { backgroundColor: color }]}>
        <View style={styles.summaryTop}>
          <Text style={styles.summaryText}>
            {user.name}
          </Text>
          <Text style={styles.summaryTextBig}>
            {calculatedSummary.toString().replace('-', '-$')}
          </Text>
        </View>

        <View style={styles.valuesContainer}>
          <Text style={[styles.summaryTextBottom, styles.toGive]}>
            {`$${toTake}`}
          </Text>
          <Text style={[styles.summaryTextBottom, styles.toTake]}>
            {`$${toGive}`}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { debts, user } = this.props;
    const { scrollEnabled } = this.state;

    return (
      <View style={styles.container}>
        {this.renderPopup()}
        {this.renderSearchModal()}
        {this.renderSummary()}
        <View style={styles.listContainer}>
          <FlatList
            data={debts}
            renderItem={({ item }) =>
              (<Debt
                debt={item}
                userId={user.id}
                onSwipe={swipeFinished => this.setState({ scrollEnabled: swipeFinished })}
              />)}
            scrollEnabled={scrollEnabled}
          />
        </View>
      </View>
    );
  }
}
