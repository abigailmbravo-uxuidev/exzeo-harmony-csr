import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Diaries from './Diaries';


export class OpenDiariesBar extends React.Component {
  render() {
    const {
      dueSoonDiaries, upComingDiaries, pastDueDiaries, openHandler
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
                openHandler={openHandler}/>
            }

            {pastDueDiaries.length > 0 &&
              <Diaries
                diaryLevel="pastDue"
                diaries={pastDueDiaries}
                openHandler={openHandler}/>
            }

            {upComingDiaries.length > 0 &&
              <Diaries
                diaryLevel="upComing"
                diaries={upComingDiaries}
                openHandler={openHandler}/>
            }
          </div>
        </aside>
      </div>
    );
  }
}

OpenDiariesBar.defaultProps = {
  dueSoonDiaries: [{
    dueDate: '2018-08-24', type: 'Billing /Payment', reason: 'Receipt Needed', assignee: 'jsutphin', message: ''
  }],
  pastDueDiaries: [{
    dueDate: '2018-08-04', type: 'Additional Interest', reason: 'Action Required', assignee: 'jsutphin', message: ''
  }],
  upComingDiaries: [{
    dueDate: '2018-09-24', type: 'Billing /Payment', reason: 'Action Required', assignee: 'jsutphin', message: ''
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
