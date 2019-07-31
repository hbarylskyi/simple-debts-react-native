import { connect } from 'react-redux';
import LoginScreen from './login.screen';
import * as AuthActions from '../../modules/actions/AuthActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fbLogin: () => dispatch(AuthActions.fbLogin()),
  standardLogin: (email, pass) => dispatch(AuthActions.standardLogin(email, pass)),
  signup: (email, pass) => dispatch(AuthActions.signup(email, pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
