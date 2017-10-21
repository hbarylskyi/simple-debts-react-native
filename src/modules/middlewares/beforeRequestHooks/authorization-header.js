/*
adds authorization header to the request if it has authorize flag
*/

import { CALL_API } from 'redux-api-middleware';

export default store => next => action => {
  if (action.authorize) {
    const { headers = {} } = action[CALL_API];
    headers.authorization = `Bearer ${store.getState().auth.token}`;

    action[CALL_API].headers = headers;
    delete action.authorize;
  }

  return next(action);
};
