import isoCurrency from 'iso-country-currency';
import { LOGOUT } from '../actions/AuthActions';
import { NEW_OPERATION, OPERATION_ACCEPT } from '../actions/OperationActions';
import * as DebtActions from '../actions/DebtActions';

const initialState = {
  debt: {
    moneyOperations: [],
    user: {}
  }
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case DebtActions.ACCEPT_DEBT_SUCCESS:
    case `${DebtActions.FETCH_DEBT}_SUCCESS`:
    case `${DebtActions.CREATE_DEBTS}_SUCCESS`:
    case `${OPERATION_ACCEPT}_SUCCESS`:
    case `${NEW_OPERATION}_SUCCESS`: {
      const debt = action.payload;

      try {
        debt.currency = isoCurrency.getAllInfoByISO(debt.countryCode).symbol;
      } catch (e) {
        console.warn(e.message);
      }

      nextState = { ...state, debt };
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
