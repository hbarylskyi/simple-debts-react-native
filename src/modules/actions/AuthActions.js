import { CALL_API } from "redux-api-middleware";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import * as NavActions from "../../modules/actions/NavActions";

// TODO move redux-api-middleware calls to separate file?
const baseUrl = "https://simple-debts.herokuapp.com";

export const FB_LOGIN = "FB_LOGIN";
export const LOGIN_CHECK = "LOGIN_CHECK";
export const LOGOUT = "LOGOUT";

const loginTypes = [
  `${FB_LOGIN}_REQUEST`,
  `${FB_LOGIN}_SUCCESS`,
  `${FB_LOGIN}_FAILURE`
];
const loginCheckTypes = [
  `${LOGIN_CHECK}_REQUEST`,
  `${LOGIN_CHECK}_SUCCESS`,
  `${LOGIN_CHECK}_FAILURE`
];

const loginAction = fbToken => ({
  [CALL_API]: {
    endpoint: baseUrl + "/auth/facebook/login",
    method: "GET",
    types: loginTypes,
    headers: {
      Authorization: `Bearer ${fbToken}`
    },
    credentials: "same-origin"
  }
});

const loginCheckAction = () => ({
  [CALL_API]: {
    endpoint: baseUrl + "/login-status",
    method: "GET",
    types: loginCheckTypes
  }
});

const logoutAction = () => ({
  type: LOGOUT
});

export const fbLogin = () => dispatch => {
  LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
    () => {
      AccessToken.getCurrentAccessToken().then(data => {
        dispatch(loginAction(data.accessToken.toString())).then(response => {
          if (!response.error) {
            dispatch(NavActions.goToMainScreen());
          } else {
            alert("Login unsuccessful");
          }
        });
      });
    },
    error => alert("Login failed with error: " + error.errorMessage)
  );
};

export const loginCheck = () => dispatch => dispatch(loginCheckAction());

export const logout = () => dispatch => {
  LoginManager.logOut();
  dispatch(logoutAction());
};
