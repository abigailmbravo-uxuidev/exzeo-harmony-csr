import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment-timezone';
import { Helmet } from 'react-helmet';
import PolicyHeader from '../components/Policy/PolicyHeader';
import QuoteSideNav from '../components/Policy/PolicySideNav';
import PolicyDetailHeader from '../components/Policy/DetailHeader';
import Loader from '../components/Common/Loader';
import * as appStateActions from '../actions/appStateActions';
import * as serviceActions from '../actions/serviceActions';
import * as policyStateActions from '../actions/policyStateActions';
import EditEffectiveDataPopUp from '../components/Policy/EditEffectiveDatePopup';
import ReinstatePolicyPopup from '../components/Policy/ReinstatePolicyPopup';

export const hideEffectiveDatePopUp = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showEffectiveDateChangePopUp: false });
};

export const showEffectiveDatePopUp = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showEffectiveDateChangePopUp: true });
};

export const hideReinstatePolicyPopUp = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showReinstatePolicyPopUp: false });
};

export const reinstatePolicySubmit = (data, dispatch, props) => {

}

export const changeEffectiveDate = (data, dispatch, props) => {
  const effectiveDateUTC = moment.tz(moment.utc(data.effectiveDate).format('YYYY-MM-DD'), props.zipCodeSetting.timezone).format();
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: true });

  props.actions.cgActions.startWorkflow('effectiveDateChangeModel', { policyNumber: props.policy.policyNumber, policyID: props.policy.policyID }).then((result) => {
    const steps = [{
      name: 'saveEffectiveDate',
      data: { policyNumber: props.policy.policyNumber, policyID: props.policy.policyID, effectiveDateChangeReason: data.effectiveDateChangeReason, effectiveDate: effectiveDateUTC }
    }];
    const startResult = result.payload ? result.payload[0].workflowData.effectiveDateChangeModel.data : {};

    props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, submitting: true });

    props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
      props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, submitting: false, showEffectiveDateChangePopUp: false });
      props.actions.policyStateActions.updatePolicy(true, props.policy.policyNumber);
    });
  });
};

export class Policy extends React.Component {

  componentDidMount() {
    if (this.props && this.props.policy && this.props.policy.policyNumber) {
      this.props.actions.serviceActions.getZipcodeSettings(this.props.policy.companyCode, this.props.policy.state, this.props.policy.product, this.props.policy.property.physicalAddress.zip);
    }
  }

  render() {
    const { policy, appState, children } = this.props;
    return (
      <div className="app-wrapper csr policy">
        {/* TODO: dynamically add policy # to title*/}
        <Helmet><title>{policy && policy.policyNumber ? `P: ${policy.policyNumber}` : 'Harmony - CSR Portal'}</title></Helmet>
        {/* <NewNoteFileUploader/>*/}
        <PolicyHeader />
        <PolicyDetailHeader />
        <main role="document">
          {appState.data.submitting && <Loader />}
          <aside className="content-panel-left">
            <QuoteSideNav />
          </aside>
          <div className="content-wrapper">
            {children}
          </div>
          {appState.data.showReinstatePolicyPopUp && <ReinstatePolicyPopup {...this.props} reinstatePolicySubmit={reinstatePolicySubmit} hideReinstatePolicyModal={() => hideReinstatePolicyPopUp(this.props)} />}
          {appState.data.showEffectiveDateChangePopUp && <EditEffectiveDataPopUp {...this.props} changeEffectiveDateSubmit={changeEffectiveDate} hideEffectiveDateModal={() => hideEffectiveDatePopUp(this.props)} />}
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
  policyState: state.policy,
  tasks: state.cg,
  appState: state.appState,
  summaryLedger: state.service.getSummaryLedger,
  policy: state.service.latestPolicy || {},
  zipCodeSetting: state.service.getZipcodeSettings
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Policy);
