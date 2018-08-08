import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet';
import Loader from '@exzeo/core-ui/lib/Loader';

import { setAppState } from '../../state/actions/appStateActions';
import { getZipcodeSettings, getAgents, getAgency, getNotes } from '../../state/actions/serviceActions';
import { createTransaction, getBillingOptionsForPolicy, getPolicy, getPaymentOptionsApplyPayments, getPaymentHistory, getCancelOptions, getEndorsementHistory } from '../../state/actions/policyActions';
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
  // TODO: next step is to make an 'initialize' action that does all of this. Then this component will only need to know about one action.
  componentDidMount() {
    const {
      getCancelOptions,
      getNotes,
      getPolicy,
      getPaymentHistory,
      getPaymentOptionsApplyPayments,
      getEndorsementHistory,
      match: { params: { policyNumber } }
    } = this.props;
    getPolicy(policyNumber);
    getPaymentHistory(policyNumber);
    getPaymentOptionsApplyPayments();
    getNotes(policyNumber, policyNumber);
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

      const ids = [policy.policyNumber, policy.sourceNumber];
      getNotes(ids.toString(), policy.policyNumber);

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

    return (
      <div className="app-wrapper csr policy">

        {(appState.data.submitting || !initialized) &&
          <Loader />
        }

        <Helmet><title>{policy && policy.policyNumber ? `P: ${policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
        <PolicyHeader />
        <PolicyDetailHeader />
        <main role="document">
          <aside className="content-panel-left">
            <PolicySideNav match={match} />
          </aside>

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
  appState: PropTypes.object,
  initialized: PropTypes.bool,
  policy: PropTypes.object,
  summaryLedger: PropTypes.object,
  tasks: PropTypes.object,
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

const mapStateToProps = ({
  appState, cg, policyState, service
}) => ({
  appState,
  initialized: !!(policyState.policy.policyID && policyState.summaryLedger._id),
  policy: policyState.policy,
  summaryLedger: policyState.summaryLedger,
  tasks: cg,
  zipCodeSettings: service.getZipcodeSettings
});

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
