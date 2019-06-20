import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import moment from 'moment';
import { Input, Select, Currency, Loader, validation } from '@exzeo/core-ui';

import { getAnswers } from '../../utilities/forms';
import { getMortgageeOrderAnswers } from '../../utilities/additionalInterests';
import {
  getCashDescriptionOptions,
  getCashTypeAnswers,
  getFormattedPaymentHistory,
  getSortedAdditionalInterests
} from '../../state/selectors/policy.selectors';
import {
  getPolicy,
  addTransaction,
  createTransaction,
  updateBillPlan
} from '../../state/actions/policy.actions';
import { getUIQuestions } from '../../state/actions/questions.actions';
import BillingModal from '../../components/Common/BillingEditModal';
import AIModal from '../AdditionalInterestModal';
import Footer from '../Common/Footer';
import AdditionalInterestCard from '../AdditionalInterestCard';
import PaymentHistoryTable from '../PaymentHistoryTable';
import AIDeleteReinstateModal from '../../components/AIDeleteReinstateModal';
import { PREMIUM_FINANCE_BILL_PAYER_TYPES } from '../../constants/additionalInterests';

const validateBatchNumber = validation.isDateMatchMin10('cashDate', 'YYYYMMDD');
const validateAmount = validation.isRange(-1000000, 1000000);

export const handleInitialize = state => {
  const policy = state.policyState.policy || {};
  const values = {};
  values.policyNumber = policy ? policy.policyNumber : null;
  values.cashDescription = '';
  values.cashDate = moment.utc().format('YYYY-MM-DD');
  values.batchNumber = moment.utc().format('YYYYMMDD');

  return values;
};

export class MortgageBilling extends Component {
  state = {
    addAdditionalInterestType: '',
    isEditingAI: false,
    selectedAI: {},
    showAdditionalInterestModal: false,
    showBillingEditModal: false,
    showDeleteReinstateAI: false
  };

  componentDidMount() {
    this.props.getUIQuestions('additionalInterestsCSR');
  }

  handleBillingFormSubmit = async data => {
    const { updateBillPlan, policy } = this.props;
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
    this.hideBillingModal();
  };

  handleAISubmit = async (additionalInterests, aiData) => {
    const { getPolicy, createTransaction, policy } = this.props;
    const { isEditingAI } = this.state;

    const submitData = {
      ...aiData,
      additionalInterestId: aiData._id,
      policyID: policy.policyID,
      policyNumber: policy.policyNumber,
      transactionType: isEditingAI ? 'AI Update' : 'AI Addition' // eslint-disable-line
    };

    await createTransaction(submitData);
    await getPolicy(policy.policyNumber);

    this.setState({
      showAdditionalInterestModal: false,
      isEditingAI: false
    });
  };

  addAdditionalInterest = type => {
    this.setState({
      showAdditionalInterestModal: true,
      isEditingAI: false,
      selectedAI: {},
      addAdditionalInterestType: type
    });
  };

  editAI = ai => {
    this.setState({
      showAdditionalInterestModal: true,
      isEditingAI: true,
      selectedAI: ai,
      addAdditionalInterestType: ai.type
    });
  };

  initAdditionalInterestModal = () => {
    const { questions = {}, policy } = this.props;
    const { addAdditionalInterestType, selectedAI, isEditingAI } = this.state;

    if (!isEditingAI) {
      const initialValues = {
        name1: '',
        name2: '',
        phoneNumber: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        referenceNumber: '',
        type: addAdditionalInterestType
      };

      if (
        policy.additionalInterests &&
        addAdditionalInterestType === 'Mortgagee'
      ) {
        const mortgageeOrderAnswers = getMortgageeOrderAnswers(
          questions,
          policy.additionalInterests || null
        );
        return {
          ...initialValues,
          order:
            mortgageeOrderAnswers.length === 1
              ? mortgageeOrderAnswers[0].answer
              : ''
        };
      }
      return {
        ...initialValues,
        order: policy.additionalInterests.filter(
          ai => ai.active && ai.type === addAdditionalInterestType
        ).length
      };
    }

    const mortgageeAnswers = getAnswers('mortgagee', questions);
    const mortgagee = mortgageeAnswers.find(
      ai =>
        ai.AIName1 === selectedAI.name1 &&
        ai.AIAddress1 === selectedAI.mailingAddress.address1
    );

    return {
      mortgagee,
      _id: selectedAI._id || '', // eslint-disable-line
      name1: selectedAI.name1 || '',
      name2: selectedAI.name2 || '',
      phoneNumber: selectedAI.phoneNumber ? String(selectedAI.phoneNumber) : '',
      address1: selectedAI.mailingAddress.address1 || '',
      address2: selectedAI.mailingAddress.address2 || '',
      city: selectedAI.mailingAddress.city || '',
      state: selectedAI.mailingAddress.state || '',
      zip: String(selectedAI.mailingAddress.zip) || '',
      referenceNumber: selectedAI.referenceNumber || '',
      type: selectedAI.type || '',
      aiType: selectedAI.type || '',
      order: selectedAI.order
    };
  };

