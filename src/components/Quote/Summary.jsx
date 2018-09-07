import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, reset } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';

import TextField from '../Form/inputs/TextField';
import { startWorkflow, batchCompleteTask } from '../../state/actions/cg.actions';
import { setAppState } from '../../state/actions/appState.actions';
import { setAppError } from '../../state/actions/error.actions';
import { getAgents } from '../../state/actions/service.actions';
import { getLatestQuote } from '../../state/actions/quoteState.actions';
import QuoteBaseConnect from '../../containers/Quote';
import normalizePhone from '../Form/normalizePhone';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';
import applyRank from '../Common/additionalInterestRank';

const MODEL_NAME = 'emailQuoteSummaryCSR';

const handlePrimarySecondaryTitles = (type, order) => `${type} ${order + 1}`;

const handleInitialize = () => {
  const values = {};
  values.emailAddr = '';
  values.name = '';

  return values;
};

export const handleFormSubmit = async (data, dispatch, props) => {
  const {
    quoteData, startWorkflowAction, batchCompleteTaskAction, setAppErrorAction
  } = props;

  try {
    const result = await startWorkflowAction(MODEL_NAME, { quoteId: quoteData._id, state: quoteData.state, zip: quoteData.property.physicalAddress.zip });
    const steps = [{ name: 'askEmail', data: { name: data.name, emailAddr: data.emailAddr } }];
    const startResult = result.payload ? result.payload[0].workflowData.emailQuoteSummaryCSR.data : {};
    const wfId = startResult.modelInstanceId;
    await batchCompleteTaskAction(MODEL_NAME, wfId, steps);
    dispatch(reset('Summary'));
  } catch (error) {
    setAppErrorAction(error);
  }
};


export class Summary extends Component {
  componentDidMount() {
    const {
      appState, match: { params: { workflowId, quoteId } }, setAppStateAction, getLatestQuoteAction, getAgentsAction
    } = this.props;
    getAgentsAction('TTIC', 'FL');
    getLatestQuoteAction(true, quoteId);
    setAppStateAction(MODEL_NAME, null, { ...appState.data, submitting: false });
  }

