import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { getDiaryAssigneeAnswers } from '../../../state/selectors/questions.selectors';

import DiariesSearch from './DiariesSearch';

const mapStateToProps = state => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state)
  };
};

export default connect(
  mapStateToProps,
  {
    submitSearch: submit
  }
)(DiariesSearch);
