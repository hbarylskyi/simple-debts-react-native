import { FB_LOGIN } from "../actions/AuthActions";
import { LOGOUT } from "../actions/AuthActions";
import { LOGIN_CHECK } from "../actions/AuthActions";
import { REHYDRATE } from "redux-persist/constants";

const initialState = {};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case `${FB_LOGIN}_SUCCESS`:
      nextState = action.payload;
      break;

    case "LOGOUT":
      nextState = initialState;
      break;

    // case REHYDRATE:
    //   let cached = action.payload.auth;
    //   if (cached && cached.id) nextState = { ...state, ...cached };
    //   break;
  }

  return nextState || state;
};
