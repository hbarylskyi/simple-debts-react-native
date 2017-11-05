import isoCurrency from 'iso-country-currency';
import { CREATE_DEBTS_VIRT } from '../actions/DebtsActions';
import { LOGOUT } from '../actions/AuthActions';
import { FETCH_DEBT } from '../actions/DebtActions';
import { NEW_OPERATION, OPERATION_ACCEPT } from '../actions/OperationActions';

const initialState = {
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
