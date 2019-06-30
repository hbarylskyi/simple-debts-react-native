import { StackActions, NavigationActions } from 'react-navigation';
import getSymbolFromCurrency from 'currency-symbol-map';

export const createResetAction = routeName =>
  StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName })]
  });

export const currencyToSymbol = currency => {
  if (!currency) return '';

  return getSymbolFromCurrency(currency) || `${currency} `;
};
