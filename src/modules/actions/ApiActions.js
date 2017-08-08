import { CALL_API } from "redux-api-middleware";

const baseUrl = "https://simple-debts.herokuapp.com";
const debtsEndpoint = "/debts";

export const CREATE_DEBTS = "CREATE_DEBTS";

const createDebtsTypes = [
  `${CREATE_DEBTS}_REQUEST`,
  `${CREATE_DEBTS}_SUCCESS`,
  `${CREATE_DEBTS}_FAILURE`
];

const createDebtsAction = userId => ({
  [CALL_API]: {
    endpoint: baseUrl + debtsEndpoint,
    method: "PUT",
    types: createDebtsTypes,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId })
  }
});

export const createDebts = userId => dispatch => {
  dispatch(createDebtsAction(userId));
};
