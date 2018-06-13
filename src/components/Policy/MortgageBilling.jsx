import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from 'lodash';
import moment from 'moment';

import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

import { getPolicy, getSummaryLedger } from '../../actions/policyActions';
import { getUIQuestions } from '../../actions/questionsActions';
import {
  getPaymentOptionsApplyPayments,
  getBillingOptionsForPolicy,
  getPaymentHistory,
  addTransaction,
  createTransaction
} from '../../actions/serviceActions';
import PolicyConnect from '../../containers/Policy';

import BillingModal from '../../components/Common/BillingEditModal';
import AIModal from '../../components/Common/AdditionalInterestModal';
import Footer from '../Common/Footer';
import setRank from '../Common/additionalInterestRank';

const { validation } = lifecycle;
const { Input, Select, Currency } = Inputs;

export const handleInitialize = (state) => {
  const policy = state.policyState.policy || {};
  const values = {};
  values.policyNumber = policy ? policy.policyNumber : null;
  values.cashDescription = '';
  values.cashDate = moment.utc().format('YYYY-MM-DD');
  values.batchNumber = moment.utc().format('YYYYMMDD');

  return values;
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const getMortgageeOrderAnswers = (questions, additionalInterests) => {
  let answers = _.cloneDeep(getAnswers('order', questions));

  if (additionalInterests && additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active).length === 0) {
    answers = answers.filter(answer => Number(answer.answer) === 0);
  }
  if (additionalInterests && additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active).length === 1) {
    answers = answers.filter(answer => Number(answer.answer) === 1);
  }
  return answers;
};

