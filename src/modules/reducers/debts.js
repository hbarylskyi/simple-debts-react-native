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
      const newDebts = [...state.debts].map(debt =>
        debt.id === newDebt.id ? newDebt : debt
      );
      nextState = { ...state, debts: newDebts };
      break;
    }

    case `${DebtActions.CREATE_DEBTS}_SUCCESS`: {
      const debt = action.payload;

      nextState = { ...state, debts: [debt, ...state.debts] };
      break;
    }

    case DebtActions.DELETE_MULTI_DEBT_SUCCESS:
    case DebtActions.ACCEPT_DEBT_SUCCESS: {
      const debt = action.payload;

      const index = state.debts.findIndex(
        stateDebt => stateDebt.id === debt.id
      );


      const newDebts = [...state.debts];
      newDebts[index] = debt;

      console.log(index, debt)
      nextState = { ...state, debts: newDebts };
      console.log(newDebts, nextState, state.debts, state);
      break;
    }

    case DebtActions.DELETE_SINGLE_DEBT_SUCCESS: {
      const debtId = action.meta;

      // remove debt with debtId from state
      const newDebts = state.debts.filter(stateDebt => stateDebt.id !== debtId);

      nextState = { ...state, debts: newDebts };
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
