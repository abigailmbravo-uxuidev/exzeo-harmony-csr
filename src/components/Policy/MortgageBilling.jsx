import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Form, reset, change } from 'redux-form';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as questionsActions from '../../actions/questionsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import PolicyConnect from '../../containers/Policy';
import SelectField from '../Form/inputs/SelectField';
import TextField from '../Form/inputs/TextField';
import CurrencyField from '../Form/inputs/CurrencyField';
import BillingModal from '../../components/Common/BillingEditModal';
import Footer from '../Common/Footer';
import AIModal from '../../components/Common/AdditionalInterestModal';
import AIEditModal from '../../components/Common/AdditionalInterestEditModal';

const payments = [];

export const setRank = (additionalInterests) => {
  _.forEach(additionalInterests, (value) => {
    switch (value.type) {
      case 'Mortgagee':
value.rank = 1; // eslint-disable-line
        break;
      case 'Additional Insured':
value.rank = 2; // eslint-disable-line
        break;
      case 'Additional Interest':
value.rank = 3; // eslint-disable-line
        break;
      case 'Lienholder':
value.rank = 4; // eslint-disable-line
        break;
      case 'Bill Payer':
value.rank = 5; // eslint-disable-line
        break;
      default:
        break;
    }
  });
};

export const setIsActive = (additionalInterests) => {
  _.forEach(additionalInterests, (value) => {
    value.sortInactive = !value.active;
  });
};

export const addAdditionalInterest = (type, props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showAdditionalInterestModal: true, addAdditionalInterestType: type }
  );
};

export const editAdditionalInterest = (ai, props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    {
      ...props.appState.data, showAdditionalInterestEditModal: true, selectedAI: ai, addAdditionalInterestType: ai.type
    }
  );
};

export const hideAdditionalInterestModal = (props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showAdditionalInterestModal: false, showAdditionalInterestEditModal: false }
  );
  props.dispatch(props.reset('AdditionalInterestModal'));
  props.dispatch(props.reset('AdditionalInterestEditModal'));
};

export const editAIOnEnter = (event, ai, props) => {
  if (event.key === 'Enter') {
    editAdditionalInterest(ai, props);
  }
};

export const handleInitialize = (state) => {
  const policy = state.service.latestPolicy || {};
  const values = {};
  values.policyNumber = _.get(policy, 'policyNumber');
  values.cashDescription = '';
  values.cashDate = moment.utc().format('YYYY-MM-DD');
  values.batchNumber = moment.utc().format('YYYYMMDD');

  return values;
};

export const getPaymentDescription = (event, props) => {
  const selectedDescriptionType = _.find(props.paymentOptions, type => type.paymentType === event.target.value) || [];
  const { dispatch } = props;
  dispatch(change('MortgageBilling', 'cashDescription', ''));

  props.actions.appStateActions.setAppState(
    props.appState.modelName,
    props.appState.instanceId, {
      ...props.appState.data, ranService: false, paymentDescription: selectedDescriptionType.paymentDescription, showDescription: true
    }
  );
};

export const hideBillingModal = (props) => {
  props.actions.appStateActions.setAppState(
    props.appState.modelName, props.appState.instanceId,
    { ...props.appState.data, showBillingEditModal: false }
  );
  props.dispatch(props.reset('MortgageBilling'));
};

