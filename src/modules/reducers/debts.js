import { FETCH_DEBTS, CREATE_DEBTS_VIRT } from '../actions/DebtsActions';
import { LOGOUT } from '../actions/AuthActions';

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

    case `${CREATE_DEBTS_VIRT}_SUCCESS`:
      nextState = action.payload;
      break;

    case LOGOUT:
      nextState = initialState;
      break;

    default:
      break;
  }

  return nextState || state;
};
