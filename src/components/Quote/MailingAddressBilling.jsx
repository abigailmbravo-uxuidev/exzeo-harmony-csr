import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import moment from 'moment';
import { reduxForm, change } from 'redux-form';
import * as cgActions from '../../state/actions/cgActions';
import * as appStateActions from '../../state/actions/appStateActions';
import * as quoteStateActions from '../../state/actions/quoteStateActions';
import * as serviceActions from '../../state/actions/serviceActions';
import QuoteBaseConnect from '../../containers/Quote';
import CheckField from '../Form/inputs/CheckField';
import TextField from '../Form/inputs/TextField';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrQuote';

export const handleInitialize = (state) => {
  const quoteData = state.service.quote || {};
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

  const billingOptions = state.service.billingOptions || {};
  const selectedBilling = _.find(billingOptions.options, ['billToId', _.get(quoteData, 'billToId')]);

  if (billingOptions && billingOptions.options && billingOptions.options.length === 1 && !_.get(quoteData, 'billToId') && !_.get(quoteData, 'billPlan')) {
    values.billToId = _.get(billingOptions.options[0], 'billToId');
    values.billToType = _.get(billingOptions.options[0], 'billToType');
    values.billPlan = 'Annual';
  } else if (selectedBilling) {
    values.billToId = selectedBilling.billToId;
    values.billToType = selectedBilling.billToType;
    values.billPlan = _.get(quoteData, 'billPlan') || '';
  }

  return values;
};

