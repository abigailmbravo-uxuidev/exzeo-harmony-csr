import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import moment from 'moment';
import { reduxForm, Form, change, propTypes } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import RadioField from '../Form/inputs/RadioField';
import TextField from '../Form/inputs/TextField';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';
import normalizeNumbers from '../Form/normalizeNumbers';

export const handleGetQuoteData = (state) => {
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

  values.sameAsProperty = false;

  if (_.isEqual(_.get(quoteData, 'policyHolderMailingAddress.address1'), _.get(quoteData, 'property.physicalAddress.address1')) &&
  _.isEqual(_.get(quoteData, 'policyHolderMailingAddress.city'), _.get(quoteData, 'property.physicalAddress.city')) &&
 _.isEqual(_.get(quoteData, 'policyHolderMailingAddress.state'), _.get(quoteData, 'property.physicalAddress.state')) &&
_.isEqual(_.get(quoteData, 'policyHolderMailingAddress.zip'), _.get(quoteData, 'property.physicalAddress.zip'))) {
    values.sameAsProperty = true;
  }

  const paymentPlans = handleGetPaymentPlans(state);
  const selectedBilling = _.find(paymentPlans.options, ['billToId', _.get(quoteData, 'billToId')]);

  if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !_.get(quoteData, 'billToId') && !_.get(quoteData, 'billPlan')) {
    values.billToId = _.get(paymentPlans.options[0], 'billToId');
    values.billToType = _.get(paymentPlans.options[0], 'billToType');
    values.billPlan = 'Annual';
  } else if (selectedBilling) {
    values.billToId = selectedBilling.billToId;
    values.billToType = selectedBilling.billToType;
    values.billPlan = _.get(quoteData, 'billPlan') || '';
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

export const selectBillTo = (props) => {
  const { dispatch } = props;
  dispatch(change('MailingAddressBilling', 'billPlan', 'Annual'));
};

export const handleFormSubmit = (data, dispatch, props) => {
  const { appState, actions, paymentPlanResult, fieldValues } = props;
  const workflowId = appState.instanceId;
  actions.appStateActions.setAppState(appState.modelName, workflowId, { ...appState.data, submitting: true });

  const submitData = fieldValues;

  const selectedBilling = _.find(paymentPlanResult.options, ['billToId', submitData.billToId]);

  submitData.billToType = selectedBilling.billToType;

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
        props.actions.appStateActions.setAppState(props.appState.modelName,
          workflowId, { ...props.appState.data, submitting: false, selectedLink: 'mailing' });
      });
};

export const clearForm = (props) => {
  const { dispatch } = props;
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
};

<<<<<<< HEAD
export const selectBillPlan = (value, props) => {
  const { paymentPlanResult, fieldValues, dispatch } = props;

  const currentPaymentPlan = _.find(paymentPlanResult.options, ['billToId', fieldValues.billToId]) ?
    _.find(paymentPlanResult.options, ['billToId', fieldValues.billToId]) : {};

  dispatch(change('MailingAddressBilling', 'billToId', currentPaymentPlan.billToId));
  dispatch(change('MailingAddressBilling', 'billToType', currentPaymentPlan.billToType));
  dispatch(change('MailingAddressBilling', 'billPlan', value));
};

=======
>>>>>>> develop
export const fillMailForm = (props) => {
  const { dispatch, quoteData } = props;

  if (!props.fieldValues.sameAsProperty) {
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
  dispatch(change('MailingAddressBilling', 'sameAsProperty', !props.fieldValues.sameAsProperty));
};


export class MailingAddressBilling extends Component {

  componentDidMount() {
    if (this.props.appState.instanceId) {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        submitting: true
      });
      const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'No' } },
    { name: 'moveTo', data: { key: 'mailing' } }
      ];
      const workflowId = this.props.appState.instanceId;

      this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
    .then(() => {
      this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
        ...this.props.appState.data,
        selectedLink: 'mailing'
      });
    });
    }
  }

  render() {
    const { handleSubmit, paymentPlanResult, pristine, quoteData, dirty } = this.props;

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">
          <Form id="MailingAddressBilling" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Mailing Address</h3>

                <section className="mailing-address-details">

                  <RadioField
                    label={'Is the mailing address the same as the property address?'} name={'sameAsProperty'} onChange={() => fillMailForm(this.props)}
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
                        name="billToId"
                        component="select"
                        label="Bill To"
                        onChange={() => selectBillTo(this.props)}
                        validations={['required']}
                        answers={paymentPlanResult.options}
                      />

                      <div className="flex-child bill-plan">

                        <RadioFieldBilling
                          validations={['required']}
                          name={'billPlan'}
                          label={'Bill Plan'}
                          validate={[value => (value ? undefined : 'Field Required')]}
                          segmented
                          answers={_.find(paymentPlanResult.options, ['billToId', this.props.fieldValues.billToId]) ?
                         _.find(paymentPlanResult.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                          paymentPlans={paymentPlanResult.paymentPlans}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <InstallmentTerm
                        payPlans={_.find(paymentPlanResult.options, ['billToId', this.props.fieldValues.billToId]) ?
                                   _.find(paymentPlanResult.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                        paymentPlans={paymentPlanResult.paymentPlans}
                      />
                    </div>
                  </div>
                </section>
                <div className="btn-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => clearForm(this.props)}>Cancel</button>
                  <button className="btn btn-primary" type="submit" form="MailingAddressBilling" disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData) || !this.props.fieldValues.billToId}>Update</button>
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
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'MailingAddressBilling.values', {}),
  initialValues: handleInitialize(state),
  quoteData: handleGetQuoteData(state),
  paymentPlanResult: handleGetPaymentPlans(state)
});

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
