import SplashScreen from 'react-native-splash-screen';
import { LOGIN_CHECK } from '../actions/AuthActions';

export default store => next => action => {
  if (
    action.type === `${LOGIN_CHECK}_SUCCESS` ||
    action.type === `${LOGIN_CHECK}_FAILURE` ||
    action.type === 'HIDE_SPLASH'
  ) {
    SplashScreen.hide();
  }

  return next(action);
};
