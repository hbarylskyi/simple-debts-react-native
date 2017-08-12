import { REHYDRATE } from 'redux-persist/constants';

// TODO remove
export default store => next => action =>
  // if (action.type === REHYDRATE) {
  //   if (!action.payload.auth) return;
  // }

  next(action);
