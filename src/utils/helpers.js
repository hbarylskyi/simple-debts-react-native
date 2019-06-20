import { StackActions, NavigationActions } from 'react-navigation';

export const createResetAction = routeName =>
  StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })]
  });
