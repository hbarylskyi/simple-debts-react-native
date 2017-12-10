import { CALL_API } from 'redux-api-middleware';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import config from 'react-native-config';
import * as NavActions from '../../modules/actions/NavActions';

const baseUrl = config.host;

export const FB_LOGIN = 'FB_LOGIN';
export const LOGIN_CHECK = 'LOGIN_CHECK';
export const LOGOUT = 'LOGOUT';

const loginCheckTypes = [
  `${LOGIN_CHECK}_REQUEST`,
  `${LOGIN_CHECK}_SUCCESS`,
  `${LOGIN_CHECK}_FAILURE`
];

const loginCheckAction = () => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/login_status`,
    method: 'GET',
    types: loginCheckTypes
  },

  authorize: true
});

export const loginCheck = () => dispatch => dispatch(loginCheckAction());

//

const fbLoginTypes = [`${FB_LOGIN}_REQUEST`, `${FB_LOGIN}_SUCCESS`, `${FB_LOGIN}_FAILURE`];

const fbLoginAction = fbToken => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/login/facebook`,
    method: 'GET',
    types: fbLoginTypes,
    headers: {
      Authorization: `Bearer ${fbToken}`
    },
    credentials: 'same-origin'
  }
});

export const fbLogin = () => dispatch => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
    () => {
      AccessToken.getCurrentAccessToken().then(data => {
        dispatch(fbLoginAction(data.accessToken.toString())).then(response => {
          if (!response.error) {
            dispatch(NavActions.goToMainScreen());
          } else {
            alert('Login unsuccessful');
          }
        });
      });
    },
    error => alert(`Login failed with error: ${error.errorMessage}`)
  );
};

//

export const STANDARD_LOGIN_REQUEST = 'STANDARD_LOGIN_REQUEST';
export const STANDARD_LOGIN_SUCCESS = 'STANDARD_LOGIN_SUCCESS';
export const STANDARD_LOGIN_FAILURE = 'STANDARD_LOGIN_FAILURE';

const standardLoginTypes = [STANDARD_LOGIN_REQUEST, STANDARD_LOGIN_SUCCESS, STANDARD_LOGIN_FAILURE];

const standardLoginAction = (email, password) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/login/local`,
    method: 'POST',
    types: standardLoginTypes,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  }
});

export const standardLogin = (email, pass) => dispatch =>
  dispatch(standardLoginAction(email, pass));

//

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const signUpTypes = [SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE];

const signupAction = (email, password) => ({
  [CALL_API]: {
    endpoint: `${baseUrl}/signup/local`,
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    types: signUpTypes,
    body: JSON.stringify({ email, password })
  }
});

export const signup = (email, pass) => dispatch => dispatch(signupAction(email, pass));

//

const logoutAction = () => ({
  type: LOGOUT
});

export const logout = () => dispatch => {
  LoginManager.logOut();
  dispatch(logoutAction());
};
