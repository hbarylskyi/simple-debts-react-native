import { REHYDRATE } from "redux-persist/constants";

//
export default store => next => action => {
  if (action.type === REHYDRATE) {
    if (!action.payload.auth) return;
  }

  return next(action);
};
