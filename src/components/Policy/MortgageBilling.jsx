import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Form, reset, change } from 'redux-form';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import SelectField from '../Form/inputs/SelectField';
import TextField from '../Form/inputs/TextField';
import CurrencyField from '../Form/inputs/CurrencyField';
import BillingModal from '../../components/Common/BillingEditModal';
import Footer from '../Common/Footer';

const payments = [];

let isLoded = false;

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

  props.actions.appStateActions.setAppState(props.appState.modelName,
          props.appState.instanceId, { ...props.appState.data, ranService: false, paymentDescription: selectedDescriptionType.paymentDescription, showDescription: true });
};

export const hideBillingModal = (props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId,
      { ...props.appState.data, showBillingEditModal: false });
};

export const handleBillingFormSubmit = (data, dispatch, props) => {

};

export class MortgageBilling extends Component {

  componentWillMount = () => {
    this.props.actions.serviceActions.getPaymentOptionsApplyPayments();
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          this.props.appState.instanceId, { ...this.props.appState.data, ranService: false, paymentDescription: [], showDescription: false });
  }

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy && nextProps.policy.policyNumber && !isLoded) {
        isLoded = true;
        nextProps.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
        nextProps.actions.serviceActions.getPaymentHistory(nextProps.policy.policyNumber);

        const paymentOptions = {
          effectiveDate: nextProps.policy.effectiveDate,
          policyHolders: nextProps.policy.policyHolders,
          additionalInterests: nextProps.policy.additionalInterests,
          netPremium: nextProps.policy.rating.netPremium,
          fees: {
            empTrustFee: nextProps.policy.rating.worksheet.fees.empTrustFee,
            mgaPolicyFee: nextProps.policy.rating.worksheet.fees.mgaPolicyFee
          },
          totalPremium: nextProps.policy.rating.totalPremium
        };
        nextProps.actions.serviceActions.getBillingOptions(paymentOptions);
        nextProps.actions.appStateActions.setAppState(nextProps.appState.modelName,
          nextProps.appState.instanceId, { ...nextProps.appState.data, ranService: true });
      }
    }
  }

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: true });
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
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
        this.props.appState.instanceId, { ...this.props.appState.data });
    });

    this.clearForm();
  };

  handleBillingEdit = () => {
    const workflowId = this.props.appState.instanceId;
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, showBillingEditModal: true });
  };


  clearForm = () => {
    const { dispatch } = this.props;
    const workflowId = this.props.appState.instanceId;
    dispatch(reset('MortgageBilling'));
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: false });
  };

  setBatch = (value) => {
    const { dispatch } = this.props;

    dispatch(change('MortgageBilling', 'cashDate', value));
    dispatch(change('MortgageBilling', 'batchNumber', moment.utc(value).format('YYYYMMDD')));
  }

  checkPayments = (batchNumber, transaction) => {
    const found = payments.some(payment => payment.batchNumber === batchNumber);
    if (!found) { payments.push(transaction); }
  }

  amountFormatter = cell => cell ? Number(cell).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '';
  dateFormatter = cell => `${cell.substring(0, 10)}`;

  render() {
    const { additionalInterests } = this.props.policy;
    const { handleSubmit, pristine, fieldValues } = this.props;
    setRank(additionalInterests);
    if (!this.props.getSummaryLedger) {
      return (
        <PolicyConnect>
          <ClearErrorConnect />
        </PolicyConnect>);
    }

    const paymentHistory = _.orderBy(this.props.paymentHistory || [], ['date', 'createdAt'], ['desc', 'desc']);

    _.forEach(paymentHistory, (payment) => {
      payment.amountDisplay = payment.amount.$numberDecimal;
    });

    return (
      <PolicyConnect>
        <ClearErrorConnect />
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
                        <TextField validations={['required']} label={'Cash Date'} styleName={''} name={'cashDate'} type={'date'} onChange={e => this.setBatch(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['matchDateMin10']} label={'Batch Number'} styleName={''} name={'batchNumber'} dateString={moment.utc(fieldValues.cashDate).format('YYYYMMDD')} />
                      </div>
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashType" component="select" label="Cash Type" onChange={val => getPaymentDescription(val, this.props)} validations={['required']}
                          answers={_.map(this.props.paymentOptions, type => ({ answer: type.paymentType }))}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashDescription" component="select" label="Description" onChange={function () {}} validations={['required']}
                          answers={_.map(this.props.appState.data.paymentDescription || [], description => ({ answer: description }))}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <CurrencyField
                          validations={['range']} label="Amount" styleName={''} name={'amount'} min={-1000000} max={1000000}
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
                    <button className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                    <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                    <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                    { /* <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => this.addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button> */ }
                    <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                  </div>
                  <ul className="results result-cards">
                    {additionalInterests && _.sortBy(additionalInterests, ['rank', 'type']).map((ai, index) =>
                      <li key={index}>
                        <a>
                          {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                          <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                          <section><h4>{ai.name1}&nbsp;{ai.name2}</h4>
                            <p className="address">{
                             `${ai.mailingAddress.address1},
                              ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city},
                              ${ai.mailingAddress.state}
                              ${ai.mailingAddress.zip}`
                            }</p>
                          </section>
                          <div className="ref-number">
                            <label htmlFor="ref-number">Reference Number</label>
                            <span>{` ${ai.referenceNumber || ' - '}`}</span>
                          </div>
                        </a>
                      </li>
                      )}
                  </ul>
                </div>
              </section>
            </div>
          </div>
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
  policy: PropTypes.shape()
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/

const mapStateToProps = state => ({
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
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'MortgageBilling', enableReinitialize: true })(MortgageBilling));
