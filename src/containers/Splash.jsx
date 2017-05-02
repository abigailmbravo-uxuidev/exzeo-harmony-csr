import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import SearchBar from '../components/Search/SearchBar';
import SearchResults from '../components/Search/SearchResults';
import NoResultsConnect from '../components/Search/NoResults';

const data = [
  {
    type: 'quote',
    number: '12-123456',
    policyHolder: 'William McWilliamson',
    address: '123 NE 132ND TER, GAINESVILLE, FL 32641',
    status: 'STATUS',
    effectiveDate: '01/01/2018'
  }, {
    type: 'address',
    number: '--',
    policyHolder: '--',
    address: '123 NE 17 AVE, FT. LAUDERDALE, FL 33301',
    status: '--',
    effectiveDate: '--'
  }, {
    type: 'quote',
    number: '12-123458',
    policyHolder: 'Michelle Kleinfelterson',
    address: '123 NE 9 AVE, DEERFIELD BEACH, FL 33441',
    status: 'STATUS',
    effectiveDate: '11/01/2017'
  }
];

const workflowModelName = 'csrQuote';

export class Splash extends Component {

  componentDidMount() {
    this.props.actions.cgActions.startWorkflow(workflowModelName, {});
  }

  handleSelectAddress = (address, props) => {
    const workflowId = props.appState.instanceId;
    const taskName = 'chooseAddress';
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

    const steps = [
      {
        name: 'chooseAddress',
        data: submitData
      }
    ];

    props.actions.cgActions.batchCompleteTask(props.appState.modelName, workflowId, steps).then(() => {
      // now update the workflow details so the recalculated rate shows
      props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, {
        recalc: false,
        updateWorkflowDetails: true
      });
      this.context.router.history.push('/quote');
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
                {/*
                <div className="grid-controls">
                  <nav className="tabs">
                    <a href="" className="btn btn-link">Recently Viewed</a>
                    <a href="" className="btn btn-link selected">Search Results</a>
                  </nav>
                  <div className="filters-wrapper">
                    <div className="filters">
                      <a href="/" className="btn btn-sm selected">All</a>
                      <a href="/quote" className="btn btn-sm">Quotes</a>
                      <a href="/policy" className="btn btn-sm">Policies</a>
                    </div>
                    <div className="filters">
                      <a className="btn btn-sm selected"><i className="fa fa-list-ul" /></a>
                      <a className="btn btn-sm"><i className="fa fa-table" /></a>
                    </div>
                  </div>
                </div>
                <div className="table-view">
                   <BootstrapTable className="results-grid" data={data} striped hover>
                    <TableHeaderColumn isKey dataField="type" className="type" columnClassName="type" dataSort>Type</TableHeaderColumn>
                    <TableHeaderColumn dataField="number" className="number" columnClassName="number" dataSort>Number</TableHeaderColumn>
                    <TableHeaderColumn dataField="policyHolder" className="policyholder" columnClassName="policyholder" dataSort>Policyholder</TableHeaderColumn>
                    <TableHeaderColumn dataField="address" className="address" columnClassName="address" dataSort>Address</TableHeaderColumn>
                    <TableHeaderColumn dataField="status" className="status" columnClassName="status" dataSort>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField="effectiveDate" className="effectiveDate" columnClassName="effectiveDate" dataSort>Effective Date</TableHeaderColumn>
                  </BootstrapTable>
                </div>
                */}
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
