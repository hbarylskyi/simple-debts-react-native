import { CALL_API } from 'redux-api-middleware';

// TODO global var
const baseUrl = 'https://simple-debts.herokuapp.com';
const debtsEndpoint = '/debts/';
const operationEndpoint = '/operation';
const operationAcceptEndpoint = '/operation/creation';

export const FETCH_DEBT = 'FETCH_DEBT';
export const SELECT_DEBT = 'SELECT_DEBT';
export const NEW_OPERATION = 'NEW_OPERATION';
export const OPERATION_ACCEPT = 'OPERATION_ACCEPTANCE';

const fetchDebtTypes = [`${FETCH_DEBT}_REQUEST`, `${FETCH_DEBT}_SUCCESS`, `${FETCH_DEBT}_FAILURE`];

const newOperationTypes = [
  `${NEW_OPERATION}_REQUEST`,
  `${NEW_OPERATION}_SUCCESS`,
  `${NEW_OPERATION}_FAILURE`
];

const operationAcceptTypes = [
  `${OPERATION_ACCEPT}_REQUEST`,
  `${OPERATION_ACCEPT}_SUCCESS`,
  `${OPERATION_ACCEPT}_FAILURE`
];

const selectDebtAction = debtId => ({
  type: SELECT_DEBT,
  payload: { debtId }
});

const fetchDebtAction = debtId => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint + debtId,
    method: 'GET',
    types: fetchDebtTypes
  }
});

const newOperationAction = (debtsId, moneyAmount, moneyReceiver, description) => ({
  [CALL_API]: {
    endpoint: baseUrl + operationEndpoint,
    method: 'PUT',
    types: newOperationTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      debtsId,
      moneyAmount,
      moneyReceiver,
      description
    })
  }
});

const operationAcceptAction = (operationId, accepted) => ({
  [CALL_API]: {
    endpoint: baseUrl + operationAcceptEndpoint,
    method: accepted ? 'POST' : 'DELETE',
    types: operationAcceptTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationId
    })
  }
});

export const fetchDebt = debtId => dispatch => {
  dispatch(fetchDebtAction(debtId));
};

export const selectDebt = debtId => dispatch => {
  dispatch(selectDebtAction(debtId));
};

export const newOperation = (debtsId, moneyAmount, moneyReceiver, description) => dispatch =>
  dispatch(newOperationAction(debtsId, moneyAmount, moneyReceiver, description.trim()));

export const processOperation = (operationId, accepted) => dispatch =>
  dispatch(operationAcceptAction(operationId, accepted));
