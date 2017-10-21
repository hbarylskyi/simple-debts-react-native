import { connect } from 'react-redux';

import MainScreen from './main.screen';
import * as DebtsActions from '../../modules/actions/DebtsActions';
import * as NavActions from '../../modules/actions/NavActions';
import * as DebtActions from '../../modules/actions/DebtActions';
import { logout } from '../../modules/actions/AuthActions';

const mapStateToProps = state => ({
  debts: state.debts.debts,
  summary: state.debts.summary,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchDebts: () => dispatch(DebtsActions.fetchDebts()),
  selectDebt: debtId => dispatch(DebtActions.selectDebt(debtId)),
  goToDebt: () => dispatch(NavActions.goToDebtScreen()),
  logout: () => {
    dispatch(NavActions.goToLoginScreen());
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
