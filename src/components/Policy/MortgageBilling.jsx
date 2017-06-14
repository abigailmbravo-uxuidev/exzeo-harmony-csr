import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';

const payments = [
  {
    date: '05/27/2017',
    description: 'PAYMENT RECEIVED',
    note: '20170527-44',
    amount: '$ 3,123'
  }
];

const setRank = (additionalInterests) => {
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
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
};

export const PolicyholderAgent = (props) => {
  const { additionalInterests } = props.policy;
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
                    <dd>{props.policy.billToType}
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Bill Plan</dt>
                    <dd>{props.policy.billPlan}</dd>
                  </div>
                </dl>
              </div>
                <h3 className="flex-child">Payments</h3>
              <div className="payment-summary grid">
                <div className="table-view">
                  <BootstrapTable className="" data={payments} striped hover>
                    <TableHeaderColumn isKey dataField="date" className="date" columnClassName="date" width="100" dataSort>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="note" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
                    <TableHeaderColumn dataField="amount" className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
                  </BootstrapTable>
                </div>
                <dl className="total">
                  <div>
                    Total
                    $ 3,123
                  </div>
                </dl>
              </div>
            </section>


            {/* TODO: This section needs to be hidden per role */}
            <section className="add-payment">

              <h3>Add Payment</h3>

                <form id="">



                  <div className="flex-parent">
                      <div className="flex-child">
                        <div className="form-group">
                            <label>Cash Date</label>
                            <input type="date" />
                        </div>
                      </div>
                      <div className="flex-child">
                        <div className="form-group">
                            <label>Batch Number</label>
                            <input type="number" />
                        </div>
                      </div>
                  </div>

                  <div className="flex-parent">
                      <div className="flex-child">
                        <div className="form-group">
                            <label>Cash Type</label>
                              <select>
                                <option>Please Select...</option>
                              </select>
                        </div>
                      </div>
                      <div className="flex-child">
                        <div className="form-group">
                            <label>Cash Description</label>
                              <select>
                                <option>Please Select...</option>
                              </select>
                        </div>
                      </div>
                      <div className="flex-child">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="number" />
                        </div>
                      </div>
                  </div>



                  <div className="btn-footer">
                    <button className="btn btn-secondary" type="button">Cancel</button>
                    <button className="btn btn-primary" type="button" disabled>Save</button>
                  </div>

                </form>


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
                        <section><h4>{ai.name1}&nbsp;{ai.name2}</h4><p className="address">{`${ai.mailingAddress.address1}, ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city}, ${ai.mailingAddress.state} ${ai.mailingAddress.zip}`}</p></section>
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
};

PolicyholderAgent.propTypes = {
  policy: PropTypes.shape()
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const mapStateToProps = state => ({
  policy: handleGetPolicy(state)
});

export default connect(mapStateToProps)(PolicyholderAgent);
