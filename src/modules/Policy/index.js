import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import moment from 'moment-timezone';
import Loader from '@exzeo/core-ui/lib/Loader';

import { setAppState } from '../../state/actions/appState.actions';
import { getZipcodeSettings, getAgents, getAgency, getNotes } from '../../state/actions/service.actions';
import { createTransaction, getBillingOptionsForPolicy, getPolicy, getPaymentOptionsApplyPayments, getPaymentHistory, getCancelOptions, getEndorsementHistory } from '../../state/actions/policy.actions';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cg.actions';

import EditEffectiveDataPopUp from '../../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyPopup from '../../components/Policy/ReinstatePolicyPopup';
import Coverage from '../../components/Policy/Coverage';
import PolicyHolder from '../../components/Policy/PolicyholderAgent';
import Billing from '../../components/Policy/MortgageBilling';
import Notes from '../../components/Policy/NotesFiles';
import Cancel from '../../components/Policy/Cancel';
import Endorsements from '../../components/Policy/Endorsements';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import App from '../../components/AppWrapper';
import DiaryPolling from '../../components/DiaryPolling';

export class Policy extends React.Component {
  state = {
    showDiaries: false
  };
  // TODO: next step is to make an 'initialize' action that does all of this. Then this component will only need to know about one action.
  componentDidMount() {
    const {
      getCancelOptions,
      getPolicy,
      getPaymentHistory,
      getPaymentOptionsApplyPayments,
      getEndorsementHistory,
      match: { params: { policyNumber } }
    } = this.props;
    getPolicy(policyNumber);
    getPaymentHistory(policyNumber);
    getPaymentOptionsApplyPayments();
    getCancelOptions();
    getEndorsementHistory(policyNumber);
  }

  componentDidUpdate(prevProps) {
    const { policy: prevPolicy } = prevProps;
    const {
      getAgents,
      getAgency,
      getBillingOptionsForPolicy,
      getNotes,
      getZipCodeSettings,
      policy,
      summaryLedger
    } = this.props;

    if (prevPolicy !== policy && !!policy) {
      getZipCodeSettings(policy.companyCode, policy.state, policy.product, policy.property.physicalAddress.zip);
      getAgents(policy.companyCode, policy.state);
      getAgency(policy.companyCode, policy.state, policy.agencyCode);
      getNotes(policy.policyNumber, policy.sourceNumber);

      if (summaryLedger) {
        const paymentOptions = {
          effectiveDate: policy.effectiveDate,
          policyHolders: policy.policyHolders,
          additionalInterests: policy.additionalInterests,
          fullyEarnedFees: policy.rating.worksheet.fees.empTrustFee + policy.rating.worksheet.fees.mgaPolicyFee,
          currentPremium: summaryLedger.currentPremium
        };
        getBillingOptionsForPolicy(paymentOptions);
      }
    }
  }

  handleToggleDiaries = () => {
    this.setState({ showDiaries: !this.state.showDiaries });
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
      initialized
    } = this.props;

    const { showDiaries } = this.state;

    return (
      <div className="app-wrapper csr policy">

        {(appState.data.submitting || !initialized) &&
          <Loader />
        }
        <App
          resourceType="Policy"
          resourceId={policy.policyNumber}
          pageTitle={`P: ${policy.policyNumber || ''}`}
          match={match}
          onToggleDiaries={this.handleToggleDiaries}
          showDiaries={showDiaries}
          render={() => (
            <React.Fragment>
              {initialized &&
                <div className="content-wrapper">
                  <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} />} />
                  <Route exact path={`${match.url}/policyholder`} render={props => <PolicyHolder {...props} />} />
                  <Route exact path={`${match.url}/billing`} render={props => <Billing {...props} />} />
                  <Route exact path={`${match.url}/notes`} render={props => <Notes {...props} params={match.params} />} />
                  <Route exact path={`${match.url}/cancel`} render={props => <Cancel {...props} />} />
                  <Route exact path={`${match.url}/endorsements`} render={props => <Endorsements {...props} params={match.params} />} />
                </div>
              }

              {initialized &&
                <DiaryPolling filter={{ resourceId: [policy.policyNumber, policy.sourceId], resourceType: 'Policy' }} />
              }

              {appState.data.showReinstatePolicyPopUp &&
                <ReinstatePolicyPopup
                  reinstatePolicySubmit={this.reinstatePolicySubmit}
                  hideReinstatePolicyModal={this.hideReinstatePolicyPopUp} />
              }

              {appState.data.showEffectiveDateChangePopUp &&
              <EditEffectiveDataPopUp
                changeEffectiveDateSubmit={this.changeEffectiveDate}
                hideEffectiveDateModal={this.hideEffectiveDatePopUp} />
          }
              <OpenDiariesBar
                resourceId={policy.policyNumber}
                resourceType="Policy" />
            </React.Fragment>
        )} />

      </div>
    );
  }
}

Policy.propTypes = {
  appState: PropTypes.object,
  authState: PropTypes.object,
  fetchDiariesAction: PropTypes.func,
  initialized: PropTypes.bool,
  policy: PropTypes.object,
  summaryLedger: PropTypes.object,
  zipCodeSettings: PropTypes.object,
  batchCompleteTask: PropTypes.func,
  createTransaction: PropTypes.func,
  getCancelOptions: PropTypes.func,
  getEndorsementHistory: PropTypes.func,
  getNotes: PropTypes.func,
  getPaymentHistory: PropTypes.func,
  getPaymentOptionsApplyPayments: PropTypes.func,
  getPolicy: PropTypes.func,
  getZipCodeSettings: PropTypes.func,
  setAppState: PropTypes.func,
  startWorkflow: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    appState: state.appState,
    authState: state.authState,
    initialized: !!(state.policyState.policy.policyID && state.policyState.summaryLedger._id),
    policy: state.policyState.policy,
    summaryLedger: state.policyState.summaryLedger,
    zipCodeSettings: state.service.getZipcodeSettings
  };
};

export default connect(mapStateToProps, {
  batchCompleteTask,
  createTransaction,
  getAgents,
  getAgency,
  getBillingOptionsForPolicy,
  getCancelOptions,
  getEndorsementHistory,
  getNotes,
  getPaymentHistory,
  getPaymentOptionsApplyPayments,
  getPolicy,
  getZipCodeSettings: getZipcodeSettings,
  setAppState,
  startWorkflow
})(Policy);
