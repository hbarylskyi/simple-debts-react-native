import { connect } from 'react-redux';

import DebtScreen from './debt.screen';
import * as DebtActions from '../../modules/actions/DebtActions';
import { processError } from '../../modules/actions/ProcessError';
import * as OperationActions from '../../modules/actions/OperationActions';

const mapStateToProps = state => ({
  debt: state.debt.debt,
  debtId: state.debt.currentDebtId,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  fetchDebt: debtId => dispatch(DebtActions.fetchDebt(debtId)),
  processError: (message, response) => processError(message, response),
  processOperation: (operationId, isAccepted) =>
    OperationActions.processOperation(operationId, isAccepted),
  newOperation: (debtId, val, uid, descr) =>
    dispatch(OperationActions.newOperation(debtId, val, uid, descr))
});

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);
