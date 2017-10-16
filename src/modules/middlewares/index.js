import LoginCheckMiddleware from './login-check';
import RehydrationLogicMiddleware from './rehydration-logic';
import SplashScreenMiddleware from './splash-screen';
import AuthorizationHeaderiddleware from './authorization-header';

export default [
  RehydrationLogicMiddleware,
  LoginCheckMiddleware,
  SplashScreenMiddleware,
  AuthorizationHeaderiddleware
];
