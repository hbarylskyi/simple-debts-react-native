import AuthorizationHeaderMiddleware from './authorization-header';
import RefreshToken from './refresh-token';

export default [RefreshToken, AuthorizationHeaderMiddleware];
