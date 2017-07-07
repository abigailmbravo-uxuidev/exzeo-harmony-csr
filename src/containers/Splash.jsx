import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import localStorage from 'localStorage';
import BaseConnect from './Base';
import Footer from '../components/Common/Footer';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import SearchResults from '../components/Search/SearchResults';
import NoResultsConnect from '../components/Search/NoResults';
import Loader from '../components/Common/Loader';

const workflowModelName = 'csrQuote';

export const handleNewTab = (searchData) => {
  localStorage.setItem('isNewTab', true);

  const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

  if (lastSearchData.searchType === 'address') {
    localStorage.setItem('stateCode', searchData.physicalAddress.state);
    localStorage.setItem('igdID', searchData.id);
    window.open('/quote/coverage', '_blank');
  } else if (lastSearchData.searchType === 'quote') {
    localStorage.setItem('quoteId', searchData._id);
    window.open('/quote/coverage', '_blank');
  } else if (lastSearchData.searchType === 'policy') {
    localStorage.setItem('policyID', searchData.policyID);
    window.open('/policy/coverage', '_blank');
  }
};

export class Splash extends Component {

  componentDidMount() {
    const workflowData = {
      dsUrl: `${process.env.REACT_APP_API_URL}/ds`
    };
    this.props.actions.cgActions.startWorkflow(workflowModelName, workflowData);
  }


  handleSelectQuote = (quote, props) => {
    const workflowId = props.appState.instanceId;
    const steps = [{
      name: 'chooseQuote',
      data: {
        quoteId: quote._id
      }
    }];

    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });


    props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(
          props.appState.modelName,
          workflowId,
          { ...props.appState.data, selectedLink: 'customerData', submitting: false }
        );
        this.context.router.history.push('/quote/coverage');
      });
  };

  handleSelectAddress = (address, props) => {
    const workflowId = props.appState.instanceId;
    const submitData = {
      igdId: address.id,
      stateCode: address.physicalAddress.state
    };

    const steps = [{
      name: 'chooseAddress',
      data: submitData
    }];

    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

    props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(
          props.appState.modelName,
          workflowId,
          { ...props.appState.data, recalc: false, updateWorkflowDetails: true, selectedLink: 'customerData', submitting: false }
        );
        this.context.router.history.push('/quote/coverage');
      });
  };

  handleSelectPolicy = (policy, props) => {
    const workflowId = props.appState.instanceId;
    const steps = [{
      name: 'choosePolicy',
      data: {
        policyId: policy.policyID
      }
    }];

    props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

    props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(
          props.appState.modelName,
          workflowId,
          { ...props.appState.data, selectedLink: 'coverage', submitting: false }
        );
        this.context.router.history.push('/policy/coverage');
      });
  };

  render() {
    return (
      <BaseConnect {...this.props}>
        <Helmet>
          <title>Harmony - CSR Portal</title>
        </Helmet>
        {this.props.appState.data.submitting && <Loader />}
        <div className="dashboard" role="article">
          <div className="route">
            <div className="search route-content">
              <div className="survey-wrapper scroll">
                <div className="results-wrapper">
                  <NoResultsConnect />
                  <SearchResults
                    handleNewTab={handleNewTab}
                    handleSelectAddress={this.handleSelectAddress}
                    handleSelectQuote={this.handleSelectQuote}
                    handleSelectPolicy={this.handleSelectPolicy}
                  />
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </BaseConnect>
    );
  }
}

Splash.contextTypes = {
  router: PropTypes.object
};

Splash.propTypes = {
  actions: PropTypes.shape({
    cgActions: PropTypes.shape({ startWorkflow: PropTypes.func, activeTasks: PropTypes.func, completeTask: PropTypes.func }),
    appStateActions: PropTypes.shape({ setAppState: PropTypes.func, setAppStateError: PropTypes.func })
  })
};

const mapStateToProps = state => (
  {
    tasks: state.cg,
    appState: state.appState,
    error: state.error
  }
);

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
