import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Prompt } from 'react-router-dom';
import moment from 'moment';
import { reduxForm, change } from 'redux-form';

import { blockQuote } from '../../state/selectors/quote.selectors';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getBillingOptions } from '../../state/actions/service.actions';
import { getQuote } from '../../state/actions/quote.actions';
import CheckField from '../Form/inputs/CheckField';
import TextField from '../Form/inputs/TextField';
import { RadioFieldBilling, SelectFieldBilling } from '../Form/inputs';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';

const MODEL_NAME = 'csrMailingAddressBilling';
const PAGE_NAME = 'mailing';

export const handleInitialize = (state) => {
  const quoteData = state.quoteState.quote || {};
  const values = {};
  values.address1 = _.get(quoteData, 'policyHolderMailingAddress.address1', '');
  values.address2 = _.get(quoteData, 'policyHolderMailingAddress.address2', '');
  values.city = _.get(quoteData, 'policyHolderMailingAddress.city', '');
  values.state = _.get(quoteData, 'policyHolderMailingAddress.state', '');
  values.zip = _.get(quoteData, 'policyHolderMailingAddress.zip', '');

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

export const InstallmentTerm = ({ paymentPlans, payPlans }) => (
  <div className="installment-term">
    {payPlans && payPlans.map((payPlan, index) => {
    const paymentPlan = paymentPlans[getSelectedPlan(payPlan)];
    return (
      <dl key={index}>
        <div>
          {paymentPlan && paymentPlan.amount &&
          <div>
            <dt><span>Annual</span> Installment Plan</dt>
            <dd>
            $ {normalizeNumbers(paymentPlan.amount)} : {moment.utc(paymentPlan.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div>}
          {paymentPlan && paymentPlan.s1 && paymentPlan.s2 &&
          <div>
            <dt><span>Semi-Annual</span> Installment Plan</dt>
            <dd>
              $ {normalizeNumbers(paymentPlan.s1.amount)} : {moment.utc(paymentPlan.s1.dueDate).format('MM/DD/YYYY')}
            </dd>
            <dd>
              $ {normalizeNumbers(paymentPlan.s2.amount)} : {moment.utc(paymentPlan.s2.dueDate).format('MM/DD/YYYY')}
            </dd>
          </div>}
          {paymentPlan && paymentPlan.q1 && paymentPlan.q2 && paymentPlan.q3 && paymentPlan.q4 &&
          <div>
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
          </div>}
        </div>
      </dl>
    );
  })}
  </div>);

InstallmentTerm.propTypes = {
  payPlans: PropTypes.any, // eslint-disable-line
  paymentPlans: PropTypes.any // eslint-disable-line
};

export const selectBillTo = (props) => {
  const { dispatch } = props;
  dispatch(change('MailingAddressBilling', 'billPlan', 'Annual'));
};

export const handleFormSubmit = async (data, dispatch, props) => {
  const {
    quoteData, billingOptions
  } = props;

  const billToType = ((billingOptions || {}).options.find(o => o.billToId === data.billToId) || {}).billToType || '';

  await props.updateQuote(MODEL_NAME, {
    quoteId: quoteData._id,
    ...data,
    billToType
  }, PAGE_NAME);
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
    const {
      getQuoteAction, getBillingOptionsAction,
      match: { params: { quoteNumber } }
    } = this.props;
    this.setPageLoader(true);


    getQuoteAction(quoteNumber, 'mailing')
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
            }
          };

          getBillingOptionsAction(paymentOptions);
        }
        this.setPageLoader(false);
      });
  }

  setPageLoader = (isSubmitting) => {
    const { setAppStateAction, appState } = this.props;
    setAppStateAction(
      MODEL_NAME, '',
      {
        ...appState.data,
        selectedLink: 'mailing',
        submitting: isSubmitting
      }
    );
  }

  render() {
    const {
      handleSubmit, billingOptions, pristine, quoteData, dirty, editingDisabled
    } = this.props;

    const { options } = billingOptions;

    const noRatingOrNoBillingOptions = (!quoteData.rating || (!options || options.length === 0))

 
    return (
      <React.Fragment>
        <Prompt when={dirty} message="Are you sure you want to leave with unsaved changes?" />
        <div className="route-content">
          <form id="MailingAddressBilling" onSubmit={handleSubmit(handleFormSubmit)} >
            <div className="scroll">
              <div className="form-group survey-wrapper" role="group">
                <h3>Mailing Address</h3>
                <section className="mailing-address">
                  <CheckField
                    styleName="segmented-switch"
                    label="Is the mailing address the same as the property address?"
                    name="sameAsProperty"
                    onChange={() => fillMailForm(this.props)}
                    answers={[
                      {
                        answer: false,
                        label: 'No'
                      }, {
                        answer: true,
                        label: 'Yes'
                      }
                    ]} />
                  <TextField validations={['required']} label="Address 1" styleName="address-1" name="address1" onChange={() => setPropertyToggle(this.props)} />
                  <TextField label="Address 2" styleName="address-2" name="address2" onChange={() => setPropertyToggle(this.props)} />
                  <div className="flex-row">
                    <TextField validations={['required']} label="City" styleName="city" name="city" onChange={() => setPropertyToggle(this.props)} />
                    <TextField
                      onChange={() => setPropertyToggle(this.props)}
                      name="state"
                      component="select"
                      styleName="state"
                      label="State"
                      validations={['required']} />
                    <TextField validations={['required']} label="Zip" styleName="zip" name="zip" onChange={() => setPropertyToggle(this.props)} />
                </div>
                </section>
                { noRatingOrNoBillingOptions && 
                  <section>
                    <div className="route-content">
                      <div className="scroll">
                        <div className="detail-wrapper">
                          <div className="messages">
                            <div className="message error">
                              <i className="fa fa-exclamation-circle" aria-hidden="true" /> &nbsp;Billing cannot be accessed until Premium has been calculated and Coverage Info has been completed.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                }
                { !noRatingOrNoBillingOptions && 
                  <section>
                    <h3>Billing</h3>
                    <SelectFieldBilling
                      name="billToId"
                      component="select"
                      label="Bill To"
                      onChange={() => selectBillTo(this.props)}
                      validations={['required']}
                      answers={billingOptions.options} />
                    <div className="bill-plan">
                      <RadioFieldBilling
                        validations={['required']}
                        name="billPlan"
                        label="Bill Plan"
                        validate={[value => (value ? undefined : 'Field Required')]}
                        segmented
                        answers={_.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]) ?
                      _.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                        paymentPlans={billingOptions.paymentPlans} />
                    </div>
                    <InstallmentTerm
                      payPlans={_.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]) ?
                                _.find(billingOptions.options, ['billToId', this.props.fieldValues.billToId]).payPlans : []}
                      paymentPlans={billingOptions.paymentPlans} />
                  </section>
                }
              </div>
            </div>
          </form>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <button tabIndex="0" aria-label="reset-btn form-mailingBilling" className="btn btn-secondary" type="button" onClick={() => clearForm(this.props)}>Reset</button>
            <button
              tabIndex="0"
              aria-label="submit-btn form-mailingBilling"
              className="btn btn-primary"
              type="submit"
              form="MailingAddressBilling"
              disabled={this.props.appState.data.submitting || pristine || editingDisabled || !this.props.fieldValues.billToId || noRatingOrNoBillingOptions}
              data-test="submit"
            >
              Update
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
MailingAddressBilling.contextTypes = {
  router: PropTypes.object
};

MailingAddressBilling.propTypes = {
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.bool })
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  fieldValues: _.get(state.form, 'MailingAddressBilling.values', {}),
  initialValues: handleInitialize(state),
  quoteData: state.quoteState.quote || {},
  billingOptions: state.service.billingOptions || {},
  editingDisabled: blockQuote(state)
});

export default connect(mapStateToProps, {
  setAppStateAction: setAppState,
  setAppErrorAction: setAppError,
  getBillingOptionsAction: getBillingOptions,
  getQuoteAction: getQuote
})(reduxForm({ form: 'MailingAddressBilling', enableReinitialize: true })(MailingAddressBilling));
