import { connect } from "react-redux";

import DebtScreen from "./debt.screen";
import * as DebtActions from "../../modules/actions/DebtActions";

const mapStateToProps = state => ({
  debt: state.debt.debt,
  debtId: state.debt.currentDebtId,
  userId: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  fetchDebt: debtId => dispatch(DebtActions.fetchDebt(debtId)),
  take: (debtId, val, uid) =>
    dispatch(
      DebtActions.newOperation(debtId, val, uid, "hardcoded description")
    ),
  give: (debtId, val, uid) =>
    dispatch(
      DebtActions.newOperation(debtId, val, uid, "hardcoded description")
    ),

  acceptOperation: (operationId, accepted) =>
    dispatch(DebtActions.processOperation(operationId, accepted))
});

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);
