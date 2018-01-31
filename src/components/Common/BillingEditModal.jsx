import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';

export const handleInitialize = (state) => {
  const policyData = state.service.latestPolicy;
  const values = {
    billToId: policyData.billToId,
    billToType: policyData.billToType,
    billPlan: policyData.billPlan
  };

  const paymentPlans = state.service.billingOptions;

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !values.billTo && !values.billPlan) {
    values.billToId = paymentPlans.options[0].billToId;
    values.billToType = paymentPlans.options[0].billToType;
    values.billPlan = 'Annual';
  }

  return values;
};

export const setFormValues = (billingOptions, billToId, billplan, dispatch) => {
  const currentPaymentPlan = billingOptions.options.find(option => option.billToId === billToId);
  if (currentPaymentPlan) {
    dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('BillingEditModal', 'billPlan', billplan));
  }
};

export const selectBillPlan = (value, props) => {
  const { billingOptions, dispatch, fieldValues } = props;
<<<<<<< HEAD
  setFormValues(billingOptions, fieldValues.billToId, value, dispatch);
=======
  const currentPaymentPlan = billingOptions.options.find(option => option.billToId === fieldValues.billToId);

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', value));
>>>>>>> Added updateBillPlan service action. Hooked up Edit Billing Modal to service action.
};

export const selectBillTo = (event, props) => {
  const { billingOptions, dispatch } = props;
<<<<<<< HEAD
  setFormValues(billingOptions, event.target.value, 'Annual', dispatch);
=======
  const currentPaymentPlan = billingOptions.options.find(opt => opt.billToId === event.target.value);

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', 'Annual'));
>>>>>>> Added updateBillPlan service action. Hooked up Edit Billing Modal to service action.
};

export const BillingEditModal = (props) => {
  const { appState, handleSubmit, handleBillingFormSubmit, hideBillingModal, billingOptions, fieldValues } = props;
  const options = billingOptions.options.find(option => option.billToId === fieldValues.billToId);

  return (<div className="modal" style={{ flexDirection: 'row' }}>
    <div className="card card-billing-edit-modal">
      <Form id="BillingEditModal" className="BillingEditModal" noValidate onSubmit={handleSubmit(handleBillingFormSubmit)}>
        <div className="card-header">
          <h4>Edit Billing</h4>
        </div>
        <div className="card-block">
          <SelectFieldBilling
            name="billToId"
            component="select"
            label="Bill To"
            onChange={(e) => selectBillTo(e, props)}
            validations={['required']}
            answers={billingOptions.options}
          />
          <RadioFieldBilling
            validations={['required']}
            name={'billPlan'}
            label={'Bill Plan'}
            onChange={value => selectBillPlan(value, props)}
            validate={[value => (value ? undefined : 'Field Required')]}
            segmented
            answers={options ? options.payPlans : []}
            paymentPlans={billingOptions.paymentPlans}
          />
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button 
              tabIndex={'0'} 
              aria-label="reset-btn form-editBilling" 
              className="btn btn-secondary" 
              type="button" 
              onClick={() => hideBillingModal(props)}>Cancel
            </button>
            <button 
              tabIndex={'0'} 
              aria-label="submit-btn form-editBilling" 
              className="btn btn-primary" 
              type="submit" 
              disabled={appState.data.submitting}>Update
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
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  selectedAI: state.appState.data.selectedAI,
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy,
  fieldValues: state.form.BillingEditModal ? state.form.BillingEditModal.values : {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'BillingEditModal', enableReinitialize: true
})(BillingEditModal));
