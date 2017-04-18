import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Loader from '../Common/Loader';
import * as cgActions from '../../actions/cgActions';

const runTask = (props) => {
  const workflowId = props.appState.instanceId;
  const taskName = props.taskName;
  const taskData = props.taskData;
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

export const TaskRunner = (props) => {
  console.log('task runner is running:', props);
  runTask(props);
  // return something to make the react dom happy
  // this may be a loader in the future
  return <Loader />;
};

TaskRunner.propTypes = {
  taskName: PropTypes.string,
  taskData: PropTypes.shape({})
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskRunner);
