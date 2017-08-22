import { CALL_API } from 'redux-api-middleware';

const baseUrl = 'https://simple-debts.herokuapp.com';
const debtsEndpoint = '/debts';
const debtsVirtEndpoint = '/debts/single';

export const FETCH_DEBTS = 'FETCH_DEBTS';
export const CREATE_DEBTS = 'CREATE_DEBTS';
export const CREATE_DEBTS_VIRT = 'CREATE_DEBTS_VIRT';

const fetchDebtsTypes = [
  `${FETCH_DEBTS}_REQUEST`,
  `${FETCH_DEBTS}_SUCCESS`,
  `${FETCH_DEBTS}_FAILURE`
];

const createDebtsTypes = [
  `${CREATE_DEBTS}_REQUEST`,
  `${CREATE_DEBTS}_SUCCESS`,
  `${CREATE_DEBTS}_FAILURE`
];

const createDebtsVirtTypes = [
  `${CREATE_DEBTS_VIRT}_REQUEST`,
  `${CREATE_DEBTS_VIRT}_SUCCESS`,
  `${CREATE_DEBTS_VIRT}_FAILURE`
];

const fetchDebtsAction = () => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: 'GET',
    types: fetchDebtsTypes
  }
});

const createDebtsAction = userId => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: 'PUT',
    types: createDebtsTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, countryCode: 'uk' })
  }
});

const createDebtsVirtAction = userName => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsVirtEndpoint,
    method: 'PUT',
    types: createDebtsVirtTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, countryCode: 'uk' })
  }
});

export const fetchDebts = () => dispatch => dispatch(fetchDebtsAction());

export const createDebts = userId => dispatch => dispatch(createDebtsAction(userId));

export const createVirtEntity = name => dispatch => dispatch(createDebtsVirtAction(name));
