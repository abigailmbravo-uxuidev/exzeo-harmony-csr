import { connect } from 'react-redux';
import QuoteSearch from './QuoteSearch';

const mapStateToProps = state => ({
  questions: state.questions,
  search: state.search
});

export default connect(mapStateToProps)(QuoteSearch);
