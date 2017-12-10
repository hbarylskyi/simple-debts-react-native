import { connect } from 'react-redux';
import AddConfirmationPopup from './AddConfirmationPopup';
import * as NavActions from '../../../modules/actions/NavActions';
import * as DebtActions from '../../../modules/actions/DebtActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  goToDebt: () => dispatch(NavActions.goToDebtScreen()),
  createDebt: (userIdOrName, isSingle) =>
    dispatch(DebtActions.createDebt(userIdOrName, isSingle))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddConfirmationPopup);
