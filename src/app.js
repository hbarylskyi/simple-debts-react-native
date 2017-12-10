import React from 'react';
import { AppRegistry, View, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './screens/navigator';
import KeyboardDismissingView from './components/KeyboardDismissingView/KeyboardDismissingView';
import store from './store';

class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    store.dispatch({ type: 'Navigation/BACK' });
    return true;
  };

  render() {
    return (
      <Provider store={store}>
        <KeyboardDismissingView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <AppWithNavigationState />
          </View>
        </KeyboardDismissingView>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('debtCollector', () => App);

export default App;