  hideAdditionalInterestModal = () => {
    this.setState({
      showAdditionalInterestModal: false,
      isEditingAI: false,
      showDeleteReinstateAI: false,
      isDeleting: false
    });
  };

  toggleAIState = async ai => {
    this.setState({ isDeleting: true });

    const {
      createTransaction,
      getPolicy,
      policy: { policyID, policyNumber }
    } = this.props;
    const submitData = {
      policyID,
      policyNumber,
      additionalInterestId: ai._id,
      transactionType: ai.active ? 'AI Removal' : 'AI Reinstatement'
    };

    await createTransaction(submitData).then(() => getPolicy(policyNumber));
    this.hideAdditionalInterestModal();
  };

  setBatch = value => {
    const { change } = this.props;

    change('cashDate', value);
    change('batchNumber', moment.utc(value).format('YYYYMMDD'));
  };

  normalizeCashType = value => {
    const { change } = this.props;
    change('cashDescription', '');
    return value;
  };

  handleBillingEdit = () => {
    this.setState({ showBillingEditModal: true });
  };

  hideBillingModal = () => {
    this.setState({ showBillingEditModal: false });
  };

  checkValidTypes = (additionalInterests, selectedAI) => {
    const ais = [];
    if (
      selectedAI.type === 'Mortgagee' ||
      additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active)
        .length <= 1
    )
      ais.push({ answer: 'Mortgagee' });
    if (
      selectedAI.type === 'Additional Insured' ||
      additionalInterests.filter(
        ai => ai.type === 'Additional Insured' && ai.active
      ).length <= 1
    )
      ais.push({ answer: 'Additional Insured' });
    if (
      selectedAI.type === 'Additional Interest' ||
      additionalInterests.filter(
        ai => ai.type === 'Additional Interest' && ai.active
      ).length <= 1
    )
      ais.push({ answer: 'Additional Interest' });
    if (
      selectedAI.type === 'Premium Finance' ||
      additionalInterests.filter(
        ai => ai.type === 'Premium Finance' && ai.active
      ).length <= 1
    )
      ais.push({ answer: 'Premium Finance' });
    if (
      selectedAI.type === 'Bill Payer' ||
      additionalInterests.filter(ai => ai.type === 'Bill Payer' && ai.active)
        .length === 0
    )
      ais.push({ answer: 'Bill Payer' });
    return ais;
  };

  handleFormSubmit = async data => {
    const { policy, reset: resetForm, addTransaction } = this.props;
    const submitData = data;

    submitData.cashDate = moment.utc(data.cashDate);
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d.-]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);
    submitData.companyCode = policy.companyCode;
    submitData.policy = policy;

    await addTransaction(submitData);
    resetForm();
  };

  amountFormatter = cell =>
    cell
      ? Number(cell).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
      : '';

  dateFormatter = cell => `${cell.substring(0, 10)}`;

  toggleDeleteReinstateAIModal = deleteReinstateType => selectedAI => {
    this.setState({
      showDeleteReinstateAI: !this.state.showDeleteReinstateAI,
      selectedAI,
      deleteReinstateType
    });
  };

  render() {
    const {
      cashDescriptionOptions,
      cashTypeAnswers,
      handleSubmit,
      paymentHistory,
      pristine,
      policy,
      policy: { additionalInterests },
      billingOptions,
      submitting,
      reset: resetForm,
      cashTypeValue,
      sortedAdditionalInterests
    } = this.props;

    const validAdditionalInterestTypes = this.checkValidTypes(
      additionalInterests,
      this.state.selectedAI || {}
    );
    const cashDescriptionAnswers = cashDescriptionOptions[cashTypeValue] || [];

    const billingOptionsValues = billingOptions.options || [];
    const selectedBillintOptions = billingOptionsValues.find(
      opt => opt.billToId === this.props.policy.billToId
    );
    const billToText = selectedBillintOptions
      ? selectedBillintOptions.displayText
      : null;

    const disableBillPayerPremiumFinance =
      policy &&
      (policy.additionalInterests.filter(
        ai => ai.type === 'Bill Payer' && ai.active
      ).length > 0 ||
        policy.additionalInterests.filter(
          ai => ai.type === 'Premium Finance' && ai.active
        ).length > 0);

    return (
      <React.Fragment>
        <div className="route-content">
          {!(billingOptions && billingOptions.options) && <Loader />}

          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              {/* TODO: This section needs to be hidden per role */}
              <section className="add-payment">
                <h3>Add Payment</h3>
                <form
                  id="MortgageBilling"
                  onSubmit={handleSubmit(this.handleFormSubmit)}
                >
                  <div className="flex-row">
                    <Field
                      name="cashDate"
                      dataTest="cashDate"
                      label="Cash Date"
                      component={Input}
                      type="date"
                      validate={validation.isRequired}
                      normalize={this.setBatch}
                    />
                    <Field
                      name="batchNumber"
                      dataTest="batchNumber"
                      label="Batch Number"
                      component={Input}
                      validate={validateBatchNumber}
                    />
                  </div>
                  <div className="flex-row">
                    <Field
                      name="cashType"
                      dataTest="cashType"
                      label="Cash Type"
                      normalize={this.normalizeCashType}
                      component={Select}
                      validate={validation.isRequired}
                      answers={cashTypeAnswers}
                    />
                    <Field
                      name="cashDescription"
                      dataTest="cashDescription"
                      label="Description"
                      component={Select}
                      validate={validation.isRequired}
                      answers={cashDescriptionAnswers}
                    />
                    <Field
                      name="amount"
                      dataTest="amount"
                      label="Amount"
                      component={Currency}
                      validate={validateAmount}
                      noDecimal={false}
                      min={-1000000}
                      max={1000000}
                    />
                  </div>
                  <div className="btn-footer">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      form="MortgageBilling"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      form="MortgageBilling"
                      disabled={submitting || pristine}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </section>
              <section className="payment-summary">
                <h3>
                  Billing{' '}
                  <button
                    className="btn btn-link btn-sm"
                    onClick={this.handleBillingEdit}
                  >
                    <i className="fa fa-pencil-square" />
                    Edit
                  </button>
                </h3>
                <div className="payment-summary">
                  <dl>
                    <div>
                      <dt>Bill To</dt>
                      <dd>{billToText}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Bill Plan</dt>
                      <dd>{policy.billPlan}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex-parent">
                  <h3 className="flex-child">Payments</h3>
                </div>
                <div className="payment-summary grid">
                  <PaymentHistoryTable paymentHistory={paymentHistory} />

                  <dl className="total">
                    <div>
                      {this.props.summaryLedger &&
                        this.props.summaryLedger.cashReceived &&
                        `Payments Received ${this.amountFormatter(
                          this.props.summaryLedger.cashReceived
                            .$numberDecimal || '0'
                        )}`}{' '}
                      <br />
                    </div>
                  </dl>
                </div>
              </section>
              <section className="additional-interests">
                <h3>Additional Interests</h3>
                <div className="results-wrapper">
                  <div className="button-group">
                    <button
                      tabIndex="0"
                      disabled={
                        policy &&
                        policy.additionalInterests.filter(
                          ai => ai.type === 'Mortgagee' && ai.active
                        ).length > 2
                      }
                      onClick={() => this.addAdditionalInterest('Mortgagee')}
                      className="btn btn-sm btn-secondary"
                      type="button"
                    >
                      {' '}
                      <div>
                        <i className="fa fa-plus" />
                        <span>Mortgagee</span>
                      </div>
                    </button>
                    <button
                      tabIndex="0"
                      disabled={
                        policy &&
                        policy.additionalInterests.filter(
                          ai => ai.type === 'Additional Insured' && ai.active
                        ).length > 1
                      }
                      onClick={() =>
                        this.addAdditionalInterest('Additional Insured')
                      }
                      className="btn btn-sm btn-secondary"
                      type="button"
                    >
                      <div>
                        <i className="fa fa-plus" />
                        <span>Additional Insured</span>
                      </div>
                    </button>
                    <button
                      tabIndex="0"
                      disabled={
                        policy &&
                        policy.additionalInterests.filter(
                          ai => ai.type === 'Additional Interest' && ai.active
                        ).length > 1
                      }
                      onClick={() =>
                        this.addAdditionalInterest('Additional Interest')
                      }
                      className="btn btn-sm btn-secondary"
                      type="button"
                    >
                      <div>
                        <i className="fa fa-plus" />
                        <span>Additional Interest</span>
                      </div>
                    </button>
                    <button
                      tabIndex="0"
                      disabled={disableBillPayerPremiumFinance}
                      onClick={() =>
                        this.addAdditionalInterest('Premium Finance')
                      }
                      className="btn btn-sm btn-secondary"
                      type="button"
                    >
                      <div>
                        <i className="fa fa-plus" />
                        <span>Premium Finance</span>
                      </div>
                    </button>
                    <button
                      tabIndex="0"
                      disabled={disableBillPayerPremiumFinance}
                      onClick={() => this.addAdditionalInterest('Bill Payer')}
                      className="btn btn-sm btn-secondary"
                      type="button"
                    >
                      <div>
                        <i className="fa fa-plus" />
                        <span>Bill Payer</span>
                      </div>
                    </button>
                  </div>
                  <ul className="results result-cards additional-interests-list">
                    {sortedAdditionalInterests.map(ai => (
                      <AdditionalInterestCard
                        key={ai._id}
                        ai={ai}
                        editAI={this.editAI}
                        toggleReactivateAIModal={this.toggleDeleteReinstateAIModal(
                          'Reactivate'
                        )}
                        toggleDeleteAIModal={this.toggleDeleteReinstateAIModal(
                          'Delete'
                        )}
                        disableBillPayerPremiumFinance={
                          disableBillPayerPremiumFinance &&
                          PREMIUM_FINANCE_BILL_PAYER_TYPES.includes(ai.type)
                        }
                      />
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          {this.state.showAdditionalInterestModal && (
            <AIModal
              additionalInterests={additionalInterests}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              completeSubmit={this.handleAISubmit}
              hideModal={this.hideAdditionalInterestModal}
              initialValues={this.initAdditionalInterestModal()}
              isEditing={this.state.isEditingAI}
              isDeleting={this.state.isDeleting}
              selectedAI={this.state.selectedAI}
              validAdditionalInterestTypes={validAdditionalInterestTypes}
              deleteAdditionalInterest={this.toggleAIState}
              isPolicy
            />
          )}
          {this.state.showDeleteReinstateAI && (
            <AIDeleteReinstateModal
              actionType={this.state.deleteReinstateType}
              closeModal={this.hideAdditionalInterestModal}
              selectedAI={this.state.selectedAI}
              handleAction={() =>
                this.toggleAIState(this.state.selectedAI, this.props)
              }
            />
          )}
        </div>
        {this.state.showBillingEditModal && (
          <BillingModal
            billingOptions={billingOptions.options}
            handleBillingSubmit={this.handleBillingFormSubmit}
            hideBillingModal={this.hideBillingModal}
          />
        )}
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

MortgageBilling.propTypes = {
  cashTypeValue: PropTypes.string,
  billingOptions: PropTypes.object,
  initialValues: PropTypes.object,
  summaryLedger: PropTypes.object,
  policyID: PropTypes.string,
  paymentHistory: PropTypes.array,
  service: PropTypes.object,
  cashTypeAnswers: PropTypes.array,
  cashDescriptionAnswers: PropTypes.array,
  sortedAdditionalInterests: PropTypes.array,
  questions: PropTypes.object,
  tasks: PropTypes.object,
  policy: PropTypes.object.isRequired
};

const selector = formValueSelector('MortgageBilling');
const mapStateToProps = state => ({
  cashTypeValue: selector(state, 'cashType'),
  billingOptions: state.policyState.billingOptions,
  initialValues: handleInitialize(state),
  summaryLedger: state.policyState.summaryLedger,
  policy: state.policyState.policy,
  policyID: state.policyState.policyID,
  paymentHistory: getFormattedPaymentHistory(state),
  service: state.service,
  cashTypeAnswers: getCashTypeAnswers(state),
  cashDescriptionOptions: getCashDescriptionOptions(state),
  sortedAdditionalInterests: getSortedAdditionalInterests(state),
  questions: state.questions,
  tasks: state.cg
});

export default connect(
  mapStateToProps,
  {
    addTransaction,
    createTransaction,
    getUIQuestions,
    getPolicy,
    updateBillPlan
  }
)(
  reduxForm({
    form: 'MortgageBilling',
    enableReinitialize: true
  })(MortgageBilling)
);
