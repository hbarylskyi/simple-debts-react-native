import { connect } from 'react-redux';
import AddPopup from './AddPopup';
import * as DebtsActions from '../../../modules/actions/DebtsActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createDebts: virtualUname => dispatch(DebtsActions.createDebtsWVirtualUser(virtualUname))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPopup);
