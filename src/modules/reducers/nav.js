import { NavigationActions } from "react-navigation";
import { AppNavigator } from "../../screens/navigator";
import * as NavActions from "../actions/NavActions";
import { REHYDRATE } from "redux-persist/constants";

// Start with Login
const firstAction = AppNavigator.router.getActionForPathAndParams(
  "LoginScreen"
);
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (state = initialNavState, action) => {
  let nextState;

  switch (action.type) {
    case NavActions.GO_TO_MAIN_SCREEN:
      // clear history stack if we came from LoginScreen
      if (state.routes[0].routeName === "LoginScreen") {
        console.debug("clearing history stack");

        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [
              { type: NavigationActions.NAVIGATE, routeName: "MainScreen" }
            ],
            key: null
          }),
          state
        );
      } else {
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: "MainScreen" }),
          state
        );
      }

      break;

    case NavActions.GO_TO_LOGIN_SCREEN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "LoginScreen" }),
        state
      );

      break;

    case NavActions.GO_TO_DEBT_SCREEN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "DebtScreen" }),
        state
      );

      break;
  }

  return nextState || state;
};
