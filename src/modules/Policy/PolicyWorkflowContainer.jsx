import { connect } from 'react-redux';

import { setAppError } from '../../state/actions/error.actions';
import { getEnumsForPolicyWorkflow } from '../../state/actions/list.actions';
import {
  createTransaction,
  getPolicy,
  initializePolicyWorkflow,
  transferAOR,
  updateBillPlan,
  updatePolicy,
  getClaims
} from '../../state/actions/policy.actions';
import { setNotesSynced, toggleNote } from '../../state/actions/ui.actions';
import {
  getPolicyEffectiveDateReasons,
  getPolicyFormData
} from '../../state/selectors/policy.selectors';

import PolicyWorkflow from './PolicyWorkflow';

const mapStateToProps = state => {
  return {
    cancelOptions: state.policyState.cancelOptions,
    claims: state.policyState.claims,
    effectiveDateReasons: getPolicyEffectiveDateReasons(state),
    initialized: !!(
      state.policyState.policy.policyNumber &&
      state.policyState.summaryLedger._id
    ),
    isLoading: state.ui.isLoading,
    notesSynced: state.ui.notesSynced,
    options: state.list,
    policy: state.policyState.policy,
    policyFormData: getPolicyFormData(state),
    summaryLedger: state.policyState.summaryLedger,
    zipCodeSettings: state.service.getZipcodeSettings || {}
  };
};

export default connect(mapStateToProps, {
  createTransaction,
  getClaims,
  getPolicy,
  getEnumsForPolicyWorkflow,
  initializePolicyWorkflow,
  setAppError,
  transferAOR,
  updatePolicy,
  updateBillPlan,
  setNotesSynced,
  toggleNote
})(PolicyWorkflow);
