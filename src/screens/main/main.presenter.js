import { connect } from 'react-redux';
import MainScreen from './main.screen';
import * as AuthActions from '../../modules/actions/AuthActions';
import * as DebtsActions from '../../modules/actions/DebtsActions';

const mapStateToProps = state => ({
  debts: state.debts.debts,
  summary: state.debts.summary,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchDebts: () => dispatch(DebtsActions.fetchDebts()),
  signOut: () => dispatch(AuthActions.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen);
