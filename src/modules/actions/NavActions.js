export const GO_TO_LOGIN_SCREEN = 'GO_TO_LOGIN_SCREEN';
export const GO_TO_MAIN_SCREEN = 'GO_TO_MAIN_SCREEN';
export const GO_TO_DEBT_SCREEN = 'GO_TO_DEBT_SCREEN';

const loginScreenAction = () => ({
  type: GO_TO_LOGIN_SCREEN
});

const mainScreenAction = () => ({
  type: GO_TO_MAIN_SCREEN
});

const debtScreenAction = () => ({
  type: GO_TO_DEBT_SCREEN
});

export const goToLoginScreen = () => dispatch => dispatch(loginScreenAction());

export const goToMainScreen = () => dispatch => dispatch(mainScreenAction());

export const goToDebtScreen = () => dispatch => dispatch(debtScreenAction());
