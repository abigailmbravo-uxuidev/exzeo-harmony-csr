import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import SearchBar from '../components/Search/SearchBar';
import SearchResults from '../components/Search/SearchResults';
import NoResultsConnect from '../components/Search/NoResults';

const workflowModelName = 'csrQuote';

export class Splash extends Component {

  componentDidMount() {
    this.props.actions.cgActions.startWorkflow(workflowModelName, {});
  }

  handleSelectAddress = (address, props) => {
    const workflowId = props.appState.instanceId;
    const submitData = {
      igdId: address.id,
      stateCode: address.physicalAddress.state
    };

    // const steps = [{
    //   name: 'chooseAddress',
    //   data: submitData
    // }, {
    //   name: 'moveTo',
    //   data: { key: 'customerData' }
    // }];

    const steps = [{
      name: 'chooseAddress',
      data: submitData
    }];

    props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps)
      .then(() => {
        // now update the workflow details so the recalculated rate shows
        props.actions.appStateActions.setAppState(
          props.appState.modelName,
          workflowId, 
          { recalc: false, updateWorkflowDetails: true }
        );
        this.context.router.history.push('/quote/coverage');
      });
  };

  render() {
    return (
      <BaseConnect>
        <Helmet>
          <title>Harmony - CSR Portal</title>
        </Helmet>
        <ClearErrorConnect/>
        <div className="dashboard" role="article">
          <div className="route">
            <div className="search route-content">
              <SearchBar/>
              <div className="survey-wrapper scroll">
                <div className="results-wrapper">
                  <NoResultsConnect/>
                  <SearchResults handleSelectAddress={this.handleSelectAddress}/>
                </div>
                <Footer/>
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
    cgActions: PropTypes.shape({startWorkflow: PropTypes.func, activeTasks: PropTypes.func, completeTask: PropTypes.func}),
    appStateActions: PropTypes.shape({setAppState: PropTypes.func, setAppStateError: PropTypes.func})
  }),
  tasks: PropTypes.shape({activeTask: PropTypes.object})
};

const mapStateToProps = state => ({tasks: state.cg, appState: state.appState});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
