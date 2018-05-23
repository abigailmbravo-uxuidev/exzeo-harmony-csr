import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes as rfPropTypes, change, getFormValues } from 'redux-form';
import SelectInput from '../Form/base/Select';
import BillingRadio from '../Form/inputs/BillingRadio';
import { requireField } from "../Form/validations/index";
import { updateBillPlan } from '../../actions/serviceActions';
import 'react-select/dist/react-select.css';
const FORM_NAME = 'BillingEditModal';

export const handleInitialize = (state) => {
  const { billingOptions, latestPolicy } = state.service;

  if (billingOptions.length === 1 && !latestPolicy.billTo && !latestPolicy.billPlan) {
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
  }
  normalizeBilling = (value) => {
    const { billingOptions, changeField } = this.props;
    const billToType = billingOptions.find(o => o.billToId === value).billToType;
    changeField(FORM_NAME, 'billPlan', 'Annual');
    changeField(FORM_NAME, 'billToType', billToType);
    return value;
  };

  getBillingOptions() {
    const { billingOptions, fieldValues } = this.props;
    const planOptions = billingOptions.find(option => option.billToId === fieldValues.billToId);
    return (planOptions || {}).payPlans || [];
  }

  render() {
    const { hideBillingModal, billingOptions, submitting, handleSubmit } = this.props;
    const billToOptions = billingOptions.map(option => ({label: option.displayText, answer: option.billToId}));

    return (
      <div className="modal" style={this.modalStyle}>
        <div className="card card-billing-edit-modal">
          <form id="BillingEditModal" className="BillingEditModal" noValidate onSubmit={handleSubmit(handleBillingFormSubmit)}>
            <div className="card-header">
              <h4>Edit Billing</h4>
            </div>
            <div className="card-block">
              <Field
                name="billToId"
                normalize={this.normalizeBilling}
                component={SelectInput}
                label="Bill To"
                validate={requireField}
                answers={billToOptions}
              />
              <Field
                name="billPlan"
                label="Bill Plan"
                component={BillingRadio}
                validate={requireField}
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
  ...rfPropTypes,
  showBillingEditModalModal: propTypes.func,
  verify: propTypes.func,
  appState: propTypes.shape({
    modelName: propTypes.string,
    data: propTypes.shape({
      recalc: propTypes.bool,
      submitting: propTypes.bool,
    })
  })
};

BillingEditModal.defaultProps = {
  fieldValues: {},
  billingOptions: []
};

const mapStateToProps = state => ({
  tasks: state.cg,
  selectedAI: state.appState.data.selectedAI,
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy,
  fieldValues: getFormValues(FORM_NAME)(state),
});

BillingEditModal = reduxForm({
  form: 'BillingEditModal',
  enableReinitialize: true
})(BillingEditModal);

BillingEditModal = connect(mapStateToProps, {
  updateBillPlan,
  changeField: change
})(BillingEditModal);

export default BillingEditModal;
