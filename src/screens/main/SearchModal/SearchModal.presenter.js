import { connect } from 'react-redux';
import SearchModal from './SearchModal';
import * as SearchActions from '../../../modules/actions/SearchActions';

const mapStateToProps = state => ({
  users: state.search
});

const mapDispatchToProps = dispatch => ({
  search: term => dispatch(SearchActions.userSearch(term))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
