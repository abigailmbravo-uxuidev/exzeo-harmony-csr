import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, Form, change, propTypes, formValueSelector } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';
import normalizeNumbers from '../Form/normalizeNumbers';

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;
  return quoteData;
};

const handleGetPaymentPlans = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const paymentPlanResult = _.find(taskData.model.variables, { name: 'billingOptionsForMailing' }) ? _.find(taskData.model.variables, { name: 'billingOptionsForMailing' }).value.result : {};
  return paymentPlanResult;
};

const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);
  const values = {};
  values.address1 = _.get(quoteData, 'policyHolderMailingAddress.address1');
  values.address2 = _.get(quoteData, 'policyHolderMailingAddress.address2');
  values.city = _.get(quoteData, 'policyHolderMailingAddress.city');
  values.state = _.get(quoteData, 'policyHolderMailingAddress.state');
  values.zip = _.get(quoteData, 'policyHolderMailingAddress.zip');

  values.billTo = _.get(quoteData, 'billToId');
  values.billToId = _.get(quoteData, 'billToId');
  values.billToType = _.get(quoteData, 'billToType');
  values.billPlan = _.get(quoteData, 'billPlan');
  values.sameAsProperty = false;

  if (_.isEqual(_.get(quoteData, 'policyHolderMailingAddress.address1'), _.get(quoteData, 'property.physicalAddress.address1')) &&
  _.isEqual(_.get(quoteData, 'policyHolderMailingAddress.city'), _.get(quoteData, 'property.physicalAddress.city')) &&
 _.isEqual(_.get(quoteData, 'policyHolderMailingAddress.state'), _.get(quoteData, 'property.physicalAddress.state')) &&
_.isEqual(_.get(quoteData, 'policyHolderMailingAddress.zip'), _.get(quoteData, 'property.physicalAddress.zip'))) {
    values.sameAsProperty = true;
  }

  const paymentPlans = handleGetPaymentPlans(state);

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !values.billTo && !values.billPlan) {
    values.billTo = _.get(paymentPlans.options[0], 'billToId');
    values.billToId = _.get(paymentPlans.options[0], 'billToId');
    values.billToType = _.get(paymentPlans.options[0], 'billToType');
    values.billPlan = 'Annual';
  }

  return values;
};

const getSelectedPlan = (answer) => {
  let selection;

  if (answer === 'Annual') {
    selection = 'annual';
  } else if (answer === 'Semi-Annual') {
    selection = 'semiAnnual';
  } else if (answer === 'Quarterly') {
    selection = 'quarterly';
  }
  return selection;
};

