import { CALL_API } from 'redux-api-middleware';

// TODO global var
const baseUrl = 'https://simple-debts.herokuapp.com';
export const FETCH_DEBT = 'FETCH_DEBT';
export const SELECT_DEBT = 'SELECT_DEBT';
export const REQUESTS = {
  REQUEST: 'PUT',
  ACCEPT: 'POST',
  DECLINE: 'DELETE'
};

const selectDebtAction = debtId => ({
  type: SELECT_DEBT,
  payload: { debtId }
});

export const selectDebt = debtId => dispatch => {
  dispatch(selectDebtAction(debtId));
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

export const fetchDebt = debtId => dispatch => {
  dispatch(fetchDebtAction(debtId));
};

// debt acceptance

export const acceptDebtTypes = [
  'ACCEPT_DEBT_REQUEST',
  'ACCEPT_DEBT_SUCCESS',
  'ACCEPT_DEBT_FAILURE'
];

const acceptDebtAction = (debtId, method) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/debts/${debtId}/creation`,
    method,
    types: acceptDebtTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      debtId
    })
  },

  authorize: true
});

export const acceptDebt = (debtId, requestType) => dispatch =>
  dispatch(acceptDebtAction(debtId, requestType));

// debt deletion

export const deleteDebtTypes = [
  'DELETE_DEBT_REQUEST',
  'DELETE_DEBT_SUCCESS',
  'DELETE_DEBT_FAILURE'
];

const deleteDebtAction = (debtId, method) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/debts/${debtId}/delete_request`,
    method,
    types: acceptDebtTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      debtId
    })
  },

  authorize: true
});

export const deleteDebt = (debtId, requestType) => dispatch =>
  dispatch(deleteDebtAction(debtId, requestType));
