import { CALL_API } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;
const debtsEndpoint = '/debts';

export const FETCH_DEBTS = 'FETCH_DEBTS'

const fetchDebtsTypes = [
  `${FETCH_DEBTS}_REQUEST`,
  `${FETCH_DEBTS}_SUCCESS`,
  `${FETCH_DEBTS}_FAILURE`
];

const fetchDebtsAction = () => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: 'GET',
    types: fetchDebtsTypes
  },

  authorize: true
});

export const fetchDebts = () => dispatch => dispatch(fetchDebtsAction());