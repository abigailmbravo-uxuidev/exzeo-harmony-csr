import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet';
import Loader from '@exzeo/core-ui/lib/Loader';

import { setAppState } from '../../state/actions/appStateActions';
import { getZipcodeSettings } from '../../state/actions/serviceActions';
import { getPolicy, createTransaction } from '../../state/actions/policyActions';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cgActions';

import EditEffectiveDataPopUp from '../../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyPopup from '../../components/Policy/ReinstatePolicyPopup';
import PolicyDetailHeader from '../../components/Policy/DetailHeader';
import PolicySideNav from '../../components/Policy/PolicySideNav';
import PolicyHeader from '../../components/Policy/PolicyHeader';
import Coverage from '../../components/Policy/Coverage';
import PolicyHolder from '../../components/Policy/PolicyholderAgent';
import Billing from '../../components/Policy/MortgageBilling';
import Notes from '../../components/Policy/NotesFiles';
import Cancel from '../../components/Policy/Cancel';
import Endorsements from '../../components/Policy/Endorsements';

export class Policy extends React.Component {
  componentDidMount() {
    const { policy, match, getPolicy } = this.props;
    if (!policy || !policy.policyNumber) {
      getPolicy(match.params.policyNumber)
    }
  }

  componentWillReceiveProps() {
    if (!this.props.zipCodeSettings && this.props && this.props.policy && this.props.policy.policyNumber) {
      this.props.getZipcodeSettings(this.props.policy.companyCode, this.props.policy.state, this.props.policy.product, this.props.policy.property.physicalAddress.zip);
    }
  }

  hideEffectiveDatePopUp = () => {
    const { appState, setAppState } = this.props;

    setAppState(
      appState.modelName, appState.instanceId,
      { ...appState.data, showEffectiveDateChangePopUp: false }
    );
  };

  changeEffectiveDate = (data) => {
    const {
      zipCodeSettings,
      appState,
      policy,
      setAppState,
      batchCompleteTask,
      getPolicy,
      startWorkflow
    } = this.props;

    const effectiveDateUTC = moment.tz(moment.utc(data.effectiveDate).format('YYYY-MM-DD'), zipCodeSettings.timezone).format();
    const workflowId = appState.instanceId;
    setAppState(appState.modelName, workflowId, { ...appState.data, isSubmitting: true });

    startWorkflow('effectiveDateChangeModel', { policyNumber: policy.policyNumber, policyID: policy.policyID }).then((result) => {
      const steps = [{
        name: 'saveEffectiveDate',
        data: {
          policyNumber: policy.policyNumber, policyID: policy.policyID, effectiveDateChangeReason: data.effectiveDateChangeReason, effectiveDate: effectiveDateUTC
        }
      }];
      const startResult = result.payload ? result.payload[0].workflowData.effectiveDateChangeModel.data : {};

      setAppState(startResult.modelName, startResult.modelInstanceId, { ...appState.data, submitting: true });

      batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
        setAppState(startResult.modelName, startResult.modelInstanceId, { ...appState.data, submitting: false, showEffectiveDateChangePopUp: false });
        getPolicy(policy.policyNumber);
      });
    });
  };

  showEffectiveDatePopUp = () => {
    const { setAppState, appState } = this.props;

    setAppState(
      appState.modelName, appState.instanceId,
      { ...appState.data, showEffectiveDateChangePopUp: true }
    );
  };

  hideReinstatePolicyPopUp = () => {
    const { setAppState, appState } = this.props;
    setAppState(appState.modelName, appState.instanceId, { ...appState.data, showReinstatePolicyPopUp: false, submitting: false });
  };

  reinstatePolicySubmit = (data) => {
    const {
      setAppState,
      appState,
      policy,
      summaryLedger,
      createTransaction,
      getPolicy
    } = this.props;
    setAppState(appState.modelName, appState.instanceId, { ...appState.data, submitting: true });

    const submitData = {
      policyID: policy.policyID,
      policyNumber: policy.policyNumber,
      billingStatus: summaryLedger.status.code,
      transactionType: 'Reinstatement'
    };
    createTransaction(submitData).then(() => {
      this.hideReinstatePolicyPopUp();
      getPolicy(policy.policyNumber);
    });
  };

  render() {
    const {
      appState,
      match,
      policy,
    } = this.props;
    const policyExistsAndIsAvailable = policy && policy.policyNumber;

    return (
      <div className="app-wrapper csr policy">
        {(appState.data.submitting || !policyExistsAndIsAvailable) && <Loader />}
        <Helmet><title>{policy && policy.policyNumber ? `P: ${policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
        <PolicyHeader />
        <PolicyDetailHeader />
        <main role="document">
          <aside className="content-panel-left">
            <PolicySideNav />
          </aside>

          {policyExistsAndIsAvailable &&
            <div className="content-wrapper">
              <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} />} />
              <Route exact path={`${match.url}/policyholder`} render={props => <PolicyHolder {...props} />} />
              <Route exact path={`${match.url}/billing`} render={props => <Billing {...props} />}/>
              <Route exact path={`${match.url}/notes`} render={props => <Notes {...props} params={match.params} />} />
              <Route exact path={`${match.url}/cancel`} render={props => <Cancel {...props} />} />
              <Route exact path={`${match.url}/endorsements`} render={props => <Endorsements {...props} params={match.params}/>}/>
            </div>
          }

          {appState.data.showReinstatePolicyPopUp &&
          <ReinstatePolicyPopup
            reinstatePolicySubmit={this.reinstatePolicySubmit}
            hideReinstatePolicyModal={this.hideReinstatePolicyPopUp}
          />
          }

          {appState.data.showEffectiveDateChangePopUp &&
          <EditEffectiveDataPopUp
            changeEffectiveDateSubmit={this.changeEffectiveDate}
            hideEffectiveDateModal={this.hideEffectiveDatePopUp}
          />
          }
        </main>
      </div>
    );
  }
}

Policy.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  appState: state.appState,
  policy: state.policyState.policy,
  summaryLedger: state.policyState.summaryLedger,
  tasks: state.cg,
  zipCodeSettings: state.service.getZipcodeSettings
});

export default connect(mapStateToProps, {
  setAppState,
  createTransaction,
  getZipcodeSettings,
  getPolicy,
  startWorkflow,
  batchCompleteTask
})(Policy);
