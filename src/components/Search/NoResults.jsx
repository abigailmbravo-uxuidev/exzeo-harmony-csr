import React, {
  PropTypes
} from 'react';
import {
  bindActionCreators
} from 'redux';
import {
  connect
} from 'react-redux';

import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const userTasks = {
  askToSearchAgain: 'askToSearchAgain'
};

const setSearchAgain = (props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.askToSearchAgain;
  const taskData = {
    searchAgain: 'Yes'
  };
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const NoResults = (props) => {
  if (props.tasks[props.appState.modelName] &&
    props.tasks[props.appState.modelName].data.activeTask &&
    (props.tasks[props.appState.modelName].data.activeTask.name === 'askToSearchAgain')) {
    setSearchAgain(props);
  }
  if (props.tasks[props.appState.modelName] &&
    props.tasks[props.appState.modelName].data.previousTask &&
    (props.tasks[props.appState.modelName].data.previousTask.name === 'askToSearchAgain')) {
    return (
      <div className="survey-wrapper">
        <div className="card">
          <div className="card-header"><h4><i className="fa fa-frown-o " /> No Results Found</h4></div>
          <div className="card-block">
            <p>We&#39;re sorry we couldn&#39;t find any results matching your search parameters. Please
            check your spelling and try a new search. You can also try a
            less specific search (such street number and name).</p>
          </div>
        </div>
      </div>
    );
  }

  return <span />;
};

NoResults.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string
  }),
  tasks: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NoResults);
