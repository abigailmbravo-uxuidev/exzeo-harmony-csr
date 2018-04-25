import React from 'react';
import PropTypes from 'prop-types';
import { batchActions } from 'redux-batched-actions';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change, getFormValues } from 'redux-form';
import { RadioFieldBilling, SelectField } from '../Form/inputs';
import { updateBillPlan } from '../../actions/serviceActions';
import 'react-select/dist/react-select.css';

export const handleInitialize = (state) => {
  const { billingOptions, latestPolicy } = state.service;

  if (billingOptions && billingOptions.options && billingOptions.options.length === 1 && !latestPolicy.billTo && !latestPolicy.billPlan) {
    return {
      billToId: billingOptions.options[0].billToId,
      billToType: billingOptions.options[0].billToType,
      billPlan: 'Annual'
    };
  }
  return state.service.latestPolicy;
};

export const handleBillingFormSubmit = async (data, dispatch, props) => {
  const { updateBillPlan, hideBillingModal, policy } = props;
  const updateData = {
    policyNumber: policy.policyNumber,
    policyID: policy.policyID,
    transactionType: 'Bill Plan Update',
    billingStatus: 2,
    ...data
  };
  await updateBillPlan(updateData);
  await hideBillingModal(props);
};

export const setFormValues = (options, billToId, billplan, dispatch) => {
  const currentPaymentPlan = options.find(option => option.billToId === billToId);
  if (currentPaymentPlan) {
    dispatch(batchActions([
      change('BillingEditModal', 'billToId', currentPaymentPlan.billToId),
      change('BillingEditModal', 'billToType', currentPaymentPlan.billToType),
      change('BillingEditModal', 'billPlan', billplan)
    ]));
  }
};

export const selectBillPlan = (value, props) => {
  const { billingOptions, dispatch, fieldValues } = props;
  setFormValues(billingOptions.options, fieldValues.billToId, value, dispatch);
};

export const BillingEditModal = (props) => {
  const {
    appState,
    handleSubmit,
    hideBillingModal,
    billingOptions: { options },
    fieldValues,
  } = props;
  const billToOptions = options.map(option => ({ label: option.displayText, answer: option.billToId, value: option.billToId }));
  const billPlanOptions = options.find(option => option.billToId === fieldValues.billToId);

  return (<div className="modal" style={{ flexDirection: 'row' }}>
    <div className="card card-billing-edit-modal">
      <Form id="BillingEditModal" className="BillingEditModal" noValidate onSubmit={handleSubmit(handleBillingFormSubmit)}>
        <div className="card-header">
          <h4>Edit Billing</h4>
        </div>
        <div className="card-block">
          <SelectField
            name="billToId"
            component="select"
            label="Bill To"
            validations={['required']}
            answers={billToOptions}
          />
          <RadioFieldBilling
            validations={['required']}
            name="billPlan"
            label="Bill Plan"
            onChange={value => selectBillPlan(value, props)}
            validate={[value => (value ? undefined : 'Field Required')]}
            segmented
            answers={billPlanOptions ? billPlanOptions.payPlans : []}
            paymentPlans={billingOptions.paymentPlans}
          />
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button
              tabIndex="0"
              aria-label="reset-btn form-editBilling"
              className="btn btn-secondary"
              type="button"
              onClick={() => hideBillingModal(props)}
            >Cancel
            </button>
            <button
              tabIndex="0"
              aria-label="submit-btn form-editBilling"
              className="btn btn-primary"
              type="submit"
              disabled={appState.data.submitting}
            >Update
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>);
};

BillingEditModal.propTypes = {
  ...propTypes,
  showBillingEditModalModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.bool,
      submitting: PropTypes.bool,
    })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  selectedAI: state.appState.data.selectedAI,
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy,
  fieldValues: getFormValues('BillingEditModal')(state),
});

BillingEditModal.defaultProps = {
  fieldValues: {},
  billingOptions: {}
};

export default connect(mapStateToProps, { updateBillPlan })(reduxForm({
  form: 'BillingEditModal',
  enableReinitialize: true
})(BillingEditModal));
