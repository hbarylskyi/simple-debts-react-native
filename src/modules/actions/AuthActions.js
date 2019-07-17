import { RSAA } from 'redux-api-middleware';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import config from 'react-native-config';
import NavigationService from '../../utils/NavigationService';

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
  [RSAA]: {
    endpoint: `${baseUrl}/login/status`,
    method: 'GET',
    types: loginCheckTypes
  },

  authorize: true
});

export const loginCheck = () => dispatch => dispatch(loginCheckAction());

//

const fbLoginTypes = [
  `${FB_LOGIN}_REQUEST`,
  `${FB_LOGIN}_SUCCESS`,
  `${FB_LOGIN}_FAILURE`
];

const fbLoginAction = fbToken => ({
  [RSAA]: {
    endpoint: `${baseUrl}/login/facebook`,
    method: 'GET',
    types: fbLoginTypes,
    headers: {
      Authorization: `Bearer ${fbToken}`
    },
    credentials: 'same-origin'
  }
});

export const fbLogin = () => async dispatch => {
  try {
    await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) return;

    const { error, payload } = await dispatch(
      fbLoginAction(data.accessToken.toString())
    );

    if (error) {
      const { response = {} } = payload;
      alert('Login unsuccessful:', response.error || payload.message);
    } else {
      NavigationService.resetTo('MainScreen');
    }
  } catch (error) {
    alert(`Login failed with error: ${error.errorMessage}`);
  }
};

//

export const STANDARD_LOGIN_REQUEST = 'STANDARD_LOGIN_REQUEST';
export const STANDARD_LOGIN_SUCCESS = 'STANDARD_LOGIN_SUCCESS';
export const STANDARD_LOGIN_FAILURE = 'STANDARD_LOGIN_FAILURE';

const standardLoginTypes = [
  STANDARD_LOGIN_REQUEST,
  STANDARD_LOGIN_SUCCESS,
  STANDARD_LOGIN_FAILURE
];

const standardLoginAction = (email, password) => ({
  [RSAA]: {
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
  [RSAA]: {
    endpoint: `${baseUrl}/sign_up/local`,
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    types: signUpTypes,
    body: JSON.stringify({ email, password })
  }
});

export const signup = (email, pass) => dispatch =>
  dispatch(signupAction(email, pass));

//

const logoutAction = () => ({
  type: LOGOUT
});

export const logout = () => dispatch => {
  LoginManager.logOut();
  NavigationService.resetTo('LoginScreen');
  dispatch(logoutAction());
};

//

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

const refreshTokenTypes = [
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE
];

const refreshTokenAction = refreshToken => ({
  [RSAA]: {
    endpoint: `${baseUrl}/login/refresh_token`,
    method: 'GET',
    types: refreshTokenTypes,
    headers: {
      authorization: `Bearer ${refreshToken}`
    }
  }
});

export const refreshToken = () => (dispatch, getState) =>
  dispatch(refreshTokenAction(getState().auth.refreshToken));
