import { CREATE_DEBTS_VIRT } from '../actions/DebtsActions';
import { LOGOUT } from '../actions/AuthActions';
import { SELECT_DEBT, FETCH_DEBT } from '../actions/DebtActions';
import { NEW_OPERATION, OPERATION_ACCEPT } from '../actions/OperationActions';

const initialState = {
  currentDebtId: '',
  debt: {
    moneyOperations: [],
    user: {}
  }
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case `${FETCH_DEBT}_SUCCESS`:
    case `${OPERATION_ACCEPT}_SUCCESS`:
    case `${CREATE_DEBTS_VIRT}_SUCCESS`:
    case `${NEW_OPERATION}_SUCCESS`:
      nextState = { ...state, debt: action.payload };
      break;

    case SELECT_DEBT:
      nextState = { ...state, currentDebtId: action.payload.debtId };
      break;

    case LOGOUT:
      nextState = initialState;
      break;

    default:
      break;
  }

  return nextState || state;
};
