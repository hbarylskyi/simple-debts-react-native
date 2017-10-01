import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, autoRehydrate } from 'redux-persist';

import AppWithNavigationState from './screens/navigator';
import AppReducer from './modules/reducers/index';
import appMiddlewares from './modules/middlewares/index';

class App extends React.Component {
  constructor() {
    super();

    this.store = createStore(
      AppReducer,
      composeWithDevTools(applyMiddleware(thunk, apiMiddleware, ...appMiddlewares), autoRehydrate())
    );

    persistStore(this.store, {
      storage: AsyncStorage,
      blacklist: ['debt', 'nav', 'search']
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('debtCollector', () => App);

export default App;
