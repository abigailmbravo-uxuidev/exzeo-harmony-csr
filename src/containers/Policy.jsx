import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet';
import Loader from '@exzeo/core-ui/lib/Loader';
import { setAppState } from '../state/actions/appStateActions';
import { getZipcodeSettings } from '../state/actions/serviceActions';
import { getPolicy, createTransaction } from '../state/actions/policyActions';
import { startWorkflow, batchCompleteTask } from '../state/actions/cgActions';
import EditEffectiveDataPopUp from '../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyPopup from '../components/Policy/ReinstatePolicyPopup';
import PolicyDetailHeader from '../components/Policy/DetailHeader';
import PolicySideNav from '../components/Policy/PolicySideNav';
import PolicyHeader from '../components/Policy/PolicyHeader';

export class Policy extends React.Component {
  componentWillReceiveProps() {
    if (!this.props.zipcodeSettings && this.props && this.props.policy && this.props.policy.policyNumber) {
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
    const { zipcodeSettings, appState, policy, setAppState, batchCompleteTask, getPolicy, startWorkflow  } = this.props;
    const effectiveDateUTC = moment.tz(moment.utc(data.effectiveDate).format('YYYY-MM-DD'), zipcodeSettings.timezone).format();
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
    setAppState(
      appState.modelName, appState.instanceId,
      { ...appState.data, showReinstatePolicyPopUp: false, submitting: false }
    );
  };

  reinstatePolicySubmit = (data) => {
    const { setAppState, appState, policy, summaryLedger, createTransaction, getPolicy } = this.props;
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
    const { policy, appState, children } = this.props;
    return (
      <div className="app-wrapper csr policy">
        {/* TODO: dynamically add policy # to title */}
        <Helmet><title>{policy && policy.policyNumber ? `P: ${policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
        {/* <NewNoteFileUploader/> */}
        <PolicyHeader />
        <PolicyDetailHeader />
        <main role="document">
          {appState.data.submitting && <Loader />}
          <aside className="content-panel-left">
            <PolicySideNav />
          </aside>
          <div className="content-wrapper">
            {children}
          </div>

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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  appState: state.appState,
  policy: state.policyState.policy,
  summaryLedger: state.policyState.summaryLedger,
  tasks: state.cg,
  zipcodeSettings: state.service.getZipcodeSettings
});

export default connect(mapStateToProps, {
  setAppState,
  createTransaction,
  getZipcodeSettings,
  getPolicy,
  startWorkflow,
  batchCompleteTask
})(Policy);