export const handleAISubmit = (data, dispatch, props) => {
  const { appState, actions, policy } = props;
  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(
    appState.modelName,
    workflowId, {
      ...props.appState.data,
      submittingAI: true
    }
  );
  const additionalInterests = policy.additionalInterests || [];

  const type = data.aiType || appState.data.addAdditionalInterestType;

  let { order } = data;

  const isMortgagee = type === 'Mortgagee';
  // type mortgagee allows the user to select order and the AI edit will pass in order
  if (!isMortgagee && !data._id) {
    order = _.filter(additionalInterests, ai => ai.type === type && ai.active).length === 0 ? 0 : 1;
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

  const offset = new Date(props.policy.effectiveDate).getTimezoneOffset() / 60;


  const submitData = {
    ...aiData,
    ...props.policy,
    endorsementDate: moment(props.policy.effectiveDate).utcOffset(offset),
    transactionType: data._id ? 'AI Update' : 'AI Addition', // eslint-disable-line
    additionalInterests: modifiedAIs
  };

  props.actions.serviceActions.createTransaction(submitData).then(() => {
    props.actions.policyStateActions.updatePolicy(true, props.policy.policyNumber);
    props.actions.appStateActions.setAppState(
      props.appState.modelName, props.appState.instanceId,
      {
        ...props.appState.data,
        submittingAI: false,
        showAdditionalInterestModal: false,
        showAdditionalInterestEditModal: false
      }
    );
    props.dispatch(props.reset('AdditionalInterestModal'));
    props.dispatch(props.reset('AdditionalInterestEditModal'));
  });
};

export const deleteAdditionalInterest = (selectedAdditionalInterest, props) => {
  const { appState, actions, policy } = props;
  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(
    appState.modelName,
    workflowId, {
      ...props.appState.data,
      submittingAI: true,
      showAdditionalInterestModal: appState.data.showAdditionalInterestModal,
      showAdditionalInterestEditModal: appState.data.showAdditionalInterestEditModal
    }
  );

  const additionalInterests = policy.additionalInterests || [];

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
  const offset = new Date(props.policy.effectiveDate).getTimezoneOffset() / 60;

  const submitData = {
    additionalInterestId: selectedAdditionalInterest._id,
    ...policy,
    endorsementDate: moment(props.policy.effectiveDate).utcOffset(offset),
    transactionType: 'AI Removal'
  };

  props.actions.serviceActions.createTransaction(submitData).then(() => {
    props.actions.policyStateActions.updatePolicy(true, props.policy.policyNumber);
    props.actions.appStateActions.setAppState(
      props.appState.modelName, props.appState.instanceId,
      {
        ...props.appState.data,
        submittingAI: false,
        showAdditionalInterestModal: false,
        showAdditionalInterestEditModal: false
      }
    );
    props.dispatch(props.reset('AdditionalInterestModal'));
    props.dispatch(props.reset('AdditionalInterestEditModal'));
  });
};

export const handleBillingFormSubmit = (data, dispatch, props) => {

};

export const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const checkValidTypes = (additionalInterests, selectedAI) => {
  const ais = [];
  if (selectedAI.type === 'Mortgagee' || _.filter(additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length <= 1) ais.push({ answer: 'Mortgagee' });
  if (selectedAI.type === 'Additional Insured' || _.filter(additionalInterests, ai => ai.type === 'Additional Insured' && ai.active).length <= 1) ais.push({ answer: 'Additional Insured' });
  if (selectedAI.type === 'Additional Interest' || _.filter(additionalInterests, ai => ai.type === 'Additional Interest' && ai.active).length <= 1) ais.push({ answer: 'Additional Interest' });
  if (selectedAI.type === 'Lienholder' || _.filter(additionalInterests, ai => ai.type === 'Lienholder' && ai.active).length <= 1) ais.push({ answer: 'Lienholder' });
  if (selectedAI.type === 'Bill Payer' || _.filter(additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length === 0) ais.push({ answer: 'Bill Payer' });
  return ais;
};

export class MortgageBilling extends Component {
  componentWillMount = () => {
    this.props.actions.serviceActions.getPaymentOptionsApplyPayments();
    this.props.actions.appStateActions.setAppState(
      this.props.appState.modelName,
      this.props.appState.instanceId, {
        ...this.props.appState.data, ranService: false, paymentDescription: [], showDescription: false
      }
    );
    this.props.actions.questionsActions.getUIQuestions('additionalInterestsCSR');
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps && nextProps.policy && nextProps.policy.policyNumber && !_.isEqual(this.props.policy, nextProps.policy)) {
      nextProps.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
      nextProps.actions.serviceActions.getPaymentHistory(nextProps.policy.policyNumber);

      const paymentOptions = {
        effectiveDate: nextProps.policy.effectiveDate,
        policyHolders: nextProps.policy.policyHolders,
        additionalInterests: nextProps.policy.additionalInterests,
        currentPremium: nextProps.getSummaryLedger.currentPremium,
        fullyEarnedFees: nextProps.policy.rating.worksheet.fees.empTrustFee + nextProps.policy.rating.worksheet.fees.mgaPolicyFee
      };
      nextProps.actions.serviceActions.getBillingOptionsForPolicy(paymentOptions);
      nextProps.actions.appStateActions.setAppState(
        nextProps.appState.modelName,
        nextProps.appState.instanceId, { ...nextProps.appState.data, ranService: true }
      );
    }
  }

  setBatch = (value) => {
    const { dispatch } = this.props;

    dispatch(change('MortgageBilling', 'cashDate', value));
    dispatch(change('MortgageBilling', 'batchNumber', moment.utc(value).format('YYYYMMDD')));
  }

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;
    this.props.actions.appStateActions.setAppState(
      this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: true }
    );
    submitData.cashDate = moment.utc(data.cashDate);
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d.-]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);
    submitData.companyCode = this.props.auth.userProfile.groups[0].companyCode;
    submitData.policy = this.props.policy;
    this.props.actions.serviceActions.addTransaction(submitData)
      .then(() => {
        this.props.actions.serviceActions.getPaymentHistory(this.props.policy.policyNumber);
        this.props.actions.serviceActions.getSummaryLedger(this.props.policy.policyNumber);
        this.props.actions.appStateActions.setAppState(
          this.props.appState.modelName,
          this.props.appState.instanceId, { ...this.props.appState.data }
        );
      });

    this.clearForm();
  };

  handleBillingEdit = () => {
    const workflowId = this.props.appState.instanceId;
    this.props.actions.appStateActions.setAppState(
      this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, showBillingEditModal: true }
    );
  };


  clearForm = () => {
    const { dispatch } = this.props;
    const workflowId = this.props.appState.instanceId;
    dispatch(reset('MortgageBilling'));
    this.props.actions.appStateActions.setAppState(
      this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: false }
    );
  };

  checkPayments = (batchNumber, transaction) => {
    const found = payments.some(payment => payment.batchNumber === batchNumber);
    if (!found) { payments.push(transaction); }
  }

  amountFormatter = cell => (cell ? Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '');
  dateFormatter = cell => `${cell.substring(0, 10)}`;

  render() {
    const { additionalInterests } = this.props.policy;
    const {
      handleSubmit, pristine, fieldValues, policy, questions
    } = this.props;
    setRank(additionalInterests);
    setIsActive(additionalInterests);

    _.forEach(getAnswers('mortgagee', questions), (answer) => {
      answer.displayText = `${answer.AIName1}, ${answer.AIAddress1}, ${answer.AICity} ${answer.AIState}, ${answer.AIZip}`;
    });

    const paymentHistory = _.orderBy(this.props.paymentHistory || [], ['date', 'createdAt'], ['desc', 'desc']);

    _.forEach(paymentHistory, (payment) => {
      payment.amountDisplay = payment.amount.$numberDecimal;
    });

    const validAdditionalInterestTypes = checkValidTypes(additionalInterests, this.props.appState.data.selectedAI || {});

    return (
      <PolicyConnect>
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              {/* TODO: This section needs to be hidden per role */}
              <section className="add-payment">
                <h3>Add Payment</h3>
                <Form id="MortgageBilling" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required']} label="Cash Date" styleName="" name="cashDate" type="date" onChange={e => this.setBatch(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['matchDateMin10']} label="Batch Number" styleName="" name="batchNumber" dateString={moment.utc(fieldValues.cashDate).format('YYYYMMDD')} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashType"
                          component="select"
                          label="Cash Type"
                          onChange={val => getPaymentDescription(val, this.props)}
                          validations={['required']}
                          answers={_.map(this.props.paymentOptions, type => ({ answer: type.paymentType }))}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashDescription"
                          component="select"
                          label="Description"
                          validations={['required']}
                          answers={_.map(this.props.appState.data.paymentDescription || [], description => ({ answer: description }))}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <CurrencyField
                          validations={['range']}
                          label="Amount"
                          styleName=""
                          name="amount"
                          min={-1000000}
                          max={1000000}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn-footer">
                    <button className="btn btn-secondary" type="button" form="MortgageBilling" onClick={this.clearForm}>Cancel</button>
                    <button className="btn btn-primary" type="submit" form="MortgageBilling" disabled={this.props.appState.data.submitting || pristine}>Save</button>
                  </div>
                </Form>
              </section>
              <section className="payment-summary">
                <h3>Billing <button className="btn btn-link btn-sm" onClick={this.handleBillingEdit}><i className="fa fa-pencil-square" />Edit</button></h3>
                <div className="payment-summary">
                  <dl>
                    <div>
                      <dt>Bill To</dt>
                      <dd>{this.props.policy.billToType}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Bill Plan</dt>
                      <dd>{this.props.policy.billPlan}</dd>
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
                      {this.props.getSummaryLedger && `Payments Received ${this.amountFormatter(this.props.getSummaryLedger.cashReceived.$numberDecimal || '0')}`} <br />
                    </div>
                  </dl>
                </div>
              </section>
              <section className="additional-interests">
                <h3>Additional Interests</h3>
                <div className="results-wrapper">
                  <div className="button-group">
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length > 1)} onClick={() => addAdditionalInterest('Mortgagee', this.props)} className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Insured' && ai.active).length > 1)} onClick={() => addAdditionalInterest('Additional Insured', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Additional Interest' && ai.active).length > 1)} onClick={() => addAdditionalInterest('Additional Interest', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                    { /* <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button> */ }
                    <button tabIndex="0" disabled={(policy && _.filter(policy.additionalInterests, ai => ai.type === 'Bill Payer' && ai.active).length > 0)} onClick={() => addAdditionalInterest('Bill Payer', this.props)} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                  </div>
                  <ul className="results result-cards">
                    {additionalInterests && _.sortBy(additionalInterests, ['sortInactive', 'rank', 'order']).map((ai, index) =>
                      (
                        <li key={index}>
                          { ai.active &&
                          <a onKeyPress={event => editAIOnEnter(event, ai, this.props)} onClick={() => editAdditionalInterest(ai, this.props)}>
                            {/* add className based on type - i.e. mortgagee could have class of mortgagee */}
                            <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                            <section><h4>{ai.name1}&nbsp;{ai.name2}</h4>
                              <p className="address">{
                             `${ai.mailingAddress.address1},
                              ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
                              ${ai.mailingAddress.state}
                              ${ai.mailingAddress.zip}`
                            }
                              </p>
                            </section>
                            <div className="ref-number">
                              <label htmlFor="ref-number">Reference Number</label>
                              <span>{` ${ai.referenceNumber || ' - '}`}</span>
                            </div>
                          </a>}
                          { !ai.active &&
                          <a style={{ cursor: 'not-allowed' }}>
                            <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {'Inactive'}</label></div>
                            <section><h4>{ai.name1}&nbsp;{ai.name2} (Inactive)</h4>
                              <p className="address">{
                           `${ai.mailingAddress.address1},
                            ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
                            ${ai.mailingAddress.state}
                            ${ai.mailingAddress.zip}`
                          }
                              </p>
                            </section>
                            <div className="ref-number">
                              <label htmlFor="ref-number">Reference Number</label>
                              <span>{` ${ai.referenceNumber || ' - '}`}</span>
                            </div>
                          </a>}
                        </li>))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          { this.props.appState.data.showAdditionalInterestEditModal && <AIEditModal additionalInterests={additionalInterests} validAdditionalInterestTypes={validAdditionalInterestTypes} isEndorsement questions={questions} selectedAI={this.props.appState.data.selectedAI} policy={this.props.policy} verify={handleAISubmit} hideAdditionalInterestModal={() => hideAdditionalInterestModal(this.props)} deleteAdditionalInterest={() => deleteAdditionalInterest(this.props.appState.data.selectedAI, this.props)} /> }
          { this.props.appState.data.showAdditionalInterestModal && <AIModal additionalInterests={additionalInterests} questions={questions} policy={this.props.policy} verify={handleAISubmit} hideAdditionalInterestModal={() => hideAdditionalInterestModal(this.props)} /> }
        </div>
        { this.props.appState.data.showBillingEditModal && <BillingModal policy={this.props.policy} billingOptions={this.props.billingOptions} handleBillingFormSubmit={handleBillingFormSubmit} hideBillingModal={() => hideBillingModal(this.props)} /> }
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

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/

const mapStateToProps = state => ({
  questions: state.questions,
  auth: state.authState,
  fieldValues: _.get(state.form, 'MortgageBilling.values', {}),
  getSummaryLedger: state.service.getSummaryLedger,
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy || {},
  tasks: state.cg,
  appState: state.appState,
  paymentHistory: state.service.paymentHistory,
  paymentOptions: state.service.paymentOptions,
  billingOptions: state.service.billingOptions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'MortgageBilling', enableReinitialize: true })(MortgageBilling));
