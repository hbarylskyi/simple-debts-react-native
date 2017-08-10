import navigate from "../../screens/navigator";

export const GO_TO_LOGIN_SCREEN = "GO_TO_LOGIN_SCREEN";
export const GO_TO_MAIN_SCREEN = "GO_TO_MAIN_SCREEN";
export const GO_TO_DEBT_SCREEN = "GO_TO_DEBT_SCREEN";

const loginScreenAction = () => ({
  type: GO_TO_LOGIN_SCREEN
});

const mainScreenAction = () => ({
  type: GO_TO_MAIN_SCREEN
});

const debtScreenAction = name => ({
  type: GO_TO_DEBT_SCREEN,
  payload: { name }
});

export const goToLoginScreen = () => dispatch => dispatch(loginScreenAction());

export const goToMainScreen = () => dispatch => dispatch(mainScreenAction());

export const goToDebtScreen = name => dispatch =>
  dispatch(debtScreenAction(name));
