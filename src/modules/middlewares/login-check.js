import { REHYDRATE } from 'redux-persist/constants';
import * as AuthActions from '../actions/AuthActions';
import { goToLoginScreen, goToMainScreen } from '../actions/NavActions';

export default store => next => action => {
  const logout = () => {
    store.dispatch(AuthActions.logout());
    store.dispatch(goToLoginScreen());
  };

  // init loginCheck when auth state is persisted from local storage
  if (action.type === REHYDRATE) {
    next(action);

    if (action.payload.auth && action.payload.auth.token) {
      store.dispatch(goToMainScreen());
      store.dispatch(AuthActions.loginCheck());
      return;
    }
    logout();

    store.dispatch({ type: 'HIDE_SPLASH' });
    return;
  }

  if (action.type === AuthActions.REFRESH_TOKEN_FAILURE) {
    console.log(action);
    console.log('refresh token error');
    logout();
  }

  if (action.type === `${AuthActions.LOGIN_CHECK}_REQUEST` && action.error) {
    store.dispatch(goToMainScreen());
    store.dispatch({ type: 'HIDE_SPLASH' });
  }

  return next(action);
};
