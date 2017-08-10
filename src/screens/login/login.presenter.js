import LoginScreen from "./login.screen";
import { connect } from "react-redux";

import * as AuthActions from "../../modules/actions/AuthActions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(AuthActions.fbLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
