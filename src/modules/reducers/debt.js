import { REHYDRATE } from "redux-persist/constants";
import { FETCH_DEBT } from "../actions/DebtActions";
import { LOGOUT } from "../actions/AuthActions";
import {
  SELECT_DEBT,
  NEW_OPERATION,
  OPERATION_DECLINE,
  OPERATION_ACCEPT
} from "../actions/DebtActions";

const initialState = {
  currentDebtId: "",
  debt: {
    moneyOperations: [],
    user: {}
  }
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case `${FETCH_DEBT}_SUCCESS`:
      nextState = { ...state, debt: action.payload };
      break;

    case `${NEW_OPERATION}_SUCCESS`:
      nextState = { ...state, debt: action.payload };
      break;

    case `${OPERATION_ACCEPT}_SUCCESS`:
      nextState = { ...state, debt: action.payload };
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
