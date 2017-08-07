import { connect } from "react-redux";

import DebtScreen from "./debt.screen";
import * as DebtActions from "../../modules/actions/DebtActions";

const mapStateToProps = state => ({
  debt: state.debt,
  debtId: state.debt.currentDebtId
});

const mapDispatchToProps = dispatch => ({
  fetchDebt: debtId => DebtActions.fetchDebt(debtId)
});

export default connect(mapStateToProps, mapDispatchToProps)(DebtScreen);
