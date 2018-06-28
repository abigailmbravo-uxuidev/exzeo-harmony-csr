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

export const hideEffectiveDatePopUp = (props) => {
  props.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showEffectiveDateChangePopUp: false }
  );
};

export const showEffectiveDatePopUp = (props) => {
  props.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showEffectiveDateChangePopUp: true }
  );
};

export const hideReinstatePolicyPopUp = (props) => {
  props.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showReinstatePolicyPopUp: false, submitting: false }
  );
};

export const reinstatePolicySubmit = (data, dispatch, props) => {
  props.setAppState(props.appState.modelName, props.appState.instanceId, { ...props.appState.data, submitting: true });

  const { policy, summaryLedger } = props;
  const submitData = {
    policyID: policy.policyID,
    policyNumber: policy.policyNumber,
    billingStatus: summaryLedger.status.code,
    transactionType: 'Reinstatement'
  };
  props.createTransaction(submitData).then(() => {
    hideReinstatePolicyPopUp(props);
    props.getPolicy(policy.policyNumber);
  });
};

export const changeEffectiveDate = (data, dispatch, props) => {
  const effectiveDateUTC = moment.tz(moment.utc(data.effectiveDate).format('YYYY-MM-DD'), props.zipcodeSettings.timezone).format();
  const workflowId = props.appState.instanceId;
  props.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: true });

  props.startWorkflow('effectiveDateChangeModel', { policyNumber: props.policy.policyNumber, policyID: props.policy.policyID }).then((result) => {
    const steps = [{
      name: 'saveEffectiveDate',
      data: {
        policyNumber: props.policy.policyNumber, policyID: props.policy.policyID, effectiveDateChangeReason: data.effectiveDateChangeReason, effectiveDate: effectiveDateUTC
      }
    }];
    const startResult = result.payload ? result.payload[0].workflowData.effectiveDateChangeModel.data : {};

    props.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, submitting: true });

    props.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
      props.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, submitting: false, showEffectiveDateChangePopUp: false });
      props.getPolicy(props.policy.policyNumber);
    });
  });
};

export class Policy extends React.Component {
  componentWillReceiveProps() {
    if (!this.props.zipcodeSettings && this.props && this.props.policy && this.props.policy.policyNumber) {
      this.props.getZipcodeSettings(this.props.policy.companyCode, this.props.policy.state, this.props.policy.product, this.props.policy.property.physicalAddress.zip);
    }
  }

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
              {...this.props}
              reinstatePolicySubmit={reinstatePolicySubmit}
              hideReinstatePolicyModal={() => hideReinstatePolicyPopUp(this.props)}
            />}
          {appState.data.showEffectiveDateChangePopUp &&
            <EditEffectiveDataPopUp
              changeEffectiveDateSubmit={changeEffectiveDate}
              hideEffectiveDateModal={() => hideEffectiveDatePopUp(this.props)}
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
