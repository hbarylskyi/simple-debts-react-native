import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './auth/login.presenter';
import MainScreen from './main/main.presenter';
import DebtScreen from './debt/debt.presenter';

const AppStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  MainScreen: { screen: MainScreen },
  DebtScreen: { screen: DebtScreen }
});

const Navigation = createAppContainer(AppStack);
export default Navigation;
