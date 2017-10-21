import { connect } from 'react-redux';
import AddPopup from './AddPopup';
import * as DebtsActions from '../../../modules/actions/DebtsActions';
import * as DebtActions from '../../../modules/actions/DebtActions';
import * as NavActions from '../../../modules/actions/NavActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createEntity: name => dispatch(DebtsActions.createVirtEntity(name)),
  goToDebt: debtId => {
    dispatch(DebtActions.selectDebt(debtId));
    dispatch(NavActions.goToDebtScreen());
    dispatch(DebtsActions.fetchDebts());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
