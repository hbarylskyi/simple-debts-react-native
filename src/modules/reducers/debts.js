import { FETCH_DEBTS } from '../actions/DebtsActions';
import * as DebtActions from '../actions/DebtActions';
import { LOGOUT } from '../actions/AuthActions';
import { NEW_OPERATION } from '../actions/OperationActions';

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
    case DebtActions.DECLINE_DEBT_SUCCESS:
    case `${FETCH_DEBTS}_SUCCESS`:
      nextState = action.payload;
      break;

    case `${NEW_OPERATION}_SUCCESS`: {
      const newDebt = action.payload;
      const newDebts = [...state.debts].map(debt => (debt.id === newDebt.id ? newDebt : debt));
      nextState = { ...state, debts: newDebts };
      break;
    }

    case `${DebtActions.CREATE_DEBTS}_SUCCESS`: {
      nextState = { ...state, debts: [action.payload, ...state.debts] };
      break;
    }

    case LOGOUT:
      nextState = initialState;
      break;

    default:
      break;
  }

  return nextState || state;
};
