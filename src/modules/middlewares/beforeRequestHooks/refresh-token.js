import { isRSAA, RSAA } from 'redux-api-middleware';
import * as AuthActions from '../../actions/AuthActions';


export default store => next => async action => {
  const rsaa = action[RSAA];

  if (rsaa && rsaa.endpoint.includes('login_status')) {
    console.log(action);
    const promise = next(action);

    const response = await promise;

    if (response.error) {
      await store.dispatch(AuthActions.refreshToken());
      // return retriedResponse;
    }

    return promise;
  }
  return next(action);
};
