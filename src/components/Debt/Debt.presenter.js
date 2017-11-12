import { connect } from 'react-redux';

import Debt from './Debt';
import * as DebtActions from '../../modules/actions/DebtActions';

const mapStateToProps = state => ({
  userId: state.auth.user.id
});

const mapDispatchToProps = dispatch => ({
  acceptDebt: debtId => dispatch(DebtActions.acceptDebt(debtId, DebtActions.REQUESTS.ACCEPT)),
  declineDebt: debtId => dispatch(DebtActions.acceptDebt(debtId, DebtActions.REQUESTS.DECLINE))
});

export default connect(mapStateToProps, mapDispatchToProps)(Debt);
