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

  accept: operationId => dispatch(DebtActions.operationDecline(operationId)),

  decline: operationId => dispatch(DebtActions.operationAccept(operationId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);
