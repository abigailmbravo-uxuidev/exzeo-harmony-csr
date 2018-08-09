import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Diaries from './Diaries';


export class OpenDiariesBar extends React.Component {
  render() {
    const {
      dueSoonDiaries, upComingDiaries, pastDueDiaries
    } = this.props;


    return (
      <div>
        <aside className="underwriting-validation">
          <h4 className="uw-validation-header">Open Diaries</h4>
          <div>

            {dueSoonDiaries.length > 0 &&
              <Diaries
                diaryLevel="dueSoon"
                diaries={dueSoonDiaries}
              />
            }

            {pastDueDiaries.length > 0 &&
              <Diaries
                diaryLevel="pastDue"
                diaries={pastDueDiaries}
              />
            }

            {upComingDiaries.length > 0 &&
              <Diaries
                diaryLevel="upComing"
                diaries={upComingDiaries}
              />
            }
          </div>
        </aside>
      </div>
    );
  }
}

OpenDiariesBar.defaultProps = {
  dueSoonDiaries: [{
    updatedAt: '09/12/2018', type: 'Billing /Payment', followUp: 'Receipt Needed', updatedBy: 'jsutphin'
  }],
  pastDueDiaries: [{
    updatedAt: '06/10/2018', type: 'Additional Interest', followUp: 'Action Required: need load #, 2nd request', updatedBy: 'jsutphin'
  }],
  upComingDiaries: [{
    updatedAt: '08/25/2018', type: 'Billing /Payment', followUp: 'Action Required', updatedBy: 'jsutphin'
  }]
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
  dueSoonDiaries: [],
  pastDueDiaries: [],
  upComingDiaries: []

});

export default connect(mapStateToProps, null)(OpenDiariesBar);
