import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { persistCombineReducers, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducers from './modules/reducers/index';
import beforeRequestHooks from './modules/middlewares/beforeRequestHooks';
import afterRequestHooks from './modules/middlewares/afterRequestHooks';
import appMiddlewares from './modules/middlewares/index';

const config = {
  key: 'primary',
  storage: AsyncStorage,
  blacklist: ['search']
};

const reducer = persistCombineReducers(config, reducers);

const store = createStore(
  reducer,
  undefined,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      ...beforeRequestHooks,
      apiMiddleware,
      ...afterRequestHooks,
      ...appMiddlewares
    )
  )
);

persistStore(store);

export default store;
