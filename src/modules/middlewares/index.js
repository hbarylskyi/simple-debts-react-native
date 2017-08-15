import LoginCheckMiddleware from './login-check';
import RehydrationLogicMiddleware from './rehydration-logic';
import SplashScreenMiddleware from './splash-screen';

export default [RehydrationLogicMiddleware, LoginCheckMiddleware, SplashScreenMiddleware];
