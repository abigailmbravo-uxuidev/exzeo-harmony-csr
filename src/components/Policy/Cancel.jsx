import React, { PropTypes } from 'react';
var ReactDOM = require('react-dom');
import { connect } from 'react-redux';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizeNumber from '../Form/normalizeNumbers';



const payments = [
  {
    date: '05/27/2017',
    description: 'PAYMENT RECEIVED',
    note: '20170527-44',
    amount: `$ ${normalizeNumber(3123)}`
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




var paymentsData = [{
  date: "3/07/2016",
  description: "Payment Received",
  notes: "2016030739",
  amount: "$ 4,142.00"
},{
      date: "3/31/2016",
      description: "Payment Transfer",
      notes: "20160331_TFR",
      amount: "($ 1,876.00)"
  }];

  class Payments extends React.Component {
    render() {
      const options = {
        defaultSortName: 'date',
        defaultSortOrder: 'desc'
      };
      return (
        <BootstrapTable data={ paymentsData } options={ options }>
          <TableHeaderColumn dataField='date' width="25%" isKey>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='description' width="25%">Description</TableHeaderColumn>
          <TableHeaderColumn dataField='notes' width="25%">Notes</TableHeaderColumn>
          <TableHeaderColumn dataField='amount' width="25%">Amount</TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }



  var claimsData = [
    {
          jeLossNo: "888888",
          lossID: "44950",
          dateLoss: "06/03/2016",
          reportDate: "06/09/2016",
          closeDate: "06/18/2016",
          lossStatus: " ",
          lossDesc: "Ins called in to file a claim for water damage to his living room ceiling.Ins ac handler was clogged causing the drain line to over flow and water starting coming out which effected the living room ceiling. Repairs have been made to the air handler.The damage is to the plaster on the ceiling and drywall."
      },
    {
        jeLossNo: "999999",
        lossID: "44952",
        dateLoss: "07/12/2016",
        reportDate: "07/14/2016",
        closeDate: "07/29/2016",
        lossStatus: " ",
        lossDesc: "Ins called in to file a claim for water damage to his living room ceiling.Ins ac handler was clogged causing the drain line to over flow and water starting coming out which effected the living room ceiling. Repairs have been made to the air handler.The damage is to the plaster on the ceiling and drywall."
    } ];

    class Claims extends React.Component {
      render() {
        const options = {
          defaultSortName: 'jeLossNo',
          defaultSortOrder: 'desc'
        };
        return (
          <BootstrapTable data={ claimsData } options={options} >
            <TableHeaderColumn dataField='jeLossNo' width="10%" isKey>JE Loss No</TableHeaderColumn>
            <TableHeaderColumn dataField='lossID' width="10%">Loss ID</TableHeaderColumn>
            <TableHeaderColumn dataField='dateLoss' width="10%">Date Loss</TableHeaderColumn>
            <TableHeaderColumn dataField='reportDate' width="10%">Report Date</TableHeaderColumn>
            <TableHeaderColumn dataField='closeDate' width="10%">Close Date</TableHeaderColumn>
            <TableHeaderColumn dataField='lossStatus' width="20%">Loss Status</TableHeaderColumn>
            <TableHeaderColumn dataField='lossDesc' width="30%" tdStyle={ { whiteSpace: 'normal' } }>Loss Description</TableHeaderColumn>
          </BootstrapTable>
        );
      }
    }

export const PolicyholderAgent = (props) => {
  const { additionalInterests } = props.policy;
  setRank(additionalInterests);
  return (
    <PolicyConnect>
      <ClearErrorConnect />
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper cancel-policy" role="group">
            <form id="cancellation">
            <section>
              <div className="flex-parent">
              <h3>Cancel Policy</h3>
              <div className="btn-footer">
                <button className="btn btn-secondary">Return</button>
                <button className="btn btn-danger">Cancel Policy</button>
              </div>
            </div>

            <div className="form-group segmented name" role="group">
              <label className="group-label label-segmented">Cancellation Type</label>
              <div className="segmented-answer-wrapper">
                <div className="radio-column-3">
                <label className="label-segmented">
                  <input type="radio" value="" />
                    <span>Voluntary Non Renewal</span>
                    </label>
                    </div>
                  <div className="radio-column-3">
                    <label className="label-segmented">
                      <input type="radio" value="" />
                        <span>Voluntary Cancellation</span>

                        </label>

                        </div>
                        <div className="radio-column-3">
                          <label className="label-segmented">
                            <input type="radio"  value="Other" />
                              <span>Involuntary Cancellation-Underwriting</span>

                              </label></div>

                              </div>

                              </div>


              <div className="form-group eff-date">
                <label>Effective Date</label>
                <input type="date" />
              </div>

              <div className="flex-parent">

              <div className="form-group reason">
                <label>Reason</label>
                <select>
                  <option>Please Select</option>
                </select>
              </div>
              <div className="form-group reason">
                <label>&nbsp;</label>
                <input type="text" />
              </div>
            </div>


            </section>


            <section>

              <h3>Policy Notes</h3>


                <div className="form-group note-type">
                  <label></label>
                  <select>
                    <option>Please Select</option>
                  </select>
                </div>

                <div className="form-group note">
                  <label>&nbsp;</label>
                  <textarea>

                  </textarea>
                </div>

            </section>
</form>


            <section>
              <h3>Payments</h3>

            <div className="form-group flex-parent billing">
              <div className="flex-child"><label>Bill To</label> <span>Semi-Annual to Policyholder</span></div>
              <div className="flex-child"><label>Bill Plan</label> <span>Semi-Annual</span></div>
            </div>

                <Payments />



            </section>

            <section>
              <h3>Claims</h3>

              <Claims />




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
