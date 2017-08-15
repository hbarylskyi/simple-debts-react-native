import { connect } from 'react-redux';

import DebtScreen from './debt.screen';
import * as DebtActions from '../../modules/actions/DebtActions';
import { processError } from '../../modules/actions/ProcessError';

const mapStateToProps = state => ({
  debt: state.debt.debt,
  debtId: state.debt.currentDebtId,
  userId: state.auth.id,
  userPic: state.auth.picture
});

const mapDispatchToProps = dispatch => ({
  fetchDebt: debtId => dispatch(DebtActions.fetchDebt(debtId)),

  newOperation: (debtId, val, uid, descr) =>
    dispatch(DebtActions.newOperation(debtId, val, uid, descr)),

  acceptOperation: (operationId, accepted) =>
    dispatch(DebtActions.processOperation(operationId, accepted)),

  processError: (message, response) => processError(message, response)
});

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);
