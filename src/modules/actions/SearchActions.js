import { CALL_API } from 'redux-api-middleware';

const baseUrl = 'https://simple-debts.herokuapp.com';
const searchEndpoint = '/users';

export const USER_SEARCH_REQUEST = 'USER_SEARCH_REQUEST';
export const USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
export const USER_SEARCH_FAILURE = 'USER_SEARCH_FAILURE';

const userSearchTypes = [USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS, USER_SEARCH_FAILURE];

const userSearchAction = nameOrEmail => ({
  [CALL_API]: {
    endpoint: `${baseUrl + searchEndpoint}?name=${nameOrEmail}`,
    method: 'GET',
    types: userSearchTypes
  }
});

export const userSearch = nameOrEmail => dispatch => {
  const text = nameOrEmail.trim();

  if (text) {
    return dispatch(userSearchAction(text));
  }

  return Promise.resolve();
};
