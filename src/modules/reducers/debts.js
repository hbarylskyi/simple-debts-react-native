import { FETCH_DEBTS } from "../actions/ApiActions";
import { LOGOUT } from "../actions/AuthActions";
import { REHYDRATE } from "redux-persist/constants";

const initialState = {
  debts: [],
  summary: {
    toGive: 0,
    toTake: 0
  }
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case `${FETCH_DEBTS}_SUCCESS`:
      nextState = action.payload;
      break;

    case LOGOUT:
      nextState = initialState;
      break;

    case REHYDRATE:
      let cached = action.payload.debts;
      if (cached.summary) nextState = cached;
      break;
  }

  return nextState || state;
};
