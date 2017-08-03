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

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return quoteData;
};

const handleInitialize = (state) => {
  const policy = handleGetPolicy(state);

  const values = {};
  values.policyNumber = _.get(policy, 'policyNumber');

  values.cashDate = moment.utc().format('YYYY-MM-DD');
  values.batchNumber = moment.utc().format('YYYYMMDD');

  return values;
};

const getPaymentDescription = (event, props) => {
  const selectedDescriptionType = _.find(props.paymentOptions, type => type.paymentType === event.target.value);

  props.actions.appStateActions.setAppState(props.appState.modelName,
          props.appState.instanceId, { ...props.appState.data, ranService: false, paymentDescription: selectedDescriptionType.paymentDescription, showDescription: true });
};

export class MortgageBilling extends Component {

  componentWillMount = () => {
    this.props.actions.serviceActions.getPaymentOptionsApplyPayments();
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          this.props.appState.instanceId, { ...this.props.appState.data, ranService: false, paymentDescription: [], showDescription: false });
  }

  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy.policyNumber && !isLoded) {
        isLoded = true;
        this.props.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
        this.props.actions.serviceActions.getPaymentHistory(nextProps.policy.policyNumber);
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          this.props.appState.instanceId, { ...this.props.appState.data, ranService: true });
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
    this.props.actions.serviceActions.addTransaction(this.props, submitData)
    .then(() => {
      this.props.actions.serviceActions.getPaymentHistory(this.props.policy.policyNumber);
      this.props.actions.serviceActions.getSummaryLedger(this.props.policy.policyNumber);
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
        this.props.appState.instanceId, { ...this.props.appState.data });
    });

    this.clearForm();
  };

  clearForm = () => {
    const { dispatch } = this.props;
    const workflowId = this.props.appState.instanceId;
    dispatch(reset('PolicyholderAgent'));
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: false });
  };

  setBatch = (value) => {
    const { dispatch } = this.props;

    dispatch(change('PolicyholderAgent', 'batchNumber', moment.utc(value).format('YYYYMMDD')));
  }

  checkPayments = (batchNumber, transaction) => {
    const found = payments.some(payment => payment.batchNumber === batchNumber);
    if (!found) { payments.push(transaction); }
  }

  amountFormatter = cell => cell.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  dateFormatter = cell => `${cell.substring(0, 10)}`;

  render() {
    const { additionalInterests } = this.props.policy;
    const { handleSubmit, pristine } = this.props;
    setRank(additionalInterests);
    if (!this.props.getSummaryLedger) {
      return (
        <PolicyConnect>
          <ClearErrorConnect />
        </PolicyConnect>);
    }

    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="payment-summary">
                <h3>Billing</h3>
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
                    <BootstrapTable className="" data={this.props.paymentHistory || []} striped hover>
                      <TableHeaderColumn isKey dataField="date" dataFormat={this.dateFormatter} className="date" columnClassName="date" width="150" dataSort>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="type" className="type" columnClassName="type" dataSort width="150" >Type</TableHeaderColumn>
                      <TableHeaderColumn dataField="description" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                      <TableHeaderColumn dataField="batch" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
                      <TableHeaderColumn dataField="amount" dataFormat={this.amountFormatter} className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <dl className="total">
                    <div>
                      {this.props.getSummaryLedger && `Payments Received ${this.amountFormatter(this.props.getSummaryLedger.cashReceived)}`} <br />
                    </div>
                  </dl>
                </div>
              </section>


              {/* TODO: This section needs to be hidden per role */}
              <section className="add-payment">

                <h3>Add Payment</h3>

                <Form id="PolicyholderAgent" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Cash Date'} styleName={''} name={'cashDate'} type={'date'} onChange={e => this.setBatch(e.target.value)} />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required', 'minLength10']} label={'Batch Number'} styleName={''} name={'batchNumber'} />
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
                        {this.props.appState.data.paymentDescription &&
                        <SelectField
                          name="cashDescription" component="select" label="Description" onChange={function () {}} validations={['required']}
                          answers={_.map(this.props.appState.data.paymentDescription, description => ({ answer: description }))}
                        />
                        }
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <CurrencyField
                          validations={['required', 'range']} label="Amount" styleName={''} name={'amount'} min={-1000000} max={1000000}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn-footer">
                    <button className="btn btn-secondary" type="button" form="PolicyholderAgent" onClick={this.clearForm}>Cancel</button>
                    <button className="btn btn-primary" type="submit" form="PolicyholderAgent" disabled={this.props.appState.data.submitting || pristine}>Save</button>
                  </div>
                </Form>
              </section>

              <section className="additional-interests">
                <h3>Additional Interests</h3>
                <div className="results-wrapper">
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
  getSummaryLedger: state.service.getSummaryLedger,
  initialValues: handleInitialize(state),
  policy: handleGetPolicy(state),
  tasks: state.cg,
  appState: state.appState,
  paymentHistory: state.service.paymentHistory,
  paymentOptions: state.service.paymentOptions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'PolicyholderAgent', enableReinitialize: true })(MortgageBilling));
