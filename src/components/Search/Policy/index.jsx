import { connect } from 'react-redux';
import PolicySearch from './PolicySearch'

const defaultArr = [];
const mapStateToProps = state => ({
  agencyList: state.service.agencies || defaultArr,
  questions: state.questions,
  search: state.search
});

export default connect(mapStateToProps)(PolicySearch);
