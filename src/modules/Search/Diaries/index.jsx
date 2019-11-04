import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { getDiaryAssigneeAnswers } from '../../../state/selectors/questions.selectors';

import DiariesSearch from './DiariesSearch';

const mapStateToProps = state => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state),
    diaryReasons: state.list.diaryOptions.reasons || []
  };
};

export default connect(
  mapStateToProps,
  {
    submitSearch: submit
  }
)(DiariesSearch);
