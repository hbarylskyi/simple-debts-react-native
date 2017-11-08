import { connect } from 'react-redux';
import LoginScreen from './login.screen';
import * as AuthActions from '../../modules/actions/AuthActions';
import * as NavActions from '../../modules/actions/NavActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fbLogin: () => dispatch(AuthActions.fbLogin()),
  standardLogin: (email, pass) => dispatch(AuthActions.standardLogin(email, pass)),
  signup: (email, pass) => dispatch(AuthActions.signup(email, pass)),
  goToMainScreen: () => dispatch(NavActions.goToMainScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
