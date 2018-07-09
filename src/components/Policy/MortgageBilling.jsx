import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
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
  getPaymentHistory,
  getBillingOptionsForPolicy,
  createTransaction,
  getPaymentOptionsApplyPayments
} from '../../state/actions/policyActions';
import { getUIQuestions } from '../../state/actions/questionsActions';

import PolicyConnect from '../../containers/Policy';
import BillingModal from '../../components/Common/BillingEditModal';
import AIModal from '../AdditionalInterestModal';
import Footer from '../Common/Footer';
import AdditionalInterestCard from "../AdditionalInterestCard";
import PaymentHistoryTable from "../PaymentHistoryTable";

const { validation } = lifecycle;
const { Input, Select, Currency } = Inputs;

const validateBatchNumber = validation.isDateMatchMin10('cashDate', 'YYYYMMDD');
const validateAmount = validation.isRange(-1000000, 1000000);

export const handleInitialize = (state) => {
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
    paymentDescription: [],
    selectedAI: {},
    showAdditionalInterestModal: false,
    showBillingEditModal: false
  };

  componentDidMount() {
    this.props.getUIQuestions('additionalInterestsCSR');
  }

  componentWillReceiveProps = (nextProps) => {
    // TODO this is probably not needed, but leaving here for now until we solidify the pattern
    const { policy } = this.props;
    if (nextProps.policyID && (nextProps.policyID !== policy.policyID)) {
      const { getPaymentHistory, getPaymentOptionsApplyPayments, getBillingOptionsForPolicy } = nextProps;
      const paymentOptions = {
        effectiveDate: nextProps.policy.effectiveDate,
        policyHolders: nextProps.policy.policyHolders,
        additionalInterests: nextProps.policy.additionalInterests,
        currentPremium: nextProps.summaryLedger.currentPremium,
        fullyEarnedFees: nextProps.policy.rating.worksheet.fees.empTrustFee + nextProps.policy.rating.worksheet.fees.mgaPolicyFee
      };
      getBillingOptionsForPolicy(paymentOptions);
      getPaymentHistory(nextProps.policy.policyNumber);
      getPaymentOptionsApplyPayments();
    }
  };

  handleAISubmit = async (additionalInterests, aiData) => {
    const { getPolicy, createTransaction, policy } = this.props;
    const { isEditingAI } = this.state;

    const submitData = {
      ...aiData,
      additionalInterestId: aiData._id,
      policyID: policy.policyID,
      policyNumber: policy.policyNumber,
      transactionType: isEditingAI ? 'AI Update' : 'AI Addition', // eslint-disable-line
    };

    await createTransaction(submitData);
    getPolicy(policy.policyNumber);

    this.setState({
      showAdditionalInterestModal: false,
      isEditingAI: false
    });
  };

  addAdditionalInterest = (type) => {
    this.setState({
      showAdditionalInterestModal: true,
      isEditingAI: false,
      selectedAI: {},
      addAdditionalInterestType: type
    });
  };

  editAdditionalInterest = (ai) => {
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

      let mortgageeOrderAnswers = '';
      if (policy.additionalInterests && addAdditionalInterestType === 'Mortgagee') {
        mortgageeOrderAnswers = getMortgageeOrderAnswers(questions, (policy.additionalInterests || null));
      }
      return {
        ...initialValues,
        order: mortgageeOrderAnswers.length === 1 ? mortgageeOrderAnswers[0].answer : ''
      };
    }

    const mortgageeAnswers = getAnswers('mortgagee', questions)
    const mortgagee = mortgageeAnswers.find(ai => ai.AIName1 === selectedAI.name1 && ai.AIAddress1 === selectedAI.mailingAddress.address1);

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
      isEditingAI: false
    });
  };

  deleteAdditionalInterest = (selectedAdditionalInterest) => {
    this.setState({
      isDeleting: true
    });

    const additionalInterests = this.props.policy.additionalInterests || [];
    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);
    // remove any existing items before submission
    _.remove(modifiedAIs, ai => ai._id === selectedAdditionalInterest._id); // eslint-disable-line

    if (_.filter(modifiedAIs, ai => ai.type === selectedAdditionalInterest.type).length === 1) {
      const index = _.findIndex(modifiedAIs, { type: selectedAdditionalInterest.type });
      const ai = modifiedAIs[index];
      ai.order = 0;
      modifiedAIs.splice(index, 1, ai);
    }
    const offset = new Date(this.props.policy.effectiveDate).getTimezoneOffset() / 60;

    const submitData = {
      additionalInterestId: selectedAdditionalInterest._id,
      ...this.props.policy,
      endorsementDate: moment(this.props.policy.effectiveDate).utcOffset(offset),
      transactionType: 'AI Removal'
    };

    this.props.createTransaction(submitData).then(() => {
      this.props.getPolicy(this.props.policy.policyNumber);
      this.setState({
        showAdditionalInterestModal: false,
        isEditingAI: false,
        isDeleting: false
      });
    });
  };

  editAIOnEnter = (event, ai) => {
    if (event.key === 'Enter') {
      this.editAdditionalInterest(ai);
    }
  };

  setBatch = (value) => {
    const { change } = this.props;

    change('cashDate', value);
    change('batchNumber', moment.utc(value).format('YYYYMMDD'));
  };

  normalizeCashType = (value) => {
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
    if (selectedAI.type === 'Mortgagee' || _.filter(additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length <= 1) ais.push({ answer: 'Mortgagee' });
    if (selectedAI.type === 'Additional Insured' || _.filter(additionalInterests, ai => ai.type === 'Additional Insured' && ai.active).length <= 1) ais.push({ answer: 'Additional Insured' });
    if (selectedAI.type === 'Additional Interest' || _.filter(additionalInterests, ai => ai.type === 'Additional Interest' && ai.active).length <= 1) ais.push({ answer: 'Additional Interest' });
    if (selectedAI.type === 'Premium Finance' || _.filter(additionalInterests, ai => ai.type === 'Premium Finance' && ai.active).length <= 1) ais.push({ answer: 'Premium Finance' });
    if (selectedAI.type === 'Bill Payer' || _.filter(additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length === 0) ais.push({ answer: 'Bill Payer' });
    return ais;
  };

  handleFormSubmit = async (data) => {
    const { reset: resetForm, addTransaction } = this.props;
    const submitData = data;

    submitData.cashDate = moment.utc(data.cashDate);
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d.-]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);
    submitData.companyCode = 'TTIC';
    submitData.policy = this.props.policy;

    await addTransaction(submitData);
    resetForm();
  };

  amountFormatter = cell => (cell ? Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '');

  dateFormatter = cell => `${cell.substring(0, 10)}`;

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

    const validAdditionalInterestTypes = this.checkValidTypes(additionalInterests, this.state.selectedAI || {});
    const cashDescriptionAnswers = cashDescriptionOptions[cashTypeValue] || [];

    return (
      <PolicyConnect>
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              {/* TODO: This section needs to be hidden per role */}
              <section className="add-payment">
                <h3>Add Payment</h3>
                <form id="MortgageBilling" onSubmit={handleSubmit(this.handleFormSubmit)} >
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <Field
                          name="cashDate"
                          dataTest="cashDate"
                          label="Cash Date"
                          component={Input}
                          type="date"
                          validate={validation.isRequired}
                          normalize={this.setBatch}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <Field
                          name="batchNumber"
                          dataTest="batchNumber"
                          label="Batch Number"
                          component={Input}
                          validate={validateBatchNumber}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <Field
                          name="cashType"
                          dataTest="cashType"
                          label="Cash Type"
                          normalize={this.normalizeCashType}
                          component={Select}
                          validate={validation.isRequired}
                          answers={cashTypeAnswers}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <Field
                          name="cashDescription"
                          dataTest="cashDescription"
                          label="Description"
                          component={Select}
                          validate={validation.isRequired}
                          answers={cashDescriptionAnswers}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
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
                    </div>
                  </div>
                  <div className="btn-footer">
                    <button className="btn btn-secondary" type="button" form="MortgageBilling" onClick={resetForm}>Cancel</button>
                    <button className="btn btn-primary" type="submit" form="MortgageBilling" disabled={submitting || pristine}>Save</button>
                  </div>
                </form>
              </section>
              <section className="payment-summary">
                <h3>Billing <button className="btn btn-link btn-sm" onClick={this.handleBillingEdit}><i className="fa fa-pencil-square" />Edit</button></h3>
                <div className="payment-summary">
                  <dl>
                    <div>
                      <dt>Bill To</dt>
                      <dd>{_.get(_.find(_.get(billingOptions, 'options'), option => option.billToId === _.get(this.props.policy, 'billToId')), 'displayText')}
                      </dd>
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
                      {this.props.summaryLedger && this.props.summaryLedger.cashReceived && `Payments Received ${this.amountFormatter(this.props.summaryLedger.cashReceived.$numberDecimal || '0')}`} <br />
                    </div>
                  </dl>
                </div>
              </section>
              <section className="additional-interests">
                <h3>Additional Interests</h3>
                <div className="results-wrapper">
                  <div className="button-group">
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length > 2)} onClick={() => this.addAdditionalInterest('Mortgagee')} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Insured' && ai.active).length > 1)} onClick={() => this.addAdditionalInterest('Additional Insured')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Interest' && ai.active).length > 1)} onClick={() => this.addAdditionalInterest('Additional Interest')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                    <button tabIndex="0" disabled={(policy && (_.filter(policy.additionalInterests, ai => ai.type === 'Premium Finance' && ai.active).length > 0 || _.filter(policy.additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length > 0))} onClick={() => this.addAdditionalInterest('Premium Finance')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Premium Finance</span></div></button>
                    <button tabIndex="0" disabled={(policy && (_.filter(policy.additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length > 0 || _.filter(policy.additionalInterests, ai => ai.type === 'Premium Finance' && ai.active).length > 0))} onClick={() => this.addAdditionalInterest('Bill Payer')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Bill Payer</span></div></button>
                  </div>
                  <ul className="results result-cards">
                    {sortedAdditionalInterests.map(ai => (
                      <AdditionalInterestCard
                        key={ai._id}
                        ai={ai}
                        handleOnEnter={this.editAIOnEnter}
                        handleClick={this.editAdditionalInterest}
                      />
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          {this.state.showAdditionalInterestModal &&
            <AIModal
              additionalInterests={additionalInterests}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              completeSubmit={this.handleAISubmit}
              deleteAdditionalInterest={this.deleteAdditionalInterest}
              hideModal={this.hideAdditionalInterestModal}
              initialValues={this.initAdditionalInterestModal()}
              isDeleting={this.state.isDeleting}
              isEditing={this.state.isEditingAI}
              selectedAI={this.state.selectedAI}
              validAdditionalInterestTypes={validAdditionalInterestTypes}
              isPolicy
            />
          }
        </div>
        {this.state.showBillingEditModal &&
          <BillingModal
            billingOptions={billingOptions.options}
            hideBillingModal={this.hideBillingModal}
          />
        }
        <div className="basic-footer">
          <Footer />
        </div>
      </PolicyConnect>
    );
  }
}

MortgageBilling.propTypes = {
  policy: PropTypes.shape().isRequired
};

const selector = formValueSelector('MortgageBilling');
const mapStateToProps = state => ({
  cashTypeValue: selector(state, 'cashType'),
  auth: state.authState,
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

export default connect(mapStateToProps, {
  getPaymentHistory,
  getPaymentOptionsApplyPayments,
  getBillingOptionsForPolicy,
  addTransaction,
  createTransaction,
  getUIQuestions,
  getPolicy
})(reduxForm({
  form: 'MortgageBilling',
  enableReinitialize: true
})(MortgageBilling));
