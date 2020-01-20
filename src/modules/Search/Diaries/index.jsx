import { connect } from 'react-redux';
import { submit } from 'redux-form';

import { getDiaryAssigneeAnswers } from '../../../state/selectors/questions.selectors';
import { getDiaryReasons } from '../../../state/selectors/diary.selectors';

import DiariesSearch from './DiariesSearch';

const mapStateToProps = state => {
  return {
    assigneeAnswers: getDiaryAssigneeAnswers(state),
    diaryReasons: getDiaryReasons(state),
    results: state.search.results
  };
};

export default connect(mapStateToProps, {
  submitSearch: submit
})(DiariesSearch);
