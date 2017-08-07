import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';

const handleInitialize = state => ({});

export const selectBillPlan = (value, props) => {
  const { paymentPlanResult, billToValue, dispatch } = props;

  const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', billToValue]) : {};

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', value));
};

export const selectBillTo = (props) => {
  const { paymentPlanResult, billToValue, dispatch } = props;
  const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', billToValue]) : {};

  dispatch(change('BillingEditModal', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('BillingEditModal', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('BillingEditModal', 'billPlan', ''));
};

export const BillingEditModal = (props) => {
  const { appState, handleSubmit, verify, hideBillingModal, billingOptions } = props;
  return (<div className="modal" style={{ flexDirection: 'row' }}>
    <Form id="BillingEditModal" className="AdditionalInterestModal" noValidate onSubmit={handleSubmit(verify)}>
      <div className="card">
        <div className="card-header">
          <h4><i className={'fa fa-circle Billing'} /> Edit Billing</h4>
        </div>
        <div className="card-block">
          <div className="flex-parent">
            <div className="flex-child">

              <SelectFieldBilling
                name="billToId"
                component="select"
                label="Bill To"
                onChange={() => selectBillTo(this.props)}
                validations={['required']}
                answers={billingOptions.options}
              />

              <div className="flex-child">

                <RadioFieldBilling
                  validations={['required']}
                  name={'billPlan'}
                  label={'Bill Plan'}
                  onChange={value => selectBillPlan(value, this.props)}
                  validate={[value => (value ? undefined : 'Field Required')]}
                  segmented
                  answers={_.find(billingOptions.options, ['billToId', this.props.billToValue]) ?
                         _.find(billingOptions.options, ['billToId', this.props.billToValue]).payPlans : []}
                  paymentPlans={billingOptions.paymentPlans}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button className="btn btn-secondary" type="button" onClick={() => hideBillingModal(props)}>Cancel</button>
            <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Update</button>
          </div>
        </div>
      </div>
    </Form>
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
  initialValues: handleInitialize(state)
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
