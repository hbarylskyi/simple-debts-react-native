import { connect } from 'react-redux';

import AddPopup from './AddPopup';
// import * as DebtsActions from '../../modules/actions/DebtsActions';
// import * as NavActions from '../../modules/actions/NavActions';
// import * as DebtActions from '../../modules/actions/DebtActions';
// import { logout } from '../../modules/actions/AuthActions';

const mapStateToProps = state => ({
  debts: state.debts.debts,
  summary: state.debts.summary,
  userId: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  // fetchDebts: () => dispatch(DebtsActions.fetchDebts()),
  // selectDebt: debtId => dispatch(DebtActions.selectDebt(debtId)),
  // goToDebt: () => dispatch(NavActions.goToDebtScreen()),
  // logout: () => {
  //   dispatch(NavActions.goToLoginScreen());
  //   dispatch(logout());
  // },
  // test: () => {
  //   dispatch(NavigationActions.setParams({ test: 'test1' }));
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
