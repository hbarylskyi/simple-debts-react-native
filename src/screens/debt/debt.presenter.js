import { connect } from 'react-redux';

import DebtScreen from './debt.screen';
import * as DebtActions from '../../modules/actions/DebtActions';
import * as DebtsActions from '../../modules/actions/DebtsActions';
import * as OperationActions from '../../modules/actions/OperationActions';

const mapStateToProps = (state, { navigation }) => {
  const debtId = navigation.getParam('debtId');

  return {
    debt: state.debts.debts.find(debt => debt.id === debtId),
    operations: state.operations[debtId] || [],
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDebt: debtId => dispatch(DebtActions.fetchDebt(debtId)),
  fetchDebts: () => dispatch(DebtsActions.fetchDebts()),
  newOperation: (debtId, val, uid, descr) =>
    dispatch(OperationActions.newOperation(debtId, val, uid, descr)),
  acceptDebt: debtId => dispatch(DebtActions.acceptDebt(debtId)),
  declineDebt: debtId => dispatch(DebtActions.declineDebt(debtId)),
  deleteDebt: (debtId, isSingle) =>
    dispatch(DebtActions.deleteDebt(debtId, isSingle)),
  connectUser: (debtId, userId) =>
    dispatch(DebtActions.connectUserInvite(debtId, userId)),
  acceptUserConnection: debtId =>
    dispatch(DebtActions.acceptUserConnection(debtId)),
  declineUserConnection: debtId =>
    dispatch(DebtActions.declineUserConnection(debtId))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { debt = {} } = stateProps;
  const { id, type } = debt;
  const acceptDebt = () => dispatchProps.acceptDebt(id);
  const declineDebt = () => dispatchProps.declineDebt(id);
  const deleteDebt = () => dispatchProps.deleteDebt(id, type === 'SINGLE_USER');
  const connectUser = userId => dispatchProps.connectUser(id, userId);
  const acceptUserConnection = () => dispatchProps.acceptUserConnection(id);
  const declineUserConnection = () => dispatchProps.declineUserConnection(id);

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    acceptDebt,
    declineDebt,
    deleteDebt,
    connectUser,
    acceptUserConnection,
    declineUserConnection
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DebtScreen);
