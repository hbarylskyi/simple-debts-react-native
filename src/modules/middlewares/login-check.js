import { REHYDRATE } from 'redux-persist/src/constants';
import * as AuthActions from '../actions/AuthActions';
import NavigationService from '../../utils/NavigationService';

// TODO rewrite?
export default store => next => action => {
  const logout = () => {
    store.dispatch(AuthActions.logout());
    NavigationService.resetTo('LoginScreen');
  };

  // init loginCheck when auth state is persisted from local storage
  if (action.type === REHYDRATE) {
    next(action);

    if (action.payload.auth && action.payload.auth.token) {
      NavigationService.resetTo('MainScreen');
      store.dispatch(AuthActions.loginCheck());
      return;
    }
    logout();

    store.dispatch({ type: 'HIDE_SPLASH' });
    return;
  }

  if (
    action.payload &&
    action.payload.response &&
    action.payload.response.error === 'Access Token Expired'
  ) {
    logout();
  }

  if (action.type === AuthActions.REFRESH_TOKEN_FAILURE) {
    console.log(action);
    console.log('refresh token error');
    logout();
  }

  if (action.type === `${AuthActions.LOGIN_CHECK}_REQUEST` && action.error) {
    NavigationService.resetTo('MainScreen');
    store.dispatch({ type: 'HIDE_SPLASH' });
  }

  return next(action);
};
