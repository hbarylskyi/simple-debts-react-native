import { connect } from 'react-redux';
import AddPopup from './AddPopup';
import * as DebtsActions from '../../../modules/actions/DebtsActions';
import * as NavActions from '../../../modules/actions/NavActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createEntity: name => dispatch(DebtsActions.createVirtEntity(name)),
  goToDebt: () => dispatch(NavActions.goToDebtScreen())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
