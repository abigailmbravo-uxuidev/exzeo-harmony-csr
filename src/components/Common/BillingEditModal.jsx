import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Radio, Select } from '@exzeo/core-ui/lib/Input'
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';
import { updateBillPlan } from '../../state/actions/policyActions';

const FORM_NAME = 'BillingEditModal';

export const handleInitialize = (state) => {
  const { policy, billingOptions } = state.policyState;

  if (billingOptions.length === 1 && !policy.billTo && !policy.billPlan) {
    return {
      billToId: billingOptions.options[0].billToId,
      billToType: billingOptions.options[0].billToType,
      billPlan: 'Annual'
    };
  }
  return policy;
};

export const handleBillingFormSubmit = async (data, dispatch, props) => {
  const { updateBillPlan, hideBillingModal, policy } = props;
  const updateData = {
    policyNumber: policy.policyNumber,
    policyID: policy.policyID,
    transactionType: 'Bill Plan Update',
    billingStatus: 2,
    billToId: data.billToId,
    billPlan: data.billPlan,
    billToType: data.billToType
  };
  await updateBillPlan(updateData);
  await hideBillingModal();
};

export class BillingEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = { flexDirection: 'row' };
    this.billToOptions = props.billingOptions.map(option => ({ label: option.displayText, answer: option.billToId }))
  }

  normalizeBilling = (value) => {
    const { billingOptions, change } = this.props;
    const billToType = billingOptions.find(o => o.billToId === value).billToType;
    change('billPlan', 'Annual');
    change('billToType', billToType);
    return value;
  };

  getBillingOptions() {
    const { billingOptions, billToId } = this.props;
    const planOptions = billingOptions.find(option => option.billToId === billToId);
    return (planOptions || {}).payPlans || [];
  }

  render() {
    const {
      handleSubmit,
      hideBillingModal,
      submitting
    } = this.props;

    return (
      <div className="modal" style={this.modalStyle}>
        <div className="card card-billing-edit-modal">
          <form id="BillingEditModal" className="BillingEditModal" onSubmit={handleSubmit(handleBillingFormSubmit)}>
            <div className="card-header">
              <h4>Edit Billing</h4>
            </div>
            <div className="card-block">
              <Field
                name="billToId"
                dataTest="billToId"
                label="Bill To"
                normalize={this.normalizeBilling}
                component={Select}
                validate={isRequired}
                answers={this.billToOptions}
              />
              <Field
                name="billPlan"
                dataTest="billPlan"
                label="Bill Plan"
                component={Radio}
                validate={isRequired}
                answers={this.getBillingOptions()}
                segmented
              />
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button
                  tabIndex="0"
                  aria-label="reset-btn form-editBilling"
                  className="btn btn-secondary"
                  type="button"
                  onClick={hideBillingModal}
                >Cancel
                </button>
                <button
                  tabIndex="0"
                  aria-label="submit-btn form-editBilling"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

BillingEditModal.propTypes = {
  showBillingEditModalModal: propTypes.func,
  verify: propTypes.func,
  appState: propTypes.shape({
    modelName: propTypes.string,
    data: propTypes.shape({
      recalc: propTypes.bool,
      submitting: propTypes.bool
    })
  })
};

BillingEditModal.defaultProps = {
  fieldValues: {},
  billingOptions: []
};

const selector = formValueSelector(FORM_NAME);
const mapStateToProps = state => ({
  tasks: state.cg,
  selectedAI: state.appState.data.selectedAI,
  initialValues: handleInitialize(state),
  policy: state.policyState.policy,
  billToIdValue: selector(state, 'billToId')
});

BillingEditModal = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(BillingEditModal);

BillingEditModal = connect(mapStateToProps, {
  updateBillPlan
})(BillingEditModal);

export default BillingEditModal;
