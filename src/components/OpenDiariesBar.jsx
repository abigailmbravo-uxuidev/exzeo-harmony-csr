import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDiary } from '../state/actions/ui.actions';
import { getGroupedOpenDiaries } from '../state/selectors/diary.selectors';

import Diaries from './Diaries';

export class OpenDiariesBar extends React.Component {
  handleOpenDiaries = (selectedDiary) => {
    const { toggleDiaryAction, resourceId, resourceType } = this.props;
    toggleDiaryAction({
      resourceType,
      resourceId,
      selectedDiary
    });
  };

  render() {
    const { diaries } = this.props;
    const { dueSoon, pastDue, upComing } = diaries;

    return (
      <aside className="open-diaries">
        <h4 className="open-diaries-header">Open Diaries</h4>
        <div>

          {pastDue.length > 0 &&
          <Diaries
            diaryLevel="pastDue"
            diaries={pastDue}
            onToggleDiary={this.handleOpenDiaries} />
            }
          {dueSoon.length > 0 &&
          <Diaries
            diaryLevel="dueSoon"
            diaries={dueSoon}
            onToggleDiary={this.handleOpenDiaries} />
            }

          {upComing.length > 0 &&
          <Diaries
            diaryLevel="upComing"
            diaries={upComing}
            onToggleDiary={this.handleOpenDiaries} />
            }
        </div>
      </aside>
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

export default connect(mapStateToProps, {
  toggleDiaryAction: toggleDiary
})(OpenDiariesBar);
