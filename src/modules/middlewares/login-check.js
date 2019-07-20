import { REHYDRATE } from 'redux-persist/src/constants';
import * as AuthActions from '../actions/AuthActions';
import NavigationService from '../../utils/NavigationService';

export default store => next => action => {
  // init loginCheck when auth state is persisted from local storage
  if (action.type === REHYDRATE) {
    next(action);

    if (action.payload && action.payload.auth && action.payload.auth.token) {
      NavigationService.resetTo('MainScreen');
      setTimeout(() => store.dispatch({ type: 'HIDE_SPLASH' }), 100);

      store.dispatch(AuthActions.loginCheck());
    } else {
      store.dispatch({ type: 'HIDE_SPLASH' });
    }

    return;
  }

  return next(action);
};
