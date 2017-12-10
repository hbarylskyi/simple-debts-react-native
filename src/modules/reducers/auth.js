import * as AuthActions from '../actions/AuthActions';

const initialState = {
  token: '',
  refreshToken: '',
  user: {
    id: null,
    name: null,
    picture: null
  }
};

export default (state = initialState, action) => {
  let nextState;

  switch (action.type) {
    case AuthActions.STANDARD_LOGIN_SUCCESS:
    case `${AuthActions.FB_LOGIN}_SUCCESS`:
      nextState = action.payload;
      break;

    case 'LOGOUT':
      nextState = initialState;
      break;

    case 'HIDE_SPLASH':
      nextState = { ...state, fuck: 'yes' };
      break;

    // case REHYDRATE:
    //   let cached = action.payload.auth;
    //   if (cached && cached.id) nextState = { ...state, ...cached };
    //   break;
    default:
      break;
  }

  return nextState || state;
};
