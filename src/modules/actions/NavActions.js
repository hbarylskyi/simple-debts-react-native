import { NavigationActions } from 'react-navigation';

// resets navigation history

const loginScreenAction = () =>
  NavigationActions.reset({
    index: 0,
    actions: [{ type: NavigationActions.NAVIGATE, routeName: 'LoginScreen' }],
    key: null
  });

export const goToLoginScreen = () => dispatch => dispatch(loginScreenAction());

// resets navigation history

const mainScreenAction = () =>
  NavigationActions.reset({
    index: 0,
    actions: [{ type: NavigationActions.NAVIGATE, routeName: 'MainScreen' }],
    key: null
  });

export const goToMainScreen = () => dispatch => dispatch(mainScreenAction());

//

const debtScreenAction = () => ({
  type: NavigationActions.NAVIGATE,
  routeName: 'DebtScreen'
});

export const goToDebtScreen = () => dispatch => dispatch(debtScreenAction());
