import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, change } from 'redux-form';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PolicyConnect from '../../containers/Policy';
import RadioField from '../Form/inputs/RadioField';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';
import TextField from '../Form/inputs/TextField';
import HiddenField from '../Form/inputs/HiddenField';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as policyStateActions from '../../actions/policyStateActions';
import Footer from '../Common/Footer';
import Loader from '../Common/Loader';

export const handleInitialize = (state) => {
  const values = {};

  const summaryLedger = state.service.getSummaryLedger || {};

  values.equityDate = summaryLedger.equityDate ? moment.utc(summaryLedger.equityDate).format('MM/DD/YYYY') : '';

  values.effectiveDate = moment.utc().format('YYYY-MM-DD');

  return values;
};

const amountFormatter = cell => cell.$numberDecimal ? Number(cell.$numberDecimal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '';
const dateFormatter = cell => `${cell.substring(0, 10)}`;

export const Payments = ({ payments }) => {
  const options = {
    defaultSortName: 'date',
    defaultSortOrder: 'desc'
  };

  return (
    <BootstrapTable className="" data={payments} options={options} striped hover>
      <TableHeaderColumn isKey dataField="date" dataFormat={dateFormatter} className="date" columnClassName="date" width="150" dataSort>Date</TableHeaderColumn>
      <TableHeaderColumn dataField="type" className="type" columnClassName="type" dataSort width="150" >Type</TableHeaderColumn>
      <TableHeaderColumn dataField="description" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
      <TableHeaderColumn dataField="batch" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
      <TableHeaderColumn dataField="amount" dataFormat={amountFormatter} className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
    </BootstrapTable>
  );
};

export const Claims = ({ claims }) => {
  const claimsData = [];
  const options = {
    defaultSortName: 'jeLossNo',
    defaultSortOrder: 'desc'
  };
  return (
    // chang to props claims when endpoint is ready
    <BootstrapTable data={claimsData} options={options} >
      <TableHeaderColumn isKey dataField="jeLossNo" width="10%">Claim No</TableHeaderColumn>
      <TableHeaderColumn dataField="dateLoss" width="10%">Date Loss</TableHeaderColumn>
      <TableHeaderColumn dataField="reportDate" width="10%">Report Date</TableHeaderColumn>
      <TableHeaderColumn dataField="closeDate" width="10%">Close Date</TableHeaderColumn>
      <TableHeaderColumn dataField="lossStatus" width="20%">Status</TableHeaderColumn>
      <TableHeaderColumn dataField="lossDesc" width="30%" tdStyle={{ whiteSpace: 'normal' }}>Description</TableHeaderColumn>
    </BootstrapTable>
  );
};

export const handleFormSubmit = (data, dispatch, props) => {
  const { policy, summaryLedger } = props;

  const submitData = {
    policyID: policy.policyID,
    policyNumber: policy.policyNumber,
    cancelDate: data.effectiveDate,
    cancelReason: data.cancelReason,
    transactionType: `Pending ${data.cancelType}`,
    equityDate: moment.utc(data.equityDate),
    billingStatus: summaryLedger.status.code
  };

  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, isSubmitting: true });


  props.actions.cgActions.startWorkflow('cancelPolicyModelUI', { policyNumber: props.policy.policyNumber, policyID: props.policy.policyID }).then((result) => {
    const steps = [{
      name: 'cancelPolicySubmit',
      data: submitData
    }];
    const startResult = result.payload ? result.payload[0].workflowData.cancelPolicyModelUI.data : {};

    props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, isSubmitting: true });

    props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
      props.reset('CancelPolicy');
      props.actions.appStateActions.setAppState(startResult.modelName, startResult.modelInstanceId, { ...props.appState.data, isSubmitting: false });
      props.actions.policyStateActions.updatePolicy(true, policy.policyNumber);
    });
  });
};

export const resetCancelReasons = (props) => {
  props.dispatch(change('CancelPolicy', 'cancelReason', ''));
};

