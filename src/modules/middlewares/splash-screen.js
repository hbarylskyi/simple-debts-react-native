import SplashScreen from 'react-native-splash-screen';

export default () => next => action => {
  if (action.type === 'HIDE_SPLASH') {
    SplashScreen.hide();
  }

  return next(action);
};
