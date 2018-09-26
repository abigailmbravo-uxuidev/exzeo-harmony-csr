import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDiary } from '../state/actions/ui.actions';
import { getFilteredOpenDiaries } from '../state/selectors/diary.selectors';

import Diaries from './Diaries';

export class OpenDiariesBar extends React.Component {
  handleOpenDiaries = (selectedDiary) => {
    const { toggleDiary, resourceId, resourceType } = this.props;
    toggleDiary({
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
  resourceId: PropTypes.string,
  diaries: PropTypes.object,
  toggleDiary: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const resource = ownProps.resourceType;
  return {
    diaries: getFilteredOpenDiaries(state, resource) || []
  };
};

export default connect(mapStateToProps, { toggleDiary })(OpenDiariesBar);
