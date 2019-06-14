import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import moment from 'moment-timezone';
import { Loader } from '@exzeo/core-ui';

import { setAppState } from '../../state/actions/appState.actions';
import { getZipcodeSettings, getAgents, getAgency } from '../../state/actions/service.actions';
import { fetchNotes } from '../../state/actions/notes.actions';

import { 
  createTransaction, 
  getBillingOptionsForPolicy, 
  getEffectiveDateChangeReasons,
  getPolicy, 
  getPaymentOptionsApplyPayments, 
  getPaymentHistory, 
  getCancelOptions, 
  getEndorsementHistory 
} from '../../state/actions/policy.actions';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cg.actions';

import EditEffectiveDataModal from '../../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyModal from '../../components/Policy/ReinstatePolicyPopup';
import Coverage from '../../components/Policy/Coverage';
import PolicyHolder from '../../components/Policy/PolicyholderAgent';
import Billing from '../../components/Policy/MortgageBilling';
import Notes from '../../components/Notes';
import Cancel from '../../components/Policy/Cancel';
import Endorsements from '../../components/Policy/Endorsements';
import OpenDiariesBar from '../../components/OpenDiariesBar';
import App from '../../components/AppWrapper';
import DiaryPolling from '../../components/DiaryPolling';

export class Policy extends React.Component {
  state = {
    showDiaries: false,
    showReinstatePolicyModal: false,
    showEffectiveDateChangeModal: false
  };
  // TODO: next step is to make an 'initialize' action that does all of this. Then this component will only need to know about one action.
  componentDidMount() {
    const {
      getEffectiveDateChangeReasons,
      getCancelOptions,
      getPolicy,
      getPaymentHistory,
      getPaymentOptionsApplyPayments,
      getEndorsementHistory,
      match: { params: { policyNumber } }
    } = this.props;
    getEffectiveDateChangeReasons();
    getPolicy(policyNumber);
    getPaymentHistory(policyNumber);
    getPaymentOptionsApplyPayments();
    getCancelOptions();
    getEndorsementHistory(policyNumber);
  }

  componentDidUpdate(prevProps) {
    const { policy: prevPolicy } = prevProps;
    const {
      getAgency,
      getBillingOptionsForPolicy,
      getZipCodeSettings,
      policy,
      summaryLedger
    } = this.props;

    if (prevPolicy !== policy && !!policy) {
      getZipCodeSettings(policy.companyCode, policy.state, policy.product, policy.property.physicalAddress.zip);
      getAgents(policy.companyCode, policy.state);
      getAgency(policy.companyCode, policy.state, policy.agencyCode);
      fetchNotes([policy.policyNumber, policy.sourceNumber], 'policyNumber');

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
    this.setState(state => ({
      showDiaries: !state.showDiaries
      }));  
  }

  handleToggleReinstateModal = () => {
    this.setState(state => ({
      showReinstatePolicyModal: !state.showReinstatePolicyModal
      }));  
  }

  handleToggleEffectiveDateChangeModal = () => {
    this.setState(state => ({
      showEffectiveDateChangeModal: !state.showEffectiveDateChangeModal
      }));  
  }

  changeEffectiveDate = async (data) => {
    const {
      zipCodeSettings,
      policy,
      batchCompleteTask,
      getPolicy,
      startWorkflow
    } = this.props;

    const effectiveDateUTC = moment.tz(moment.utc(data.effectiveDate).format('YYYY-MM-DD'), zipCodeSettings.timezone).format();

    const result = await startWorkflow('effectiveDateChangeModel', { policyNumber: policy.policyNumber, policyID: policy.policyID });

    const steps = [{
      name: 'saveEffectiveDate',
      data: {
        policyNumber: policy.policyNumber, policyID: policy.policyID, effectiveDateChangeReason: data.effectiveDateChangeReason, effectiveDate: effectiveDateUTC
      }
    }];
    const startResult = result.payload ? result.payload[0].workflowData.effectiveDateChangeModel.data : {};

    await batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps);
    //This gets scheduled so the status may not be changed yet when calling getPolicy. Reference HAR-5228
    await new Promise(resolve => setTimeout(resolve, 3000));
    await getPolicy(policy.policyNumber);
    this.handleToggleEffectiveDateChangeModal();

  };

  reinstatePolicySubmit = async (data) => {
    const {
      policy,
      summaryLedger,
      createTransaction,
      getPolicy
    } = this.props;

    const submitData = {
      policyID: policy.policyID,
      policyNumber: policy.policyNumber,
      billingStatus: summaryLedger.status.code,
      transactionType: 'Reinstatement'
    };
    await createTransaction(submitData);
    await getPolicy(policy.policyNumber);
    this.handleToggleReinstateModal();

  };

  render() {
    const {
      appState,
      match,
      policy,
      initialized
    } = this.props;

    const { showDiaries, showReinstatePolicyModal, showEffectiveDateChangeModal } = this.state;
    const modalHandlers = {
      showEffectiveDateChangeModal: this.handleToggleEffectiveDateChangeModal,
      showReinstatePolicyModal: this.handleToggleReinstateModal
    };
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
          context={match.path.split('/')[1]}
          onToggleDiaries={this.handleToggleDiaries}
          showDiaries={showDiaries}
          modalHandlers={modalHandlers}
          header={{
            fields: [
              { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
              { value: 'mailingAddress', component: 'Section' },
              { value: 'propertyAddress', component: 'Section' },
              { value: 'county', label: 'Property County' },
              { value: 'territory' },
              { value: 'constructionType' },
              { value: 'effectiveDate' },
              { value: 'cancellation' },
              { value: 'finalPayment', label: 'Final Payment' },
              { value: 'currentPremium', className:'premium' }
            ]
          }}
          render={() => (
            <React.Fragment>
              {initialized &&
                <div className="content-wrapper">
                  <Route exact path={`${match.url}/coverage`} render={props => <Coverage {...props} />} />
                  <Route exact path={`${match.url}/policyholder`} render={props => <PolicyHolder {...props} />} />
                  <Route exact path={`${match.url}/billing`} render={props => <Billing {...props} />} />
                  <Route exact path={`${match.url}/notes`} render={props => <Notes numbers={[policy.policyNumber, policy.sourceNumber]} numberType="policyNumber" />} />
                  <Route exact path={`${match.url}/cancel`} render={props => <Cancel {...props} />} />
                  <Route exact path={`${match.url}/endorsements`} render={props => <Endorsements {...props} params={match.params} />} />
                </div>
              }

              {initialized &&
                <DiaryPolling filter={{ resourceId: [policy.policyNumber, policy.sourceNumber], resourceType: 'Policy' }} />
              }

              {showReinstatePolicyModal &&
                <ReinstatePolicyModal
                  reinstatePolicySubmit={this.reinstatePolicySubmit}
                  hideReinstatePolicyModal={this.handleToggleReinstateModal} />
              }

              {showEffectiveDateChangeModal &&
              <EditEffectiveDataModal
                changeEffectiveDateSubmit={this.changeEffectiveDate}
                hideEffectiveDateModal={this.handleToggleEffectiveDateChangeModal} />
          }
              <OpenDiariesBar
                entityEndDate={policy.endDate}
                effectiveDate={policy.effectiveDate}
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
  getEffectiveDateChangeReasons,
  getBillingOptionsForPolicy,
  getCancelOptions,
  getEndorsementHistory,
  getPaymentHistory,
  getPaymentOptionsApplyPayments,
  getPolicy,
  getZipCodeSettings: getZipcodeSettings,
  setAppState,
  startWorkflow
})(Policy);
