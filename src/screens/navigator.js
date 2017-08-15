import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from './login/login.presenter';
import MainScreen from './main/main.presenter';
import DebtScreen from './debt/debt.presenter';

export const AppNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  DebtScreen: { screen: DebtScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) =>
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
