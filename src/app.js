/**
 * @flow
 */

import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import middlewares from "./modules/api";
import thunk from "redux-thunk";

import AppReducer from "./modules/reducers/index";
import AppWithNavigationState from "./screens/navigator";

class App extends React.Component {
  store = createStore(AppReducer, compose(applyMiddleware(thunk, middlewares)));

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
