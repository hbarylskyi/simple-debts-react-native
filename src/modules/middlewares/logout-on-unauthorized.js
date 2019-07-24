import * as AuthActions from '../actions/AuthActions';

// if server responds with 'Unauthorized' error - log the user out
export default store => next => action => {
  if (action.error) {
    const { response = {} } = action.payload;

    if (
      response.error === 'Unauthorized' ||
      response.error === 'Invalid Token' ||
      response.error === 'Access Token Expired'
    ) {
      store.dispatch(AuthActions.logout());
    }
  }

  return next(action);
};
