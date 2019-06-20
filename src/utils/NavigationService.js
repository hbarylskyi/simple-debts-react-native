import { NavigationActions, StackActions } from 'react-navigation';
import { createResetAction } from './helpers';

let _navigator;

const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
};

const push = (routeName, params) => {
  _navigator.dispatch(StackActions.push({ routeName, params }));
};

const resetTo = routeName => {
  _navigator.dispatch(createResetAction(routeName));
};

export default {
  navigate,
  push,
  resetTo,
  setTopLevelNavigator
};
