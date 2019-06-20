/*
adds authorization header to the request if it has authorize flag
*/

import { RSAA } from 'redux-api-middleware';

export default store => next => action => {
  if (action.authorize) {
    const { headers = {} } = action[RSAA];
    headers.authorization = `Bearer ${store.getState().auth.token}`;

    action[RSAA].headers = headers;
    delete action.authorize;
  }

  return next(action);
};
