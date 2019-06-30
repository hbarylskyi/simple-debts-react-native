import { RSAA } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;
export const FETCH_DEBT = 'FETCH_DEBT';
export const REQUESTS = {
  REQUEST: 'PUT',
  ACCEPT: 'POST',
  DECLINE: 'DELETE'
};

const fetchDebtTypes = [
  `${FETCH_DEBT}_REQUEST`,
  `${FETCH_DEBT}_SUCCESS`,
  `${FETCH_DEBT}_FAILURE`
];

const fetchDebtAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/${debtId}`,
    method: 'GET',
    types: fetchDebtTypes
  },

  authorize: true
});

export const fetchDebt = debtId => dispatch =>
  dispatch(fetchDebtAction(debtId));

// delete user from debt collection

export const DELETE_DEBT_REQUEST = 'DELETE_DEBT_REQUEST';
export const DELETE_DEBT_SUCCESS = 'DELETE_DEBT_SUCCESS';
export const DELETE_DEBT_FAILURE = 'DELETE_DEBT_FAILURE';

const deleteDebtTypes = [
  DELETE_DEBT_REQUEST,
  DELETE_DEBT_SUCCESS,
  DELETE_DEBT_FAILURE
];

const deleteDebtAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/${debtId}`,
    method: 'DELETE',
    types: deleteDebtTypes,
    headers: { 'Content-Type': 'application/json' }
  },

  authorize: true
});

export const deleteDebt = debtId => async dispatch => {
  const res = await dispatch(deleteDebtAction(debtId));
  if (res.error) throw new Error(res.payload.message);
  return res;
};

// accept debt creation request

export const ACCEPT_DEBT_REQUEST = 'ACCEPT_DEBT_REQUEST';
export const ACCEPT_DEBT_SUCCESS = 'ACCEPT_DEBT_SUCCESS';
export const ACCEPT_DEBT_FAILURE = 'ACCEPT_DEBT_FAILURE';

const acceptDebtTypes = [
  ACCEPT_DEBT_REQUEST,
  ACCEPT_DEBT_SUCCESS,
  ACCEPT_DEBT_FAILURE
];

const acceptDebtAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/multiple/${debtId}/creation/accept`,
    method: 'POST',
    types: acceptDebtTypes
  },

  authorize: true
});

export const acceptDebt = debtId => dispatch =>
  dispatch(acceptDebtAction(debtId));

// decline debt creation request

export const DECLINE_DEBT_REQUEST = 'DECLINE_DEBT_REQUEST';
export const DECLINE_DEBT_SUCCESS = 'DECLINE_DEBT_SUCCESS';
export const DECLINE_DEBT_FAILURE = 'DECLINE_DEBT_FAILURE';

const declineDebtTypes = [
  DECLINE_DEBT_REQUEST,
  DECLINE_DEBT_SUCCESS,
  DECLINE_DEBT_FAILURE
];

const declineDebtAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/multiple/${debtId}/creation/decline`,
    method: 'POST',
    types: declineDebtTypes
  },

  authorize: true
});

export const declineDebt = debtId => async dispatch => {
  const res = await dispatch(declineDebtAction(debtId, REQUESTS.DECLINE));

  if (res.error) {
    throw new Error(res.payload.name);
  }
};

export const CREATE_DEBTS = 'CREATE_DEBTS';

const createDebtsTypes = [
  `${CREATE_DEBTS}_REQUEST`,
  `${CREATE_DEBTS}_SUCCESS`,
  `${CREATE_DEBTS}_FAILURE`
];

const createDebtAction = (userIdOrName, isSingle, currency) => {
  const endpoint = isSingle ? '/debts/single' : '/debts/multiple';
  const body = isSingle ? { userName: userIdOrName } : { userId: userIdOrName };

  return {
    [RSAA]: {
      endpoint: `${baseUrl}${endpoint}`,
      method: 'POST',
      types: createDebtsTypes,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, currency })
    },

    authorize: true
  };
};

export const createDebt = (
  userIdOrName,
  isSingle,
  currency
) => async dispatch => {
  const { payload } = await dispatch(
    createDebtAction(userIdOrName, isSingle, currency)
  );
  return payload;
};

//

export const CONNECT_USER_INVITE_REQUEST = 'CONNECT_USER_INVITE_REQUEST';
export const CONNECT_USER_INVITE_SUCCESS = 'CONNECT_USER_INVITE_SUCCESS';
export const CONNECT_USER_INVITE_FAILURE = 'CONNECT_USER_INVITE_FAILURE';

const connectUserInviteTypes = [
  CONNECT_USER_INVITE_REQUEST,
  CONNECT_USER_INVITE_SUCCESS,
  CONNECT_USER_INVITE_FAILURE
];

const connectUserInviteAction = (debtId, userId) => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/single/${debtId}/connect_user`,
    method: 'POST',
    types: connectUserInviteTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  },

  authorize: true
});

export const connectUserInvite = (debtId, userId) => async dispatch => {
  await dispatch(connectUserInviteAction(debtId, userId));
  await dispatch(fetchDebt(debtId));
};

//

export const ACCEPT_CONNECTION_REQUEST = 'ACCEPT_CONNECTION_REQUEST';
export const ACCEPT_CONNECTION_SUCCESS = 'ACCEPT_CONNECTION_SUCCESS';
export const ACCEPT_CONNECTION_FAILURE = 'ACCEPT_CONNECTION_FAILURE';

const acceptUserConnectionTypes = [
  ACCEPT_CONNECTION_REQUEST,
  ACCEPT_CONNECTION_SUCCESS,
  ACCEPT_CONNECTION_FAILURE
];

const acceptUserConnectionAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/single/${debtId}/connect_user/accept`,
    method: 'POST',
    types: acceptUserConnectionTypes
  },

  authorize: true
});

export const acceptUserConnection = debtId => async dispatch => {
  await dispatch(acceptUserConnectionAction(debtId));
};

//

export const DECLINE_USER_CONNECTION_REQUEST =
  'DECLINE_USER_CONNECTION_REQUEST';
export const DECLINE_USER_CONNECTION_SUCCESS =
  'DECLINE_USER_CONNECTION_SUCCESS';
export const DECLINE_USER_CONNECTION_FAILURE =
  'DECLINE_USER_CONNECTION_FAILURE';

const declineUserConnectionTypes = [
  DECLINE_USER_CONNECTION_REQUEST,
  DECLINE_USER_CONNECTION_SUCCESS,
  DECLINE_USER_CONNECTION_FAILURE
];

const declineUserConnectionAction = debtId => ({
  [RSAA]: {
    endpoint: `${baseUrl}/debts/single/${debtId}/connect_user/decline`,
    method: 'POST',
    types: declineUserConnectionTypes
  },

  authorize: true
});

export const declineUserConnection = debtId => async dispatch => {
  await dispatch(declineUserConnectionAction(debtId));
};
