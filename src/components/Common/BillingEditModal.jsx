import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Radio, Select, Loader, validation } from '@exzeo/core-ui';

const FORM_NAME = 'BillingEditModal';

export const handleInitialize = state => {
  const { policy, billingOptions } = state.policyState;

  if (billingOptions.length === 1 && !policy.billTo && !policy.billPlan) {
    return {
      billToId: billingOptions.options[0].billToId,
      billToType: billingOptions.options[0].billToType,
      billPlan: 'Annual'
    };
  }
  return {
    billToId: policy.billToId,
    billToType: policy.billToType,
    billPlan: policy.billPlan
  };
};

export class BillingEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = { flexDirection: 'row' };
    this.billToOptions = props.billingOptions.map(option => ({
      label: option.displayText,
      answer: option.billToId
    }));
  }

  getBillingOptions() {
    const { billingOptions, billToIdValue } = this.props;
    const payPlans = (
      billingOptions.find(option => option.billToId === billToIdValue) || {}
    ).payPlans;
    return (payPlans || []).map(plan => ({ label: plan, answer: plan }));
  }

  handleBillingFormSubmit = async data => {
    const { handleBillingSubmit } = this.props;
    await handleBillingSubmit(data);
  };

  normalizeBilling = value => {
    const { billingOptions, change } = this.props;
    const billToType =
      (billingOptions.find(o => o.billToId === value) || {}).billToType || '';
    change('billPlan', 'Annual');
    change('billToType', billToType);
    return value;
  };

  render() {
    const { handleSubmit, hideBillingModal, submitting, pristine } = this.props;

    return (
      <div className="modal" style={this.modalStyle}>
        {submitting && <Loader />}
        <div className="card card-billing-edit-modal">
          <form
            id="BillingEditModal"
            className="BillingEditModal"
            onSubmit={handleSubmit(this.handleBillingFormSubmit)}
          >
            <div className="card-header">
              <h4>Edit Billing</h4>
            </div>
            <div className="card-block">
              <Field
                name="billToId"
                label="Bill To"
                component={Select}
                normalize={this.normalizeBilling}
                validate={validation.isRequired}
                answers={this.billToOptions}
                dataTest="billToId"
              />
              <Field
                name="billPlan"
                label="Bill Plan"
                component={Radio}
                validate={validation.isRequired}
                answers={this.getBillingOptions()}
                dataTest="billPlan"
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
                >
                  Cancel
                </button>
                <button
                  tabIndex="0"
                  aria-label="submit-btn form-editBilling"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Update
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
  billingOptions: PropTypes.array,
  handleBillingFormSubmit: PropTypes.func,
  hideBillingModal: PropTypes.func
};

BillingEditModal.defaultProps = {
  billToId: '',
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

export default connect(mapStateToProps)(
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true
  })(BillingEditModal)
);
