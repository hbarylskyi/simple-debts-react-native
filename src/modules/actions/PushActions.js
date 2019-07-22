import { RSAA } from 'redux-api-middleware';
import config from 'react-native-config';

const baseUrl = config.host;

// TODO move to UserActions
export const UPLOAD_PUSH_TOKEN_REQUEST = 'UPLOAD_PUSH_TOKEN_REQUEST';
export const UPLOAD_PUSH_TOKEN_SUCCESS = 'UPLOAD_PUSH_TOKEN_SUCCESS';
export const UPLOAD_PUSH_TOKEN_FAILURE = 'UPLOAD_PUSH_TOKEN_FAILURE';

const uploadPushTokenTypes = [
  UPLOAD_PUSH_TOKEN_REQUEST,
  UPLOAD_PUSH_TOKEN_SUCCESS,
  UPLOAD_PUSH_TOKEN_FAILURE
];

const uploadPushTokenAction = token => ({
  [RSAA]: {
    endpoint: `${baseUrl}/users/push_tokens`,
    method: 'POST',
    types: uploadPushTokenTypes,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  },

  authorize: true
});

export const uploadPushToken = token => dispatch =>
  dispatch(uploadPushTokenAction(token));
