import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, propTypes, Form, change } from 'redux-form';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizeNumber from '../Form/normalizeNumbers';
import RadioField from '../Form/inputs/RadioField';
import SelectField from '../Form/inputs/SelectField';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

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
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};

const handleInitialize = (state) => {
  const values = {};

  return values;
};

export const Payments = ({ payments }) => {
  const options = {
    defaultSortName: 'date',
    defaultSortOrder: 'desc'
  };
  return (
    <BootstrapTable data={payments} options={options}>
      <TableHeaderColumn dataField="date" width="25%" isKey>Date</TableHeaderColumn>
      <TableHeaderColumn dataField="description" width="25%">Description</TableHeaderColumn>
      <TableHeaderColumn dataField="notes" width="25%">Notes</TableHeaderColumn>
      <TableHeaderColumn dataField="amount" width="25%">Amount</TableHeaderColumn>
    </BootstrapTable>
  );
};


const claimsData = [
  {
    jeLossNo: '888888',
    lossID: '44950',
    dateLoss: '06/03/2016',
    reportDate: '06/09/2016',
    closeDate: '06/18/2016',
    lossStatus: ' ',
    lossDesc: 'Ins called in to file a claim for water damage to his living room ceiling.Ins ac handler was clogged causing the drain line to over flow and water starting coming out which effected the living room ceiling. Repairs have been made to the air handler.The damage is to the plaster on the ceiling and drywall.'
  },
  {
    jeLossNo: '999999',
    lossID: '44952',
    dateLoss: '07/12/2016',
    reportDate: '07/14/2016',
    closeDate: '07/29/2016',
    lossStatus: ' ',
    lossDesc: 'Ins called in to file a claim for water damage to his living room ceiling.Ins ac handler was clogged causing the drain line to over flow and water starting coming out which effected the living room ceiling. Repairs have been made to the air handler.The damage is to the plaster on the ceiling and drywall.'
  }];

export const Claims = ({ claims }) => {
  const options = {
    defaultSortName: 'jeLossNo',
    defaultSortOrder: 'desc'
  };
  return (
    // chang to props claims when endpoint is ready
    <BootstrapTable data={claimsData} options={options} >
      <TableHeaderColumn dataField="jeLossNo" width="10%" isKey>JE Loss No</TableHeaderColumn>
      <TableHeaderColumn dataField="lossID" width="10%">Loss ID</TableHeaderColumn>
      <TableHeaderColumn dataField="dateLoss" width="10%">Date Loss</TableHeaderColumn>
      <TableHeaderColumn dataField="reportDate" width="10%">Report Date</TableHeaderColumn>
      <TableHeaderColumn dataField="closeDate" width="10%">Close Date</TableHeaderColumn>
      <TableHeaderColumn dataField="lossStatus" width="20%">Loss Status</TableHeaderColumn>
      <TableHeaderColumn dataField="lossDesc" width="30%" tdStyle={{ whiteSpace: 'normal' }}>Loss Description</TableHeaderColumn>
    </BootstrapTable>
  );
};

export const handleFormSubmit = (data, dispatch, props) => {
  alert('Policy Canceled');
};

export const resetCancelReasons = (props) => {
  props.dispatch(change('CancelPolicy', 'cancelReason', ''));
};

