import { connect } from "react-redux";

import MainScreen from "./main.screen";
import * as ApiActions from "../../modules/actions/ApiActions";
import * as NavActions from "../../modules/actions/NavActions";
import * as DebtActions from "../../modules/actions/DebtActions";

const mapStateToProps = state => ({
  debts: state.debts.debts,
  summary: state.debts.summary,
  userId: state.auth.id
});

const mapDispatchToProps = dispatch => ({
  fetchDebts: () => dispatch(ApiActions.fetchDebts()),
  selectDebt: debtId => dispatch(DebtActions.selectDebt(debtId)),
  goToDebt: debtId => dispatch(NavActions.goToDebtScreen(debtId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
