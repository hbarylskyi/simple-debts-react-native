import { CALL_API } from 'redux-api-middleware';

export const NEW_OPERATION = 'NEW_OPERATION';
export const OPERATION_ACCEPT = 'OPERATION_ACCEPTANCE';
const baseUrl = 'https://simple-debts.herokuapp.com';

const operationAcceptTypes = [
  `${OPERATION_ACCEPT}_REQUEST`,
  `${OPERATION_ACCEPT}_SUCCESS`,
  `${OPERATION_ACCEPT}_FAILURE`
];

const operationAcceptAction = (operationId, accepted) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/operation/${operationId}/creation`,
    method: accepted ? 'POST' : 'DELETE',
    types: operationAcceptTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationId
    })
  }
});

export const processOperation = (operationId, accepted) => dispatch =>
  dispatch(operationAcceptAction(operationId, accepted));

const newOperationTypes = [
  `${NEW_OPERATION}_REQUEST`,
  `${NEW_OPERATION}_SUCCESS`,
  `${NEW_OPERATION}_FAILURE`
];

const newOperationAction = (debtsId, moneyAmount, moneyReceiver, description) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/operation`,
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

export const newOperation = (debtsId, moneyAmount, moneyReceiver, description) => dispatch =>
  dispatch(newOperationAction(debtsId, moneyAmount, moneyReceiver, description.trim()));

const deleteOperationTypes = [
  `${NEW_OPERATION}_REQUEST`,
  `${NEW_OPERATION}_SUCCESS`,
  `${NEW_OPERATION}_FAILURE`
];

const deleteOperationAction = operationId => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/operation/${operationId}`,
    method: 'DELETE',
    types: deleteOperationTypes,
    headers: { 'Content-Type': 'application/json' }
  }
});

export const deleteOperation = (debtsId, moneyAmount, moneyReceiver, description) => dispatch =>
  dispatch(deleteOperationAction(debtsId, moneyAmount, moneyReceiver, description.trim()));
