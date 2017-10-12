import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return quoteData;
};

const handleInitialize = (state) => {
  const policyData = handleGetPolicy(state);
  const values = {};

  values.billToId = _.get(policyData, 'billToId');
  values.billToType = _.get(policyData, 'billToType');
  values.billPlan = _.get(policyData, 'billPlan');

  const paymentPlans = state.service.billingOptions;

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !values.billTo && !values.billPlan) {
    values.billToId = _.get(paymentPlans.options[0], 'billToId');
    values.billToType = _.get(paymentPlans.options[0], 'billToType');
    values.billPlan = 'Annual';
  }

  return values;
};

export const selectBillPlan = (value, props) => {
  const { billingOptions, dispatch, fieldValues } = props;

  const currentPaymentPlan = _.find(billingOptions.options, ['billToId', fieldValues.billToId]) ?
    _.find(billingOptions.options, ['billToId', fieldValues.billToId]) : {};

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', value));
};

export const selectBillTo = (event, props) => {
  const { billingOptions, dispatch } = props;
  const currentPaymentPlan = _.find(billingOptions.options, ['billToId', event.target.value]) ?
    _.find(billingOptions.options, ['billToId', event.target.value]) : {};

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', 'Annual'));
};

export const BillingEditModal = (props) => {
  const { appState, handleSubmit, handleBillingFormSubmit, hideBillingModal, billingOptions } = props;
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
          onChange={() => selectBillTo(props)}
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
          answers={_.find(billingOptions.options, ['billToId', props.fieldValues.billToId]) ?
                 _.find(billingOptions.options, ['billToId', props.fieldValues.billToId]).payPlans : []}
          paymentPlans={billingOptions.paymentPlans}
        />
      </div>
      <div className="card-footer">
        <div className="btn-group">
          <button aria-label="reset-btn form-editBilling" className="btn btn-secondary" type="button" onClick={() => hideBillingModal(props)}>Cancel</button>
          <button aria-label="submit-btn form-editBilling" className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Update</button>
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
  policy: handleGetPolicy(state),
  fieldValues: _.get(state.form, 'BillingEditModal.values', {})
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'BillingEditModal', enableReinitialize: true
})(BillingEditModal));