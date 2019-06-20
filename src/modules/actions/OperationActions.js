import { RSAA } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;
export const NEW_OPERATION = 'NEW_OPERATION';
export const OPERATION_ACCEPT = 'OPERATION_ACCEPT';

const operationAcceptTypes = [
  `${OPERATION_ACCEPT}_REQUEST`,
  `${OPERATION_ACCEPT}_SUCCESS`,
  `${OPERATION_ACCEPT}_FAILURE`
];

const operationAcceptAction = (operationId, accepted) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/operation/${operationId}/creation`,
    method: accepted ? 'POST' : 'DELETE',
    types: operationAcceptTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      operationId
    })
  },

  authorize: true
});

export const processOperation = (operationId, accepted) => dispatch =>
  dispatch(operationAcceptAction(operationId, accepted));

const newOperationTypes = [
  `${NEW_OPERATION}_REQUEST`,
  `${NEW_OPERATION}_SUCCESS`,
  `${NEW_OPERATION}_FAILURE`
];

const newOperationAction = (debtsId, moneyAmount, moneyReceiver, description) => ({
  [RSAA]: {
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
  },

  authorize: true
});

export const newOperation = (debtsId, moneyAmount, moneyReceiver, description) => dispatch =>
  dispatch(newOperationAction(debtsId, moneyAmount, moneyReceiver, description.trim()));

export const DELETE_OPERATION = 'DELETE_OPERATION';

const deleteOperationTypes = [
  `${DELETE_OPERATION}_REQUEST`,
  `${DELETE_OPERATION}_SUCCESS`,
  `${DELETE_OPERATION}_FAILURE`
];

const deleteOperationAction = operationId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/operation/${operationId}`,
    method: 'DELETE',
    types: deleteOperationTypes,
    headers: { 'Content-Type': 'application/json' }
  },

  authorize: true
});

export const deleteOperation = (debtsId, moneyAmount, moneyReceiver, description) => dispatch =>
  dispatch(deleteOperationAction(debtsId, moneyAmount, moneyReceiver, description.trim()));
