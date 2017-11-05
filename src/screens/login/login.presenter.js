import { connect } from 'react-redux';
import LoginScreen from './login.screen';
import * as AuthActions from '../../modules/actions/AuthActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  fbLogin: () => dispatch(AuthActions.fbLogin()),
  standardLogin: () => dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
