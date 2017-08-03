import { combineReducers } from "redux";
import { NavigationActions } from "react-navigation";
import nav from "./nav";

const AppReducer = combineReducers({
  nav
});

export default AppReducer;