  render() {
    let property = {};
    let coverageLimits = {};
    let coverageOptions = {};
    let mailingAddress = {};
    let deductibles = {};

    const {
      quoteData,
      handleSubmit,
      agents,
      match,
      submitting
    } = this.props;

    let selectedAgent = {};

    if (agents && agents.length > 0 && quoteData && quoteData.agencyCode) {
      selectedAgent = _.find(agents, a => a.agentCode === quoteData.agentCode);
    }

    if (quoteData) {
      property = quoteData.property;
      coverageLimits = quoteData.coverageLimits;
      coverageOptions = quoteData.coverageOptions;
      mailingAddress = quoteData.policyHolderMailingAddress || {};
      deductibles = quoteData.deductibles;
      applyRank(quoteData.additionalInterests);
    }

    const filteredExceptions = _.filter(quoteData.underwritingExceptions, uw => !uw.overridden);


    return (
      <QuoteBaseConnect match={match}>
        <div className="route-content summary workflow">

          <div className="scroll">
            {quoteData && quoteData.underwritingExceptions && filteredExceptions.length > 0 &&
            <div className="detail-wrapper">
              <div className="messages">
                <div className="message error">
                  <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Quote Summary cannot be sent due to Underwriting Validations.
                </div>
              </div>
            </div>
            }
            {quoteData && quoteData.underwritingExceptions && filteredExceptions.length === 0 &&
              <div className="detail-wrapper">
                <h3>Quote Details</h3>
                <div className="detail-group property-details">
                  <section className="display-element">
                    <dl className="quote-number">
                      <div>
                        <dt>Quote Number</dt>
                        <dd>{quoteData.quoteNumber}</dd>
                      </div>
                    </dl>
                    <dl className="property-information">
                      <div>
                        <dt>Property Address</dt>
                        <dd>{property.physicalAddress.address1}</dd>
                        <dd>{property.physicalAddress.address2}</dd>
                        <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${
                        property.physicalAddress.zip}`}
                        </dd>
                      </div>
                    </dl>
                    <dl className="property-information">
                      <div>
                        <dt>Year Built</dt>
                        <dd>{property.yearBuilt}</dd>
                      </div>
                    </dl>
                    <dl className="effective-date">
                      <div>
                        <dt>Effective Date</dt>
                        <dd>{moment.utc(quoteData.effectiveDate).format('MM/DD/YYYY')}</dd>
                      </div>
                    </dl>
                    <dl className="agent">
                      <div>
                        <dt>Agent</dt>
                        <dd>{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</dd>
                      </div>
                    </dl>
                  </section>
                </div>
                <h3>Coverage / Rating</h3>
                <div className="detail-group quote-details">
                  <section className="display-element">
                    <dl>
                      <div>
                        <dt>Yearly Premium</dt>
                        <dd>$ {quoteData.rating ? normalizeNumbers(quoteData.rating.totalPremium) : '-'}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>A. Dwelling</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.dwelling.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>B. Other Structures</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.otherStructures.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>C. Personal Property</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.personalProperty.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>D. Loss Of Use</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.lossOfUse.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>E. Personal Liability</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.personalLiability.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>F. Medical Payments</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.medicalPayments.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Personal Property Replacement Cost</dt>
                        <dd>{coverageOptions.personalPropertyReplacementCost && coverageOptions.personalPropertyReplacementCost.answer === true ? 'Yes' : 'No'}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Mold Property</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.moldProperty.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Mold Liability</dt>
                        <dd>$ {normalizeNumbers(coverageLimits.moldLiability.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Ordinance or Law</dt>
                        <dd>{coverageLimits.ordinanceOrLaw.amount}%</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>All Other Perils Deductible</dt>
                        <dd>$ {normalizeNumbers(deductibles.allOtherPerils.amount)}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Hurricane Deductible</dt>
                        <dd>{deductibles.hurricane.amount}%</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Calculated Hurricane Deductible</dt>
                        <dd>$ {normalizeNumbers(deductibles.hurricane.calculatedAmount)}</dd>
                      </div>
                    </dl>
                    {deductibles.sinkhole && <dl>
                      <div>
                        <dt>Sinkhole Deductible</dt>
                        <dd>{deductibles.sinkhole.amount}%</dd>
                      </div>
                    </dl>
                }
                    {deductibles.sinkhole && <dl>
                      <div>
                        <dt>Calculated Sinkhole Deductible</dt>
                        <dd>$ {normalizeNumbers(deductibles.sinkhole.calculatedAmount)}</dd>
                      </div>
                    </dl>
                }
                  </section>
                </div>
                <div className="detail-group policyholder-details">
                  <section className="display-element">
                    {(quoteData.policyHolders && quoteData.policyHolders.length > 0) ?
                         quoteData.policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
                         <dl key={`ph${index}`}>
                           <h3>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h3>
                           <div className="contact-card">
                             <div className="contact-name">
                               <dt>Policyholder Name</dt>
                               <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                             </div>
                             <div className="contact-phone">
                               <dt>Phone Number</dt>
                               <dd>{normalizePhone(policyHolder.primaryPhoneNumber)}</dd>
                             </div>
                             <div className="contact-email">
                               <dt>Email</dt>
                               <dd>{policyHolder.emailAddress}</dd>
                             </div>
                             <div className="contact-email">
                               <dt>Electronic Delivery</dt>
                               <dd>{policyHolder.electronicDelivery ? 'Yes' : 'No'}</dd>
                             </div>
                           </div>
                         </dl>)) : null}
                  </section>
                </div>
                <h3>Mailing Address</h3>
                <div className="detail-group mailing-address-details">
                  <section className="display-element">
                    <dl>
                      <div>
                        <dt>Address</dt>
                        <dd>{mailingAddress.address1}</dd>
                        <dd>{mailingAddress.address2}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>City/State/Zip</dt>
                        <dd>{mailingAddress.city}, {mailingAddress.state} {mailingAddress.zip}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Country</dt>
                        <dd>{mailingAddress && mailingAddress.country ? mailingAddress.country.displayText : 'USA'}</dd>
                      </div>
                    </dl>
                  </section>
                </div>
                <div className="detail-group additional-interests-details">
                  <section className="display-element additional-interests">
                    <h3>Additional Interests</h3>
                    {(quoteData.additionalInterests && quoteData.additionalInterests.length > 0) ?
                      _.sortBy(quoteData.additionalInterests, ['rank', 'order']).map((additionalInterest, index) => (_.trim(additionalInterest.name1).length > 0 &&
                        <div className="card" key={`ph${index}`}>
                          <div className="card-icon">
                            <i className={`fa ${additionalInterest.type}`} />
                            <label>{handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</label>
                          </div>
                          <section>
                            <h4>{`${additionalInterest.name1}`} {`${additionalInterest.name2 || ''}`}</h4>
                            <p className="address">{`${additionalInterest.mailingAddress.address1}, ${additionalInterest.mailingAddress.address2 ? `${additionalInterest.mailingAddress.address2},` : ''} ${additionalInterest.mailingAddress.city}, ${additionalInterest.mailingAddress.state} ${additionalInterest.mailingAddress.zip}`}</p>
                          </section>
                          <div className="ref-number">
                            <label htmlFor="ref-number">Reference Number</label>
                            <span>{`${additionalInterest.referenceNumber || '-'}`}</span>
                          </div>
                        </div>)) : null}
                  </section>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="share-quote">
          <form id="Summary" onSubmit={handleSubmit(handleFormSubmit)} >
            <TextField validations={['required']} label="Email To Name" styleName="share-name" name="name" />
            <TextField validations={['required', 'email']} label="Email Address" styleName="share-email" name="emailAddr" />
            <button
              tabIndex="0"
              aria-label="submit-btn form-share"
              disabled={submitting}
              form="Summary"
              className="btn btn-primary"
              type="submit">Share
            </button>
          </form>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </QuoteBaseConnect>
    );
  }
}

Summary.contextTypes = {
  router: PropTypes.object
};

Summary.propTypes = {
  match: PropTypes.shape().isRequired,
  handleSubmit: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

const mapStateToProps = state => ({
  agents: state.service.agents,
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Summary.values', {}),
  initialValues: handleInitialize(state),
  showScheduleDateModal: state.appState.data ? state.appState.data.showScheduleDateModal : false,
  showShareConfirmationModal: state.appState.data ? state.appState.data.showShareConfirmationModal : false,
  quoteData: state.service.quote || {}
});


export default connect(mapStateToProps, {
  batchCompleteTaskAction: batchCompleteTask,
  startWorkflowAction: startWorkflow,
  setAppStateAction: setAppState,
  setAppErrorAction: setAppError,
  getAgentsAction: getAgents,
  getLatestQuoteAction: getLatestQuote
})(reduxForm({ form: 'Summary', enableReinitialize: true })(Summary));