export const getMortgageeOrderAnswersForEdit = (questions, additionalInterests) => {
  const answers = _.cloneDeep(getAnswers('order', questions));

  if (_.filter(additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length < 2) {
    _.remove(answers, answer => Number(answer.answer) === 1);
  }
  return answers;
};


export class MortgageBilling extends Component {
  state = {
    addAdditionalInterestType: null,
    paymentDescription: [],
    selectedAI: {},
    showAdditionalInterestModal: false,
    isEditingAI: false,
    showBillingEditModal: false
  };

  componentDidMount = () => {
    const { policy, summaryLedger } = this.props;
    this.props.getPaymentHistory(this.props.policy.policyNumber);
    this.props.getPaymentOptionsApplyPayments();
    this.props.getUIQuestions('additionalInterestsCSR');

    if (policy.rating && summaryLedger.currentPremium) {
      const paymentOptions = {
        effectiveDate: policy.effectiveDate,
        policyHolders: policy.policyHolders,
        additionalInterests: policy.additionalInterests,
        currentPremium: summaryLedger.currentPremium,
        fullyEarnedFees: policy.rating.worksheet.fees.empTrustFee + policy.rating.worksheet.fees.mgaPolicyFee
      };
      this.props.getBillingOptionsForPolicy(paymentOptions);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps && nextProps.policy && nextProps.policy.policyNumber && (this.props.policyID !== nextProps.policy.policyID)) {
      nextProps.getSummaryLedger(nextProps.policy.policyNumber);
      nextProps.getPaymentOptionsApplyPayments();
      nextProps.getPaymentHistory(nextProps.policy.policyNumber);

      const paymentOptions = {
        effectiveDate: nextProps.policy.effectiveDate,
        policyHolders: nextProps.policy.policyHolders,
        additionalInterests: nextProps.policy.additionalInterests,
        currentPremium: nextProps.summaryLedger.currentPremium,
        fullyEarnedFees: nextProps.policy.rating.worksheet.fees.empTrustFee + nextProps.policy.rating.worksheet.fees.mgaPolicyFee
      };
      nextProps.getBillingOptionsForPolicy(paymentOptions);
    }
  };

  setIsActive = (additionalInterests) => {
    if (!additionalInterests) return;
    additionalInterests.forEach((value) => {
      value.sortInactive = !value.active;
      return value;
    });
  };

  setBatch = (value) => {
    const { dispatch } = this.props;

    dispatch(change('MortgageBilling', 'cashDate', value));
    dispatch(change('MortgageBilling', 'batchNumber', moment.utc(value).format('YYYYMMDD')));
  };

  getPaymentDescription = (value) => {
    const { dispatch } = this.props;
    dispatch(change('MortgageBilling', 'cashDescription', ''));
    return value;
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

  editAIOnEnter = (event, ai) => {
    if (event.key === 'Enter') {
      this.editAdditionalInterest(ai);
    }
  };

  hideAdditionalInterestModal = () => {
    this.setState({
      showAdditionalInterestModal: false,
      isEditingAI: false
    });
  };

  handleAISubmit = async (data, dispatch, props) => {
    const { getPolicy, createTransaction } = this.props;
    const { policy } = props;

    const additionalInterests = policy.additionalInterests || [];
    const type = data.aiType || this.state.addAdditionalInterestType;

    let { order } = data;

    const isMortgagee = type === 'Mortgagee';
    // type mortgagee allows the user to select order and the AI edit will pass in order
    if (!isMortgagee && !data._id) {
      order = additionalInterests.filter(ai => ai.type === type && ai.active).length === 0 ? 0 : 1;
    }
    // remove any existing items before submission
    const modifiedAIs = _.cloneDeep(additionalInterests);

    _.remove(modifiedAIs, ai => ai._id === data._id); // eslint-disable-line

    const aiData = {
      additionalInterestId: data._id, // eslint-disable-line
      name1: data.name1,
      name2: data.name2,
      referenceNumber: data.referenceNumber || '',
      order,
      active: true,
      type,
      phoneNumber: String(data.phoneNumber).length > 0 ? String(data.phoneNumber).replace(/[^\d]/g, '') : '',
      mailingAddress: {
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      }
    };

    modifiedAIs.push(aiData);
    setRank(modifiedAIs);

    const offset = new Date(policy.effectiveDate).getTimezoneOffset() / 60;

    const submitData = {
      ...aiData,
      ...policy,
      endorsementDate: moment(policy.effectiveDate).utcOffset(offset),
      transactionType: data._id ? 'AI Update' : 'AI Addition', // eslint-disable-line
      additionalInterests: modifiedAIs
    };

    await createTransaction(submitData);
    getPolicy(policy.policyNumber);

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


  handleFormSubmit = (data) => {
    const {
      policy, reset: resetForm, addTransaction, getPaymentHistory, getSummaryLedger
    } = this.props;
    const submitData = data;

    submitData.cashDate = moment.utc(data.cashDate);
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d.-]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);
    submitData.companyCode = 'TTIC';
    submitData.policy = this.props.policy;

    addTransaction(submitData)
      .then(() => {
        getPaymentHistory(policy.policyNumber);
        getSummaryLedger(policy.policyNumber);
      });

    resetForm();
  };

  amountFormatter = cell => (cell ? Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '');
  dateFormatter = cell => `${cell.substring(0, 10)}`;

  initAdditionalInterestModal = () => {
    const { service = {}, questions = {} } = this.props;
    const { addAdditionalInterestType, selectedAI, isEditingAI } = this.state;
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
      type: ''
    };

    if (isEditingAI) {
      if (selectedAI) {
        const mortgagee = _.get(_.find(getAnswers('mortgagee', this.props.questions), a => a.AIName1 === selectedAI.name1 &&
          a.AIAddress1 === selectedAI.mailingAddress.address1), 'ID');

        return {
          mortgagee,
          _id: selectedAI._id, // eslint-disable-line
          name1: selectedAI.name1,
          name2: selectedAI.name2,
          phoneNumber: selectedAI.phoneNumber,
          address1: selectedAI.mailingAddress.address1,
          address2: selectedAI.mailingAddress.address2,
          city: selectedAI.mailingAddress.city,
          state: selectedAI.mailingAddress.state,
          zip: selectedAI.mailingAddress.zip,
          referenceNumber: selectedAI.referenceNumber,
          type: selectedAI.type,
          aiType: selectedAI.type,
          order: selectedAI.order
        };
      }

      return {
        ...initialValues,
        _id: ''
      };
    }

    let mortgageeOrderAnswers = '';
    if ((service.latestPolicy || service.quote) && addAdditionalInterestType === 'Mortgagee') {
      mortgageeOrderAnswers = getMortgageeOrderAnswers(questions, service.latestPolicy.additionalInterests || service.quote.additionalInterests || null);
    }
    return {
      ...initialValues,
      order: mortgageeOrderAnswers.length === 1 ? mortgageeOrderAnswers[0].answer : ''
    };
  };

  render() {
    const {
      handleSubmit,
      pristine,
      policy,
      policy: { additionalInterests },
      questions,
      billingOptions,
      submitting,
      reset: resetForm,
      cashTypeValue
    } = this.props;

    setRank(additionalInterests);
    this.setIsActive(additionalInterests);

    getAnswers('mortgagee', questions).forEach((answer) => {
      answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
    });

    const paymentHistory = _.orderBy(this.props.paymentHistory || [], ['date', 'createdAt'], ['desc', 'desc']);

    paymentHistory.forEach((payment) => {
      payment.amountDisplay = payment.amount.$numberDecimal;
    });

    const validAdditionalInterestTypes = this.checkValidTypes(additionalInterests, this.state.selectedAI || {});

    const cashDescriptionAnswers = this.props.paymentOptions.find(type => type.paymentType === cashTypeValue);

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
                          validate={(value, allValues) => validation.isDateMatchMin10(value, allValues, 'cashDate', 'YYYYMMDD')}
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
                          normalize={this.getPaymentDescription}
                          component={Select}
                          validate={validation.isRequired}
                          answers={_.map(this.props.paymentOptions, type => ({ answer: type.paymentType }))}
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
                          answers={_.map(cashDescriptionAnswers || [], description => ({ answer: description }))}
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
                          validate={value => validation.isRange(value, -1000000, 1000000)}
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
                  <div className="table-view">
                    <BootstrapTable className="" data={paymentHistory} striped hover>
                      <TableHeaderColumn isKey dataField="date" dataFormat={this.dateFormatter} className="date" columnClassName="date" width="150" dataSort>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="type" className="type" columnClassName="type" dataSort width="150" >Type</TableHeaderColumn>
                      <TableHeaderColumn dataField="description" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                      <TableHeaderColumn dataField="batch" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
                      <TableHeaderColumn dataField="amountDisplay" dataFormat={this.amountFormatter} className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
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
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length > 1)} onClick={() => this.addAdditionalInterest('Mortgagee')} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Insured' && ai.active).length > 1)} onClick={() => this.addAdditionalInterest('Additional Insured')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Interest' && ai.active).length > 1)} onClick={() => this.addAdditionalInterest('Additional Interest')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                    <button tabIndex="0" disabled={(policy && (_.filter(policy.additionalInterests, ai => ai.type === 'Premium Finance' && ai.active).length > 0 || _.filter(policy.additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length > 0))} onClick={() => this.addAdditionalInterest('Premium Finance')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Premium Finance</span></div></button>
                    <button tabIndex="0" disabled={(policy && (_.filter(policy.additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length > 0 || _.filter(policy.additionalInterests, ai => ai.type === 'Premium Finance' && ai.active).length > 0))} onClick={() => this.addAdditionalInterest('Bill Payer')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                  </div>
                  <ul className="results result-cards">
                    {additionalInterests && _.sortBy(additionalInterests, ['sortInactive', 'rank', 'order']).map((ai, index) => (
                      <li key={index}>
                        {ai.active &&
                          <a onKeyPress={event => this.editAIOnEnter(event, ai)} onClick={() => this.editAdditionalInterest(ai)}>
                            {/* add className based on type - i.e. mortgagee could have class of mortgagee */}
                            <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                            <section><h4>{ai.name1}&nbsp;{ai.name2}</h4>
                              <p className="address">
                                {`${ai.mailingAddress.address1},
                                  ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
                                  ${ai.mailingAddress.state}
                                  ${ai.mailingAddress.zip}`}
                              </p>
                            </section>
                            <div className="ref-number">
                              <label htmlFor="ref-number">Reference Number</label>
                              <span>{` ${ai.referenceNumber || ' - '}`}</span>
                            </div>
                          </a>
                        }
                        {!ai.active &&
                          <a style={{ cursor: 'not-allowed' }}>
                            <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {'Inactive'}</label></div>
                            <section><h4>{ai.name1}&nbsp;{ai.name2} (Inactive)</h4>
                              <p className="address">
                                {`${ai.mailingAddress.address1},
                                  ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
                                  ${ai.mailingAddress.state}
                                  ${ai.mailingAddress.zip}`}
                              </p>
                            </section>
                            <div className="ref-number">
                              <label htmlFor="ref-number">Reference Number</label>
                              <span>{` ${ai.referenceNumber || ' - '}`}</span>
                            </div>
                          </a>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          {this.state.showAdditionalInterestModal &&
            <AIModal
              isEditing={this.state.isEditingAI}
              isEndorsement={this.state.isEditingAI}
              hideModal={this.hideAdditionalInterestModal}
              initialValues={this.initAdditionalInterestModal()}
              addAdditionalInterestType={this.state.addAdditionalInterestType}
              validAdditionalInterestTypes={validAdditionalInterestTypes}
              selectedAI={this.state.selectedAI}
              additionalInterests={additionalInterests}
              getAnswers={getAnswers}
              getMortgageeOrderAnswers={getMortgageeOrderAnswers}
              getMortgageeOrderAnswersForEdit={getMortgageeOrderAnswersForEdit}
              questions={questions}
              policy={policy}
              verify={this.handleAISubmit}
              deleteAdditionalInterest={this.deleteAdditionalInterest}
              isDeleting={this.state.isDeleting}
            />
          }
        </div>
        {this.state.showBillingEditModal &&
          <BillingModal
            policy={policy}
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

const defaultArray = [];
const selector = formValueSelector('MortgageBilling');
const mapStateToProps = state => ({
  cashTypeValue: selector(state, 'cashType'),
  auth: state.authState,
  billingOptions: state.service.billingOptions,
  initialValues: handleInitialize(state),
  summaryLedger: state.policyState.summaryLedger,
  policy: state.policyState.policy || {},
  paymentHistory: state.service.paymentHistory,
  paymentOptions: state.service.paymentOptions || defaultArray,
  questions: state.questions,
  tasks: state.cg
});

export default connect(mapStateToProps, {
  batchActions,
  getPaymentHistory,
  getPaymentOptionsApplyPayments,
  getBillingOptionsForPolicy,
  getSummaryLedger,
  addTransaction,
  createTransaction,
  getUIQuestions,
  getPolicy
})(reduxForm({
  form: 'MortgageBilling',
  enableReinitialize: true
})(MortgageBilling));
