import { connect } from 'react-redux';

import SearchModal from './SearchModal';
import * as SearchActions from '../../../modules/actions/SearchActions';
// import * as NavActions from '../../modules/actions/NavActions';
import * as DebtsActions from '../../../modules/actions/DebtsActions';
// import { logout } from '../../modules/actions/AuthActions';

const mapStateToProps = state => ({
  users: state.search
});

const mapDispatchToProps = dispatch => ({
  search: term => dispatch(SearchActions.userSearch(term)),
  select: userId => dispatch(DebtsActions.createDebts(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
