import { connect } from 'react-redux';

import Operation from './Operation';
import * as NavActions from '../../modules/actions/NavActions';
import * as OperationActions from '../../modules/actions/OperationActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  acceptOperation: operationId => dispatch(OperationActions.processOperation(operationId, true)),
  declineOperation: operationId => dispatch(OperationActions.processOperation(operationId, false))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
