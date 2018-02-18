import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, autoRehydrate } from 'redux-persist';
import AppReducer from './modules/reducers/index';
import beforeRequestHooks from './modules/middlewares/beforeRequestHooks';
import appMiddlewares from './modules/middlewares/index';

const store = createStore(
  AppReducer,
  composeWithDevTools(
    applyMiddleware(thunk, ...beforeRequestHooks, apiMiddleware, ...appMiddlewares)
  ),
  autoRehydrate()
);

persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['debt', 'nav', 'search']
});

export default store;
