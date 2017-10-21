import { connect } from 'react-redux';

import Debt from './Debt';
import * as NavActions from '../../modules/actions/NavActions';
import * as DebtActions from '../../modules/actions/DebtActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  acceptDebt: debtId => dispatch(DebtActions.acceptDebt(debtId, DebtActions.REQUESTS.ACCEPT)),
  declineDebt: debtId => dispatch(DebtActions.acceptDebt(debtId, DebtActions.REQUESTS.DECLINE)),
  acceptDebtDeletion: debtId =>
    dispatch(DebtActions.deleteDebt(debtId, DebtActions.REQUESTS.ACCEPT)),
  declineDebtDeletion: debtId =>
    dispatch(DebtActions.deleteDebt(debtId, DebtActions.REQUESTS.DECLINE)),
  goToDebt: debtId => {
    dispatch(DebtActions.selectDebt(debtId));
    dispatch(NavActions.goToDebtScreen());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Debt);
