import { AppNavigator } from "../screens/navigator";

// Start with Intro
const firstAction = AppNavigator.router.getActionForPathAndParams("Slides");
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export default (nav = (state = initialNavState, action) => {
  let nextState;

  switch (action.type):
    case "Chat":
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: "Chat" }),
        state
      );
      break;

    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
});
