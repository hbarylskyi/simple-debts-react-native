import { REHYDRATE } from "redux-persist/constants";
import { FETCH_DEBT } from "../actions/DebtActions";
import { LOGOUT } from "../actions/AuthActions";
import { SELECT_DEBT } from "../actions/DebtActions";

const initialState = { user: {} };

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case `${FETCH_DEBT}_SUCCESS`:
      nextState = action.payload;
      break;

    case SELECT_DEBT:
      nextState = { ...state, currentDebtId: action.payload.debtId };
      break;

    case LOGOUT:
      nextState = initialState;
      break;
  }

  return nextState || state;
};
