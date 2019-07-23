import LoginCheckMiddleware from './login-check';
import SplashScreenMiddleware from './splash-screen';
import LogoutOnUnauthorized from './logout-on-unauthorized';

export default [
  LoginCheckMiddleware,
  SplashScreenMiddleware,
  LogoutOnUnauthorized
];
