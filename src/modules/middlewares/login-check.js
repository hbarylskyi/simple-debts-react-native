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
    if (action.payload.auth && action.payload.auth.id) {
      store.dispatch(loginCheck());
    } else {
      store.dispatch({ type: 'HIDE_SPLASH' });
      logout();
    }
  }

  // logout if loginCheck returned 'authentication: false'
  if (action.type === `${LOGIN_CHECK}_SUCCESS`) {
    if (!action.payload.authenticated) {
      logout();
    } else {
      store.dispatch(goToMainScreen());
    }
  }

  return next(action);
};
