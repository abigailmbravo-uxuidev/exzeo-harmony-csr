import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import BaseConnect from './Base';
import Footer from '../components/Common/Footer';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import * as questionsActions from '../actions/questionsActions';
import SearchResults from '../components/Search/SearchResults';
import NoResultsConnect from '../components/Search/NoResults';
import Loader from '../components/Common/Loader';

const workflowModelName = 'csrQuote';
const workflowData = {
  dsUrl: `${process.env.REACT_APP_API_URL}/ds`
};

export const handleNewTab = (searchData) => {
  localStorage.setItem('isNewTab', true);

  const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

  if (lastSearchData.searchType === 'agency' || lastSearchData.searchType === 'agent') {
    localStorage.setItem('agencyCode', searchData.agencyCode);
    window.open('/agency/overview', '_blank');
  }
};

export class AgencySplash extends Component {
  componentDidMount() {
    this.props.actions.cgActions.startWorkflow(workflowModelName, workflowData);
    this.props.actions.questionsActions.getUIQuestions('searchCSR');
  }


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

AgencySplash.contextTypes = {
  router: PropTypes.object
};

AgencySplash.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AgencySplash);
