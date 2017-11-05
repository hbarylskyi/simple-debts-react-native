import { REHYDRATE } from 'redux-persist/constants';
import { LOGIN_CHECK, loginCheck, logout as logoutAction } from '../actions/AuthActions';
import { goToLoginScreen, goToMainScreen } from '../actions/NavActions';

export default store => next => action => {
  const logout = () => {
    store.dispatch(logoutAction());
    store.dispatch(goToLoginScreen());
  };

  // init loginCheck when auth state is persisted from local storage
  if (action.type === REHYDRATE) {
    next(action);

    if (action.payload.auth && action.payload.auth.token) {
      store.dispatch(goToMainScreen());
      store.dispatch(loginCheck());
      return;
    }
    logout();

    store.dispatch({ type: 'HIDE_SPLASH' });
    return;
  }

  if (action.type === `${LOGIN_CHECK}_FAILURE`) {
    logout();
  }

  return next(action);
};