const InstallmentTerm = ({ paymentPlans, payPlans }) => (<div className="installment-term">
  {payPlans && payPlans.map((payPlan, index) => {
    const paymentPlan = paymentPlans[getSelectedPlan(payPlan)];
    return (
      <dl className="column-3" key={index}>
        <div>
          {paymentPlan && paymentPlan.amount && <div>
            <dt><span>Annual</span> Installment Plan</dt>
            <dd>
            $ {normalizeNumbers(paymentPlan.amount)} : {moment.utc(paymentPlan.dueDate).format('MM/DD/YYYY')}
            </dd></div>}
          {paymentPlan && paymentPlan.s1 && paymentPlan.s2 && <div>
            <dt><span>Semi-Annual</span> Installment Plan</dt>
            <dd>
              $ {normalizeNumbers(paymentPlan.s1.amount)} : {moment.utc(paymentPlan.s1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {normalizeNumbers(paymentPlan.s2.amount)} : {moment.utc(paymentPlan.s2.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div>}
          {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 && <div>
            <dt><span>Quarterly</span> Installment Plan</dt>
            <dd>
              $ {normalizeNumbers(paymentPlan.q1.amount)} : {moment.utc(paymentPlan.q1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {normalizeNumbers(paymentPlan.q2.amount)} : {moment.utc(paymentPlan.q2.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {normalizeNumbers(paymentPlan.q3.amount)} : {moment.utc(paymentPlan.q3.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {normalizeNumbers(paymentPlan.q4.amount)} : {moment.utc(paymentPlan.q4.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div> }
        </div>
      </dl>
    );
  })}
</div>);

InstallmentTerm.propTypes = {
  payPlans: PropTypes.any, // eslint-disable-line
  paymentPlans: PropTypes.any // eslint-disable-line
};

const checkQuoteState = quoteData => _.some(['Policy Issued', 'Documents Received'], state => state === quoteData.quoteState);


export class MailingAddressBilling extends Component {

  selectBillTo = () => {
    const { paymentPlanResult, billToValue, dispatch } = this.props;
    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', billToValue]) : {};

    dispatch(change('MailingAddressBilling', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('MailingAddressBilling', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('MailingAddressBilling', 'billPlan', ''));
  };

  selectBillPlan = (value) => {
    const { paymentPlanResult, billToValue, dispatch } = this.props;

    const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', billToValue]) ?
    _.find(paymentPlanResult.options, ['billToId', billToValue]) : {};

    dispatch(change('MailingAddressBilling', 'billToId', currentPaymentPlan.billToId));
    dispatch(change('MailingAddressBilling', 'billToType', currentPaymentPlan.billToType));
    dispatch(change('MailingAddressBilling', 'billPlan', value));
  };

  fillMailForm = () => {
    const { appState, dispatch } = this.props;
    const taskData = this.props.tasks[appState.modelName].data;
    const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};

    if (!this.props.fieldValues.sameAsProperty) {
      dispatch(change('MailingAddressBilling', 'address1', _.get(quoteData, 'property.physicalAddress.address1')));
      dispatch(change('MailingAddressBilling', 'address2', _.get(quoteData, 'property.physicalAddress.address2')));
      dispatch(change('MailingAddressBilling', 'city', _.get(quoteData, 'property.physicalAddress.city')));
      dispatch(change('MailingAddressBilling', 'state', _.get(quoteData, 'property.physicalAddress.state')));
      dispatch(change('MailingAddressBilling', 'zip', _.get(quoteData, 'property.physicalAddress.zip')));
    } else {
      dispatch(change('MailingAddressBilling', 'address1', ''));
      dispatch(change('MailingAddressBilling', 'address2', ''));
      dispatch(change('MailingAddressBilling', 'city', ''));
      dispatch(change('MailingAddressBilling', 'state', ''));
      dispatch(change('MailingAddressBilling', 'zip', ''));
    }
    dispatch(change('MailingAddressBilling', 'sameAsProperty', !this.props.fieldValues.sameAsProperty));
  };

  clearForm = () => {
    const { dispatch } = this.props;
    dispatch(change('MailingAddressBilling', 'address1', ''));
    dispatch(change('MailingAddressBilling', 'address2', ''));
    dispatch(change('MailingAddressBilling', 'city', ''));
    dispatch(change('MailingAddressBilling', 'state', ''));
    dispatch(change('MailingAddressBilling', 'zip', ''));
    dispatch(change('MailingAddressBilling', 'billToId', ''));
    dispatch(change('MailingAddressBilling', 'billToType', ''));
    dispatch(change('MailingAddressBilling', 'billPlan', ''));
    dispatch(change('MailingAddressBilling', 'billTo', ''));
    dispatch(change('MailingAddressBilling', 'sameAsProperty', false));
  }

  handleFormSubmit = () => {
    const { appState, actions, fieldValues } = this.props;
    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName, workflowId, { ...appState.data, submitting: true });

    const submitData = fieldValues;

    const steps = [
      { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
      {
        name: 'askAdditionalCustomerData',
        data: submitData
      },
      {
        name: 'moveTo',
        data: { key: 'mailing' }
      }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
          workflowId, { ...this.props.appState.data, submitting: false, selectedLink: 'mailing' });
      });
  };


  render() {
    const { handleSubmit, paymentPlanResult, pristine, quoteData } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <Form id="MailingAddressBilling" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Mailing Address</h3>

                <section className="mailing-address-details">

                  <RadioField
                    label={'Is the mailing address the same as the property address?'} name={'sameAsProperty'} onChange={this.fillMailForm}
                    segmented answers={[
                      {
                        answer: false,
                        label: 'No'
                      }, {
                        answer: true,
                        label: 'Yes'
                      }
                    ]}
                  />

                  <TextField validations={['required']} label={'Address 1'} styleName={'address-1'} name={'address1'} />

                  <TextField label={'Address 2'} styleName={'address-2'} name={'address2'} />

                  <div className="flex-parent flex-form">
                    <div className="flex-child city">
                      <TextField validations={['required']} label={'City'} styleName={''} name={'city'} />
                    </div>
                    <div className="flex-child state">
                      <TextField
                        name="state" component="select" styleName={''} label="State" validations={['required']}
                      />
                    </div>
                    <div className="flex-child zip">
                      <TextField validations={['required']} label={'Zip'} styleName={''} name={'zip'} />
                    </div>
                  </div>


                </section>

                <section>
                  <h3>Billing</h3>

                  <div className="flex-parent">
                    <div className="flex-child">

                      <SelectFieldBilling
                        name="billTo"
                        component="select"
                        label="Bill To"
                        onChange={this.selectBillTo}
                        validations={['required']}
                        answers={paymentPlanResult.options}
                      />

                      <div className="flex-child">

                        <RadioFieldBilling
                          validations={['required']}
                          name={'billPlan'}
                          label={'Bill Plan'}
                          onChange={this.selectBillPlan}
                          validate={[value => (value ? undefined : 'Field Required')]}
                          segmented
                          answers={_.find(paymentPlanResult.options, ['billToId', this.props.billToValue]) ?
                         _.find(paymentPlanResult.options, ['billToId', this.props.billToValue]).payPlans : []}
                          paymentPlans={paymentPlanResult.paymentPlans}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <InstallmentTerm
                        payPlans={_.find(paymentPlanResult.options, ['billToId', this.props.billToValue]) ?
                                   _.find(paymentPlanResult.options, ['billToId', this.props.billToValue]).payPlans : []}
                        paymentPlans={paymentPlanResult.paymentPlans}
                      />
                    </div>
                  </div>
                </section>
                <div className="btn-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => this.clearForm()}>Cancel</button>
                  <button className="btn btn-primary" type="submit" form="MailingAddressBilling" disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData)}>Update</button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </QuoteBaseConnect>
    );
  }

}
MailingAddressBilling.contextTypes = {
  router: PropTypes.object
};
// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
MailingAddressBilling.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = (state) => {
  const selector = formValueSelector('MailingAddressBilling');
  const billToValue = selector(state, 'billTo');

  return {
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'MailingAddressBilling.values', {}),
    initialValues: handleInitialize(state),
    quoteData: handleGetQuoteData(state),
    paymentPlanResult: handleGetPaymentPlans(state),
    billToValue
  };
};

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'MailingAddressBilling', enableReinitialize: true })(MailingAddressBilling));
