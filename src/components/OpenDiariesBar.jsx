import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDiary } from '../state/actions/ui.actions';
import { getGroupedOpenDiaries } from '../state/selectors/diary.selectors';

import Diaries from './Diaries';

export class OpenDiariesBar extends React.Component {
  handleOpenDiaries = selectedDiary => {
    const { toggleDiaryAction, resourceId, resourceType, entity } = this.props;
    toggleDiaryAction({
      resourceType,
      resourceId,
      selectedDiary,
      entity
    });
  };

  render() {
    const { diaries } = this.props;
    const { dueSoon, pastDue, upComing, count } = diaries;

    return (
      count > 0 && (
        <aside className="open-diaries">
          <header className="open-diaries-header">
            <h4 data-test="open-diaries-header">Open Diaries</h4>
          </header>
          <div className="diaries-list">
            {pastDue.length > 0 && (
              <Diaries
                diaryLevel="pastDue"
                diaries={pastDue}
                onToggleDiary={this.handleOpenDiaries}
              />
            )}
            {dueSoon.length > 0 && (
              <Diaries
                diaryLevel="dueSoon"
                diaries={dueSoon}
                onToggleDiary={this.handleOpenDiaries}
              />
            )}

            {upComing.length > 0 && (
              <Diaries
                diaryLevel="upComing"
                diaries={upComing}
                onToggleDiary={this.handleOpenDiaries}
              />
            )}
          </div>
        </aside>
      )
    );
  }
}

OpenDiariesBar.defaultProps = {
  diaries: {
    dueSoon: [],
    pastDue: [],
    upComing: []
  }
};

OpenDiariesBar.propTypes = {
  entityEndDate: PropTypes.string,
  resourceType: PropTypes.oneOf(['Policy', 'Quote', 'Agency']).isRequired,
  diaries: PropTypes.object,
  resourceId: PropTypes.string,
  toggleDiaryAction: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  return {
    diaries: getGroupedOpenDiaries(state)
  };
};

export default connect(
  mapStateToProps,
  {
    toggleDiaryAction: toggleDiary
  }
)(OpenDiariesBar);
