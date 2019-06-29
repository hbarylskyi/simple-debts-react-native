import { RSAA } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;

export const USER_SEARCH_REQUEST = 'USER_SEARCH_REQUEST';
export const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
export const USER_SEARCH_FAILURE = 'USER_SEARCH_FAILURE';

const userSearchTypes = [USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAILURE];

const userSearchAction = nameOrEmail => ({
  [RSAA]: {
    endpoint: `${baseUrl}/users?name=${nameOrEmail}`,
    method: 'GET',
    types: userSearchTypes
  },

  authorize: true
});

export const userSearch = nameOrEmail => async dispatch => {
  const text = nameOrEmail.trim();

  if (text) {
    const res = await dispatch(userSearchAction(text));
    if (!res.error) return res.payload;
  }

  return Promise.resolve([]);
};
