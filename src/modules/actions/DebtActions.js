import { CALL_API } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;
export const FETCH_DEBT = 'FETCH_DEBT';
export const REQUESTS = {
  REQUEST: 'PUT',
  ACCEPT: 'POST',
  DECLINE: 'DELETE'
};

const fetchDebtTypes = [`${FETCH_DEBT}_REQUEST`, `${FETCH_DEBT}_SUCCESS`, `${FETCH_DEBT}_FAILURE`];

const fetchDebtAction = debtId => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/debts/${debtId}`,
    method: 'GET',
    types: fetchDebtTypes
  },

  authorize: true
});

export const fetchDebt = debtId => dispatch => dispatch(fetchDebtAction(debtId));

// delete user from debt collection

export const DELETE_DEBT_REQUEST = 'DELETE_DEBT_REQUEST';
export const DELETE_DEBT_SUCCESS = 'DELETE_DEBT_SUCCESS';
export const DELETE_DEBT_FAILURE = 'DELETE_DEBT_FAILURE';

const deleteDebtTypes = [DELETE_DEBT_REQUEST, DELETE_DEBT_SUCCESS, DELETE_DEBT_FAILURE];

const deleteDebtAction = (debtId, isSingle) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/${isSingle ? 'debts/single' : 'adebts'}/${debtId}`,
    method: 'DELETE',
    types: deleteDebtTypes
  },

  authorize: true
});

export const deleteDebt = (debtId, isSingle) => async dispatch => {
  const res = await dispatch(deleteDebtAction(debtId, isSingle));
  if (res.error) throw new Error('fuck');
  return res;
};

// debt acceptance

export const ACCEPT_DEBT_REQUEST = 'ACCEPT_DEBT_REQUEST';
export const ACCEPT_DEBT_SUCCESS = 'ACCEPT_DEBT_SUCCESS';
export const ACCEPT_DEBT_FAILURE = 'ACCEPT_DEBT_FAILURE';

const acceptDebtTypes = [ACCEPT_DEBT_REQUEST, ACCEPT_DEBT_SUCCESS, ACCEPT_DEBT_FAILURE];

const acceptDebtAction = (debtId, method) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/debts/${debtId}/creation`,
    method,
    types: acceptDebtTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ debtId })
  },

  authorize: true
});

export const acceptDebt = (debtId, requestType) => dispatch =>
  dispatch(acceptDebtAction(debtId, requestType));
