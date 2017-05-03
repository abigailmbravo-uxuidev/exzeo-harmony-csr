import React from 'react';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const payments = [
  {
    date: '05/27/2017',
    description: 'PAYMENT RECEIVED',
    note: '20170527-44',
    amount: '$ 3,123'
  }
];

export const PolicyholderAgent = () => {
  return (
    <PolicyConnect>
      <ClearErrorConnect/>
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <h1>Mortgage / Billing</h1>
            <section className="payment-summary">
              <h4>Payment Summary</h4>
              <div className="payment-summary-">
                <dl>
                  <div>
                    <dt>Bill To</dt>
                    <dd>Mortgagee 1
                      <button className="btn btn-link btn-sm"><i className="fa fa-exchange"/>Change</button>
                    </dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Bill Plan</dt>
                    <dd>Annual</dd>
                  </div>
                </dl>
              </div>
              <div className="payment-summary">
                      <div className="table-view">
                        <BootstrapTable className="" data={payments} striped hover>
                          <TableHeaderColumn isKey dataField="date" className="date" columnClassName="date" dataSort>Date</TableHeaderColumn>
                          <TableHeaderColumn dataField="description" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                          <TableHeaderColumn dataField="note" className="note" columnClassName="note" dataSort>Note</TableHeaderColumn>
                          <TableHeaderColumn dataField="amount" className="amount" columnClassName="amount" dataSort>Amount</TableHeaderColumn>
                        </BootstrapTable>
                      </div>
              </div>
            </section>

            <section className="additional-interests">
              <h4>Additional Interests</h4>
              <div className="results-wrapper">
                <ul className="results result-cards">
                  <li>
                    <a>
                      <div className="card-icon">
                        <i className="fa fa-circle Mortgagee"></i>
                        <label>Mortgagee 1</label>
                      </div>
                      <section>
                        <h4>Bank of America</h4>
                        <p className="address">140 MAIN STREET, LARGO, FL 33333</p>
                      </section>
                      {/*<i className="fa fa-pencil"/>*/}
                    </a>
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </div>
      </div>
    </PolicyConnect>
  );
};

export default PolicyholderAgent;
