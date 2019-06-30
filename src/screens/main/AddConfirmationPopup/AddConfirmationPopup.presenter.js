import { connect } from 'react-redux';
import AddConfirmationPopup from './AddConfirmationPopup';
import * as DebtActions from '../../../modules/actions/DebtActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  createDebt: (userIdOrName, isSingle, currency) =>
    dispatch(DebtActions.createDebt(userIdOrName, isSingle, currency))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddConfirmationPopup);
