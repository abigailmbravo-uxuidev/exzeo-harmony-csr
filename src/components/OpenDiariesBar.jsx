import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleDiary } from '../state/actions/uiActions';
import { getOpenDiaries } from '../state/selectors/diary.selectors';

import Diaries from './Diaries';

export class OpenDiariesBar extends React.Component {
  handleOpenDiaries(selectedDiary) {
    const { toggleDiary, resourceId, resourceType } = this.props;
    toggleDiary({
      type: resourceType,
      id: resourceId,
      selectedDiary
    });
  }

  render() {
    const { diaries } = this.props;
    const { dueSoon, pastDue, upComing } = diaries;

    return (
      <aside className="open-diaries">
        <h4 className="uw-validation-header">Open Diaries</h4>
        <div>

          {dueSoon && dueSoon.length > 0 &&
          <Diaries
            diaryLevel="dueSoon"
            diaries={dueSoon}
            onToggleDiary={this.handleOpenDiaries} />
            }

          {pastDue && pastDue.length > 0 &&
          <Diaries
            diaryLevel="pastDue"
            diaries={pastDue}
            onToggleDiary={this.handleOpenDiaries} />
            }

          {upComing && upComing.length > 0 &&
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
  diaries: {}
};

OpenDiariesBar.propTypes = {
  resourceType: PropTypes.onOf(['Policy', 'Quote', 'Agency']).isRequired,
  resourceId: PropTypes.string,
  diaries: PropTypes.object,
  toggleDiary: PropTypes.func
};

const mapStateToProps = state => ({
  diaries: getOpenDiaries(state)
});

export default connect(mapStateToProps, { toggleDiary })(OpenDiariesBar);