export const getSelectedPlan = (answer) => {
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

export const InstallmentTerm = ({ paymentPlans, payPlans }) => (<div className="installment-term">
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
  const { appState, actions, billingOptions, fieldValues, match, quoteData } = props;
  const workflowId = match.params.workflowId;

  actions.appStateActions.setAppState(MODEL_NAME, workflowId, { ...appState.data, submitting: true });

  const submitData = fieldValues;

  const selectedBilling = _.find(billingOptions.options, ['billToId', submitData.billToId]);

  submitData.billToType = selectedBilling.billToType;

  const steps = [
    { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
    { name: 'askAdditionalCustomerData', data: submitData },
    { name: 'moveTo', data: { key: 'mailing' } }
  ];

  actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps)
      .then(() => {
        actions.quoteStateActions.getLatestQuote(true, props.quoteData._id);

        if (_.isEqual(data.address1, _.get(quoteData, 'property.physicalAddress.address1')) &&
          _.isEqual(data.city, _.get(quoteData, 'property.physicalAddress.city')) &&
          _.isEqual(data.state, _.get(quoteData, 'property.physicalAddress.state')) &&
          _.isEqual(data.zip, _.get(quoteData, 'property.physicalAddress.zip'))) {

          dispatch(change('MailingAddressBilling', 'sameAsProperty', true));

        } else {
          dispatch(change('MailingAddressBilling', 'sameAsProperty', false));
        }
        actions.appStateActions.setAppState(MODEL_NAME, workflowId,
          { ...appState.data, submitting: false, selectedLink: 'mailing' }
          );
      });
};

export const clearForm = (props) => {
  props.reset('MailingAddressBilling');
};

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

const setPropertyToggle = (props) => {
  const { dispatch } = props;

  dispatch(change('MailingAddressBilling', 'sameAsProperty', false));
};

export class MailingAddressBilling extends Component {

  componentDidMount() {
    const { actions, appState, match } = this.props;
    const workflowId = match.params.workflowId;

    if (workflowId) {
      actions.appStateActions.setAppState(MODEL_NAME, workflowId,
        {
          ...appState.data,
          submitting: true
        }
      );

      const steps = [
        {
          name: 'hasUserEnteredData',
          data: { answer: 'No' }
        },
        {
          name: 'moveTo',
          data: { key: 'mailing' }
        }
      ];

      actions.serviceActions.getQuote(match.params.quoteId)
        .then((quoteData) => {
          if (quoteData && quoteData.rating) {
            const paymentOptions = {
              effectiveDate: quoteData.effectiveDate,
              policyHolders: quoteData.policyHolders,
              additionalInterests: quoteData.additionalInterests,
              netPremium: quoteData.rating.netPremium,
              totalPremium: quoteData.rating.totalPremium,
              fees: {
                empTrustFee: quoteData.rating.worksheet.fees.empTrustFee,
                mgaPolicyFee: quoteData.rating.worksheet.fees.mgaPolicyFee
              },
            };

            actions.serviceActions.getBillingOptions(paymentOptions);
          }
        });

      actions.cgActions.batchCompleteTask(MODEL_NAME, workflowId, steps);
      actions.appStateActions.setAppState(MODEL_NAME, workflowId,
        {
          ...appState.data,
          selectedLink: 'mailing'
        }
      );
    }
  }

  render() {
    const { handleSubmit, billingOptions, pristine, quoteData, dirty, match } = this.props;

    if (!quoteData.rating) {
      return (
        <QuoteBaseConnect match={match}>
          <div className="route-content">
            <div className="messages">
              <div className="message error">
                <i className="fa fa-exclamation-circle" aria-hidden="true" /> &nbsp;Mailing / Billing cannot be accessed until Premium calculated.
            </div>
            </div>
          </div>
        </QuoteBaseConnect>
      );
    }
    return (
      <QuoteBaseConnect match={match}>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">
          <form id="MailingAddressBilling" onSubmit={handleSubmit(handleFormSubmit)} >
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Mailing Address</h3>
                <section className="mailing-address-details">
                  <CheckField
                    styleName={'segmented-switch'} label={'Is the mailing address the same as the property address?'} name={'sameAsProperty'} onChange={() => fillMailForm(this.props)}
                    answers={[
                      {
                        answer: false,
                        label: 'No'
                      }, {
                        answer: true,
                        label: 'Yes'
                      }
                    ]}
                  />
                  <TextField validations={['required']} label={'Address 1'} styleName={'address-1'} name={'address1'} onChange={() => setPropertyToggle(this.props)} />
                  <TextField label={'Address 2'} styleName={'address-2'} name={'address2'} onChange={() => setPropertyToggle(this.props)} />
                  <div className="flex-parent flex-form">
                    <div className="flex-child city">
                      <TextField validations={['required']} label={'City'} styleName={''} name={'city'} onChange={() => setPropertyToggle(this.props)} />
                    </div>
                    <div className="flex-child state">
                      <TextField
                        onChange={() => setPropertyToggle(this.props)}
                        name="state" component="select" styleName={''} label="State" validations={['required']}
                      />
                    </div>
                    <div className="flex-child zip">
                      <TextField validations={['required']} label={'Zip'} styleName={''} name={'zip'} onChange={() => setPropertyToggle(this.props)} />
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
                        answers={billingOptions.options}
                      />
                      <div className="flex-child bill-plan">
                        <RadioFieldBilling
                          validations={['required']}
                          name={'billPlan'}
                          label={'Bill Plan'}
                          validate={[value => (value ? undefined : 'Field Required')]}
                          segmented
                          answers={_.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]) ?
                         _.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                          paymentPlans={billingOptions.paymentPlans}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-parent">
                    <div className="flex-child">
                      <InstallmentTerm
                        payPlans={_.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]) ?
                                   _.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                        paymentPlans={billingOptions.paymentPlans}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button tabIndex={'0'} aria-label="reset-btn form-mailingBilling" className="btn btn-secondary" type="button" onClick={() => clearForm(this.props)}>Reset</button>
            <button tabIndex={'0'} aria-label="submit-btn form-mailingBilling" className="btn btn-primary" type="submit" form="MailingAddressBilling" disabled={this.props.appState.data.submitting || pristine || checkQuoteState(quoteData) || !this.props.fieldValues.billToId}>Update</button>
          </div>
        </div>
      </QuoteBaseConnect>
    );
  }

}
MailingAddressBilling.contextTypes = {
  router: PropTypes.object
};

MailingAddressBilling.propTypes = {
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'MailingAddressBilling.values', {}),
  initialValues: handleInitialize(state),
  quoteData: state.service.quote || {},
  billingOptions: state.service.billingOptions || {}
});

const mapDispatchToProps = dispatch => ({
  actions: {
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'MailingAddressBilling', enableReinitialize: true })(MailingAddressBilling));
