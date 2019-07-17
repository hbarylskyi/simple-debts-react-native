import { connect } from 'react-redux';

import Operation from './Operation';
import * as OperationActions from '../../modules/actions/OperationActions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  processOperation: (operationId, isAccepted) =>
    dispatch(OperationActions.processOperation(operationId, isAccepted))
});

export default connect(mapStateToProps, mapDispatchToProps)(Operation);
