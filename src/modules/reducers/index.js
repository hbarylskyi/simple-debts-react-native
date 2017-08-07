import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";

import nav from "./nav";
import auth from "./auth";
import debts from "./debts";
import debt from "./debt";

export default (AppReducer = combineReducers({
  nav,
  auth,
  debts,
  debt
}));
