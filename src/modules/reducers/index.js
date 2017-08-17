import { combineReducers } from 'redux';

import nav from './nav';
import auth from './auth';
import debts from './debts';
import debt from './debt';
import search from './search';

export default combineReducers({
  nav,
  auth,
  debts,
  debt,
  search
});
