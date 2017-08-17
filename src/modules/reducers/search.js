import { USER_SEARCH_SUCCESS } from '../actions/SearchActions';

const initialState = [];

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case USER_SEARCH_SUCCESS:
      nextState = action.payload;
      break;

    default:
      break;
  }

  return nextState || state;
};
