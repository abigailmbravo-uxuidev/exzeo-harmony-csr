import { connect } from 'react-redux';
import { submit } from 'redux-form';

import DiariesSearch from './DiariesSearch';

const mapStateToProps = state => {
  return {
    results: state.search.results
  };
};

export default connect(mapStateToProps, {
  submitSearch: submit
})(DiariesSearch);
