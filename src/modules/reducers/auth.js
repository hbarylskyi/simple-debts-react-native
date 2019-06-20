import jwtDecode from 'jwt-decode';
import * as AuthActions from '../actions/AuthActions';

const initialState = {
  token: '',
  refreshToken: '',
  accessTokenExpiresAt: undefined,
  user: {
    id: null,
    name: null,
    picture: null
  }
};

const getTokenExpirationDate = token => {
  const decoded = jwtDecode(token);
  return decoded.exp * 1000;
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case AuthActions.STANDARD_LOGIN_SUCCESS:
    case `${AuthActions.FB_LOGIN}_SUCCESS`:
      nextState = action.payload;

      nextState.accessTokenExpiresAt = getTokenExpirationDate(
        action.payload.token
      );
      break;

    case AuthActions.SIGN_UP_SUCCESS:
      nextState = action.payload;

      nextState.accessTokenExpiresAt = getTokenExpirationDate(
        action.payload.token
      );
      break;

    case AuthActions.REFRESH_TOKEN_SUCCESS:
      nextState = { ...state, ...action.payload };

      nextState.accessTokenExpiresAt = getTokenExpirationDate(
        action.payload.token
      );
      break;

    case 'LOGOUT':
      nextState = initialState;
      break;

    default:
      break;
  }

  return nextState || state;
};
