import { REHYDRATE } from 'redux-persist/constants';
import SplashScreen from 'react-native-splash-screen';
import { LOGIN_CHECK, loginCheck, logout } from '../actions/AuthActions';
import { goToLoginScreen, goToMainScreen } from '../actions/NavActions';

export default store => next => (action) => {
  // init loginCheck when auth state is persisted from local storage
  if (action.type === REHYDRATE) {
    if (action.payload.auth) {
      store.dispatch(loginCheck());
    } else {
      SplashScreen.hide();
    }
  }

  // logout if loginCheck returned 'authentication: false'
  if (action.type === `${LOGIN_CHECK}_SUCCESS` || action.type === `${LOGIN_CHECK}_FAILURE`) {
    SplashScreen.hide();

    if (!action.payload.authenticated) {
      store.dispatch(logout());
      store.dispatch(goToLoginScreen());
    } else {
      store.dispatch(goToMainScreen());
    }
  }

  return next(action);
};
