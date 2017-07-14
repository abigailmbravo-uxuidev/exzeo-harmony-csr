import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Form, reset } from 'redux-form';
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

const payments = [
  // hardcoded example until payment endpoint created
  {
    cashDate: '2017-06-01',
    cashType: 'CASH',
    cashDescription: 'PAYMENT RECEIVED',
    batchNumber: '44556677-88',
    amount: '1337'
  }
];

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

const paymentTotal = () => {
  let total = 0;
  for (let i = 0; i < payments.length; i += 1) {
    if (payments[i].cashDescription === 'PAYMENT RECEIVED') {
      total += payments[i].amount;
    }
    if (payments[i].cashDescription === 'PAYMENT RETURNED') {
      total -= payments[i].amount;
    }
  }
  return total.toLocaleString();
};

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return quoteData;
};

const handleInitialize = (state) => {
  const quoteData = handleGetPolicy(state);

  const values = {};
  values.policyNumber = _.get(quoteData, 'policyNumber');
  return values;
};

export class MortgageBilling extends Component {

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy && nextProps.policy.policyNumber) {
        this.props.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
      }
    }
  }

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: true });

    submitData.cashDate = moment.utc(data.cashDate).format('YYYY-MM-DD');
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);

    payments.push(data);
    this.clearForm();
    paymentTotal();
  };

  clearForm = () => {
    const { dispatch } = this.props;
    const workflowId = this.props.appState.instanceId;

    dispatch(reset('PolicyholderAgent'));
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: false });
  };

  amountFormatter = cell => `$ ${cell.toLocaleString()}`;

  render() {
    const { additionalInterests } = this.props.policy;
    const { handleSubmit, pristine } = this.props;
    setRank(additionalInterests);
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
                    <BootstrapTable className="" data={payments} striped hover>
                      <TableHeaderColumn isKey dataField="cashDate" className="date" columnClassName="date" width="150" dataSort>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="cashType" className="type" columnClassName="type" dataSort width="150" >Type</TableHeaderColumn>
                      <TableHeaderColumn dataField="cashDescription" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                      <TableHeaderColumn dataField="batchNumber" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
                      <TableHeaderColumn dataField="amount" dataFormat={this.amountFormatter} className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <dl className="total">
                    <div>
                      {this.props.getSummaryLedger && `Full Balance $ ${this.props.getSummaryLedger.cashNeeded}`} <br />
                      {this.props.getSummaryLedger && `Total Due Today $ ${this.props.getSummaryLedger.noticeAmountDue}`} <br />
                      {this.props.getSummaryLedger && `Payments Recieved $ ${this.props.getSummaryLedger.cashReceived}`} <br />
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
                        <TextField validations={['required']} label={'Cash Date'} styleName={''} name={'cashDate'} type={'date'} />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Batch Number'} styleName={''} name={'batchNumber'} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashType" component="select" label="Cash Type" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'CASH',
                              label: 'Cash'
                            }, {
                              answer: 'CREDIT',
                              label: 'Credit'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashDescription" component="select" label="Description" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'PAYMENT RECEIVED',
                              label: 'Payment Received'
                            }, {
                              answer: 'PAYMENT RETURNED',
                              label: 'Payment Returned'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <CurrencyField
                          validations={['required']} label="Amount" styleName={''} name={'amount'}
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
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'PolicyholderAgent', enableReinitialize: true })(MortgageBilling));
