import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist";

import AppWithNavigationState, { setNavigator } from "./screens/navigator";
import AppReducer from "./modules/reducers/index";
import AppMiddlewares from "./modules/middlewares/index";

class App extends React.Component {
  constructor() {
    super();

    this.store = createStore(
      AppReducer,
      composeWithDevTools(
        applyMiddleware(thunk, apiMiddleware, ...AppMiddlewares)
      )
    );

    persistStore(this.store, { storage: AsyncStorage });
  }

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("debtCollector", () => App);

export default App;
