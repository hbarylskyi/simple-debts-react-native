import { RSAA } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;
const debtsEndpoint = '/debts';

export const FETCH_DEBTS = 'FETCH_DEBTS';

const fetchDebtsTypes = [
  `${FETCH_DEBTS}_REQUEST`,
  `${FETCH_DEBTS}_SUCCESS`,
  `${FETCH_DEBTS}_FAILURE`
];

const fetchDebtsAction = () => ({
  [RSAA]: {
    endpoint: baseUrl + debtsEndpoint,
    method: 'GET',
    types: fetchDebtsTypes
  },

  authorize: true
});

export const fetchDebts = () => dispatch => dispatch(fetchDebtsAction());

//

export const ACCEPT_ALL_REQUEST = 'ACCEPT_ALL_REQUEST';
export const ACCEPT_ALL_SUCCESS = 'ACCEPT_ALL_SUCCESS';
export const ACCEPT_ALL_FAILURE = 'ACCEPT_ALL_FAILURE';

const acceptAllTypes = [
  ACCEPT_ALL_REQUEST,
  ACCEPT_ALL_SUCCESS,
  ACCEPT_ALL_FAILURE
];

const acceptAllAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/multiple/${debtId}/accept_all_operations`,
    method: 'POST',
    types: acceptAllTypes
  },

  authorize: true
});

export const acceptAll = debtId => dispatch =>
  dispatch(acceptAllAction(debtId));
