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
    store.dispatch({ type: 'HIDE_SPLASH' });

    if (action.payload.auth && action.payload.auth.token) {
      next(action);
      store.dispatch(loginCheck());
      return;
    }

    logout();
  }

  if (action.type === `${LOGIN_CHECK}_SUCCESS`) {
    store.dispatch(goToMainScreen());
  } else if (action.type === `${LOGIN_CHECK}_FAILURE`) {
    logout();
  }

  return next(action);
};