const cancelOptions = [
  {
    cancelType: 'Voluntary Cancellation',
    cancelReason: ['Continuous Wind Coverage - 3 Yrs', 'Duplicate - Similar Coverage', 'Insured Deceased', 'Mortgage Satisfied', 'Other', 'Property Demolished', 'Property Foreclosed', 'Reason Not Provided', 'Rewritten - Similar Coverage', 'Sold']
  },
  {
    cancelType: 'Underwriting Cancellation',
    cancelReason: ['Claims Frequency', 'Claims Severity', 'Condition of Roof', 'Empty Pool', 'Existing/Unrepaired Damage', 'Failure to Comply with Underwriting Request', 'Ineligible Breed of Dog', 'Ineligible Ownership', 'Ineligible Protection Class', 'Ineligible Risk', 'Insured Deceased', 'No Insurable Interest', 'Policy Limits Paid', 'Property in Disrepair', 'Risk Management', 'Slide/Diving Board', 'Tenant Occupied', 'Trampoline', 'Unsecured Pool', 'Vacant']
  },
  {
    cancelType: 'Underwriting Non-Renewal',
    cancelReason: ['Claims Frequency', 'Claims Severity', 'Condition of Roof', 'Empty Pool', 'Existing/Unrepaired Damage', 'Failure to Comply with Underwriting Request', 'Ineligible Breed of Dog', 'Ineligible Ownership', 'Ineligible Protection Class', 'Ineligible Risk', 'Insured Deceased', 'No Insurable Interest', 'Policy Limits Paid', 'Property in Disrepair', 'Risk Management', 'Slide/Diving Board', 'Tenant Occupied', 'Trampoline', 'Unsecured Pool', 'Vacant']
  }
];

let isLoded = false;
export class CancelPolicy extends React.Component {
  componentWillReceiveProps = (nextProps) => {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy.policyNumber && !isLoded) {
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
        this.props.actions.serviceActions.getBillingOptions(paymentOptions);
      }
    }
  }

  render() {
    const { policy, handleSubmit, fieldValues } = this.props;

    const { additionalInterests } = policy;

    setRank(additionalInterests);

    const cancelGroup = _.map(cancelOptions, option => ({ answer: option.cancelType }));
    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper cancel-policy" role="group">
              <Form id="Cancellation" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                <section>
                  <div className="flex-parent">
                    <h3>Cancel Policy</h3>
                    <div className="btn-footer">
                      <Link to={'/policy/coverage'} className="btn btn-secondary">Return</Link>
                      <button type="submit" className="btn btn-danger">Cancel Policy</button>
                    </div>
                  </div>


                  <div className="flex-parent">
                    <div className="flex-child wind-wbdr">
                      <RadioField
                        onChange={() => resetCancelReasons(this.props)}
                        validations={['required']} name={'cancelOptions'} styleName={''} label={'Cancel Options'} segmented
                        answers={cancelGroup}
                      />
                    </div>
                  </div>


                  <div className="flex-parent">


                    <div className="flex-child">

                      <div className="form-group">
                        <label>Effective Date</label>
                        <input type="date" />
                      </div>
                    </div>

                    <div className="flex-child">
                      <SelectField
                        name="cancelReason" component="select" styleName={''} label="Cancel Reason" validations={['required']}
                        answers={_.concat([], _.get(_.find(cancelOptions, option => option.cancelType === fieldValues.cancelOptions), 'cancelReason')).map(reason => ({
                          answer: reason,
                          label: reason
                        }))}
                      />
                    </div>
                  </div>


                </section>
              </Form>
              <section>
                <h3>Payments</h3>

                <div className="form-group flex-parent billing">
                  <div className="flex-child"><label>Bill To</label> <span>{_.get(_.find(_.get(this.props.paymentOptions, 'options'), option => option.billToId === _.get(this.props.summaryLedger, 'billToId')), 'displayText')}</span></div>
                  <div className="flex-child"><label>Bill Plan</label> <span>{_.get(this.props.summaryLedger, 'billPlan')}</span></div>
                  <div className="flex-child"><div className="form-group"><label>Equity Date</label> <input type="date" /></div></div>
                </div>

                <Payments payments={this.props.paymentHistory || []} />


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
  }
}

CancelPolicy.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'CancelPolicy.values', {}),
  initialValues: handleInitialize(state),
  policy: handleGetPolicy(state),
  paymentHistory: state.service.paymentHistory,
  summaryLedger: state.service.getSummaryLedger,
  paymentOptions: state.service.billingOptions
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'CancelPolicy', enableReinitialize: true })(CancelPolicy));
