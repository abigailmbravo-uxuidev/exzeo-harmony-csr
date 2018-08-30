import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getOpenDiaries } from '../state/selectors/diary.selectors';

import Diaries from './Diaries';

export class OpenDiariesBar extends React.Component {
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
                diaries={dueSoon} />
            }

            {pastDue && pastDue.length > 0 &&
              <Diaries
                diaryLevel="pastDue"
                diaries={pastDue} />
            }

            {upComing && upComing.length > 0 &&
              <Diaries
                diaryLevel="upComing"
                diaries={upComing} />
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
  completedTasks: PropTypes.any, // eslint-disable-line
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    instanceId: PropTypes.string,
    modelName: PropTypes.string,
    data: PropTypes.shape({
      quote: PropTypes.object,
      updateUnderwriting: PropTypes.bool
    })
  })
};

const mapStateToProps = state => ({
  diaries: getOpenDiaries(state),
  policy: state.policyState.policy || {}
});

export default connect(mapStateToProps)(OpenDiariesBar);
