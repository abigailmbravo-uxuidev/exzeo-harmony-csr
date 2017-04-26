import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Footer from '../Common/Footer';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NoResultsConnect from './NoResults';

const userTasks = {
  handleSelectAddress: 'chooseAddress',
  handleSelectQuote: 'chooseQuote'
};

const handleSelectAddress = (address, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSelectAddress;
  const data = {
    igdId: address.id,
    stateCode: address.physicalAddress.state
  };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
};

const handleSelectQuote = (quote, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSelectQuote;
  const data = {
    quoteId: quote._id
  };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, data);
};

const Search = () => (
  <div className="search route-content">
    <SearchBar />
    <div className="survey-wrapper scroll">
      <div className="results-wrapper">
        <NoResultsConnect />
        <SearchResults handleSelectAddress={handleSelectAddress} handleSelectQuote={handleSelectQuote} />
      </div>
      <Footer />
    </div>
  </div>
);

Search.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    workflowData: PropTypes.func
  })
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
