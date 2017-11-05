import { AppNavigator } from '../../screens/navigator';

// Start with Login
const firstAction = AppNavigator.router.getActionForPathAndParams('LoginScreen');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

const getCurrentRouteName = state => {
  const route = state.routes[state.index];
  return typeof route.index === 'undefined' ? route.routeName : getCurrentRouteName(route);
};

export default (state = initialNavState, action) => {
  // let nextState;

  const nextState = AppNavigator.router.getStateForAction(action, state);

  // prevents navigating twice to the same route
  if (state && nextState) {
    const stateRouteName = getCurrentRouteName(state);
    const nextStateRouteName = getCurrentRouteName(nextState);
    return stateRouteName === nextStateRouteName ? state : nextState;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
