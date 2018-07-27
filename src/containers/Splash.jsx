import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Loader from '@exzeo/core-ui/lib/Loader';
import * as cgActions from '../state/actions/cgActions';
import * as appStateActions from '../state/actions/appStateActions';
import * as questionsActions from '../state/actions/questionsActions';
import SearchResults from '../components/Search/SearchResults';
import NoResultsConnect from '../components/Search/NoResults';
import Footer from '../components/Common/Footer';
import BaseConnect from './Base';

const workflowModelName = 'csrQuote';
const workflowData = {
  dsUrl: `${process.env.REACT_APP_API_URL}/ds`
};

export const handleNewTab = (searchData) => {
  // TODO: remove this in Search Refactor branch, as it will require changes in a few places that will conflict with work already done in branch.
  const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

  if (lastSearchData.searchType === 'address') {
    window.open(`/quote/new/${searchData.physicalAddress.state}/${searchData.id}`, '_blank');
  } else if (lastSearchData.searchType === 'quote') {
    window.open(`/quote/${searchData._id}`, '_blank');
  } else if (lastSearchData.searchType === 'policy') {
    window.open(`/policy/${searchData.policyNumber}/coverage`, '_blank');
  }
};

export class Splash extends Component {
  componentDidMount() {
    this.props.actions.cgActions.startWorkflow(workflowModelName, workflowData);
    this.props.actions.questionsActions.getUIQuestions('searchCSR');
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
        if (this.context.router) { this.context.router.history.push('/quote/coverage'); }
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
          { ...props.appState.data, selectedLink: 'customerData', submitting: false }
        );
        if (this.context.router) { this.context.router.history.push('/quote/coverage'); }
      });
  };

  handleSelectPolicy = (policy, props) => {
    const workflowId = props.appState.instanceId;
    props.actions.appStateActions.setAppState(
      props.appState.modelName,
      workflowId,
      { ...props.appState.data, selectedLink: 'coverage', submitting: false }
    );
    if (this.context.router) { this.context.router.history.push('/policy/coverage'); }
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
                <div className="basic-footer">
                  <Footer />
                </div>
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
    questionsActions: PropTypes.shape(),
    cgActions: PropTypes.shape({ startWorkflow: PropTypes.func, activeTasks: PropTypes.func, completeTask: PropTypes.func }),
    appStateActions: PropTypes.shape({ setAppState: PropTypes.func, setAppStateError: PropTypes.func })
  })
};

const mapStateToProps = state => (
  {
    questions: state.questions,
    tasks: state.cg,
    appState: state.appState,
    error: state.error
  }
);

const mapDispatchToProps = dispatch => ({
  actions: {
    questionsActions: bindActionCreators(questionsActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
