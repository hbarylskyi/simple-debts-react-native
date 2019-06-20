import React from 'react';
import { AppRegistry, View, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import AppWithNavigationState from './screens/navigation';
import KeyboardDismissingView from './components/KeyboardDismissingView/KeyboardDismissingView';
import store from './store';
import './utils/NetworkLogFix';
import NavigationService from './utils/NavigationService';

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
            <AppWithNavigationState
              ref={navigationRef =>
                NavigationService.setTopLevelNavigator(navigationRef)
              }
            />
          </View>
        </KeyboardDismissingView>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('SimpleDebts', () => App);

export default App;