export class CancelPolicy extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.policy && nextProps.policy.policyNumber &&
      (!_.isEqual(this.props.summaryLedger, nextProps.summaryLedger) ||
      !_.isEqual(this.props.cancelOptions, nextProps.cancelOptions) ||
      !_.isEqual(this.props.paymentOptions, nextProps.paymentOptions) ||
      !_.isEqual(this.props.summaryLedger, nextProps.summaryLedger))) {
      nextProps.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
      nextProps.actions.serviceActions.getPaymentHistory(nextProps.policy.policyNumber);
      nextProps.actions.serviceActions.getCancelOptions();

      const paymentOptions = {
        effectiveDate: nextProps.policy.effectiveDate,
        policyHolders: nextProps.policy.policyHolders,
        additionalInterests: nextProps.policy.additionalInterests,
        currentPremium: nextProps.summaryLedger.currentPremium,
        fullyEarnedFees: nextProps.policy.rating.worksheet.fees.empTrustFee + nextProps.policy.rating.worksheet.fees.mgaPolicyFee
      };
      nextProps.actions.serviceActions.getBillingOptionsForPolicy(paymentOptions);
    }
  }

  render() {
    const { handleSubmit, fieldValues, cancelOptions, pristine } = this.props;

    const cancelGroup = _.map(cancelOptions, option => ({ answer: option.cancelType }));
    return (
      <PolicyConnect>
        {this.props.appState.data.isSubmitting && <Loader />}
        <Form id="CancelPolicy" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <div className="route-content">
            <div className="scroll">
              <div className="form-group survey-wrapper cancel-policy" role="group">
                <section>
                  <h3>Cancel Policy</h3>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <RadioField
                        onChange={() => resetCancelReasons(this.props)}
                        validations={['required']} name={'cancelType'} styleName={''} label={'Cancel Type'} segmented
                        answers={cancelGroup}
                      />
                    </div>
                    <div className="flex-child">
                      <DateField validations={['required']} label={'Effective Date'} name={'effectiveDate'} />
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <SelectField
                        name="cancelReason" component="select" styleName={''} label="Cancel Reason" validations={['required']}
                        answers={_.concat([], _.get(_.find(cancelOptions, option => option.cancelType === fieldValues.cancelType), 'cancelReason')).map(reason => ({
                          answer: reason,
                          label: reason
                        }))}
                      />
                      {(fieldValues.cancelType === 'Underwriting Cancellation' || fieldValues.cancelType === 'Underwriting Non-Renewal') ?
                        <TextField label={'Additional Reason'} name={'additionalReason'} /> : <HiddenField label={'Additional Reason'} name={'additionalReason'} />
                      }
                    </div>
                  </div>

                </section>
                {/* PAYMENTS SECTION*/}
                <section>
                  <h3>Payments</h3>
                  <div className="form-group flex-parent billing">
                    <div className="flex-child">
                      <label>Bill To</label>
                      <div>{_.get(_.find(_.get(this.props.paymentOptions, 'options'), option => option.billToId === _.get(this.props.summaryLedger, 'billToId')), 'displayText')}</div>
                    </div>
                    <div className="flex-child">
                      <label>Bill Plan</label>
                      <div>{_.get(this.props.summaryLedger, 'billPlan')}</div>
                    </div>
                    <div className="flex-child">
                      <label>Equity Date</label>
                      <TextField disabled name={'equityDate'} />
                    </div>
                  </div>
                  <Payments payments={this.props.paymentHistory || []} />
                </section>
                {/* CLAIMS SECTION*/}
                <section>
                  <h3>Claims</h3>
                  <Claims />
                </section>
              </div>
            </div>
          </div>
          <div className="basic-footer btn-footer">
            <Footer />
            {/* TODO: RESET button should reset form / CANCEL POLICY button should be disabled if form is clean/untouched*/}
            <div className="btn-wrapper">
              <button tabIndex={'0'} disabled={pristine} aria-label="reset-btn form-cancel" type="button" className="btn btn-secondary" onClick={() => this.props.reset('CancelPolicy')}>Reset</button>
              <button tabIndex={'0'} disabled={pristine} aria-label="reset-btn form-cancel" type="submit" className="btn btn-primary">Cancel Policy</button>
            </div>
          </div>
        </Form>
      </PolicyConnect>
    );
  }
}

CancelPolicy.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  userProfile: state.authState.userProfile,
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'CancelPolicy.values', {}),
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy || {},
  paymentHistory: state.service.paymentHistory,
  summaryLedger: state.service.getSummaryLedger,
  paymentOptions: state.service.billingOptions,
  cancelOptions: state.service.cancelOptions || []
});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'CancelPolicy', enableReinitialize: true })(CancelPolicy));
