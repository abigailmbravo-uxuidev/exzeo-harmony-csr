import { connect } from 'react-redux';
import { getAgenciesForTypeAhead } from "../../../state/selectors/search.selectors";
import PolicySearch from './PolicySearch'

const mapStateToProps = state => ({
  agencyList: getAgenciesForTypeAhead(state),
  questions: state.questions,
  search: state.search
});

export default connect(mapStateToProps)(PolicySearch);
