import { CALL_API } from "redux-api-middleware";

const baseUrl = "https://simple-debts.herokuapp.com";
const debtsEndpoint = "/debts";

export const FETCH_DEBTS = "FETCH_DEBTS";
export const CREATE_DEBTS = "CREATE_DEBTS";

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

const fetchDebtsAction = () => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: "GET",
    types: fetchDebtsTypes
  }
});

const createDebtsAction = userId => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: "PUT",
    types: createDebtsTypes,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  }
});

export const fetchDebts = () => dispatch => {
  dispatch(fetchDebtsAction());
};

export const createDebts = userId => dispatch => {
  dispatch(createDebtsAction(userId));
};
