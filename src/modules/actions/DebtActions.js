import { CALL_API } from "redux-api-middleware";

// TODO global var
const baseUrl = "https://simple-debts.herokuapp.com";
const debtEndpoint = "/debts/";

export const FETCH_DEBT = "FETCH_DEBT";
export const SELECT_DEBT = "SELECT_DEBT";

const fetchDebtTypes = [
  `${FETCH_DEBT}_REQUEST`,
  `${FETCH_DEBT}_SUCCESS`,
  `${FETCH_DEBT}_FAILURE`
];

const fetchDebtAction = debtId => ({
  [CALL_API]: {
    endpoint: baseUrl + debtEndpoint + debtId,
    method: "GET",
    types: fetchDebtTypes
  }
});

export const fetchDebt = debtId => dispatch => {
  console.log("123123124");
  dispatch(fetchDebtAction(debtId));
};

export const selectDebt = debtId => dispatch => {
  dispatch({ type: SELECT_DEBT, payload: { debtId } });
};
