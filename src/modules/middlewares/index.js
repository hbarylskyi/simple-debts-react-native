import LoginCheckMiddleware from "./login-check";
import RehydrationLogicMiddleware from "./rehydration-logic";

export default [RehydrationLogicMiddleware, LoginCheckMiddleware];
