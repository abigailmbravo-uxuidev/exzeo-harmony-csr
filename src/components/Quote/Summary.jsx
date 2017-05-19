import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
// import ScheduleDate from '../Common/ScheduleDate';
import TextField from '../Form/inputs/TextField';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import ShareConfirmationModal from '../../components/Common/ShareConfirmationModal';

// const scheduleDateModal = (props) => {
//   const showScheduleDateModal = props.appState.data.showScheduleDateModal;
//   props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showScheduleDateModal: !showScheduleDateModal });
// };

const handlePrimarySecondaryTitles = (type, order) => `${type} ${order + 1}`;

const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }) ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result : {};
  return quoteData;
};

const handleInitialize = () => {
  const values = {};
  values.emailAddr = '';
  values.name = '';

  return values;
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export class Summary extends Component {

  componentWillMount() {
    // const workflowId = this.props.appState.instanceId;
    // const taskName = 'hasUserEnteredData';
    // const taskData = { answer: 'Yes' };
    // this.props.actions.cgActions.completeTask(this.props.appState.modelName, workflowId, taskName, taskData);

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, {
      quote: this.props.quoteData,
      updateWorkflowDetails: true,
      hideYoChildren: false
    });
  }

  handleFormSubmit = (data) => {
    const { appState, actions, dispatch } = this.props;
    const workflowId = appState.instanceId;
    actions.appStateActions.setAppState(appState.modelName,
      workflowId, { submitting: true });


    const steps = [{
      name: 'hasUserEnteredData',
      data: { answer: 'Yes' }
    }, {
      name: 'askEmail',
      data: { name: data.name, emailAddr: data.emailAddr }
    },
    {
      name: 'moveTo',
      data: { key: 'summary' }
    }
    ];

    actions.cgActions.batchCompleteTask(appState.modelName, workflowId, steps)
      .then(() => {
        dispatch(change('Summary', 'emailAddr', ''));
        dispatch(change('Summary', 'name', ''));
        // now update the workflow details so the recalculated rate shows
        actions.appStateActions.setAppState(appState.modelName,
          workflowId, { updateWorkflowDetails: true, showShareConfirmationModal: true });
        // this.context.router.history.push('/quote/coverage');
      });
  };

  hideConfirmationModal = () => {
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, this.props.appState.instanceId, { showShareConfirmationModal: false });
  };

  render() {
    let property = {};
    let coverageLimits = {};
    let coverageOptions = {};
    let mailingAddress = {};
    let deductibles = {};

    const {
      showShareConfirmationModal,
      quoteData,
      tasks,
      appState,
       handleSubmit
     } = this.props;

    const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : {};


    const selectedAgent = _.find(taskData.model.variables, { name: 'getAgentDocument' }) ? _.find(taskData.model.variables, { name: 'getAgentDocument' }).value.result : {};

    if (quoteData) {
      property = quoteData.property;
      coverageLimits = quoteData.coverageLimits;
      coverageOptions = quoteData.coverageOptions;
      mailingAddress = quoteData.policyHolderMailingAddress || {};
      deductibles = quoteData.deductibles;
    }

    return (
      <QuoteBaseConnect>
        <ClearErrorConnect />
        <div className="route-content verify workflow">

          <div className="scroll">

            {quoteData && quoteData.underwritingExceptions && quoteData.underwritingExceptions.length > 0 &&
              <div className="detail-wrapper">

                <div className="messages">
                  <div className="message error">
                    <i className="fa fa-exclamation-circle" aria-hidden="true" />&nbsp;Quote Summary cannot be sent due to Underwriting Validations.
            </div>
                </div>

              </div>
            }
            {quoteData && quoteData.underwritingExceptions && quoteData.underwritingExceptions.length === 0 &&
              <div className="detail-wrapper">
                <div className="workflow-steps">
                  <Form id="Summary" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>
                    <TextField validations={['required']} label={'Name'} styleName={''} name={'name'} />
                    <TextField validations={['required', 'email']} label={'Email Address'} styleName={''} name={'emailAddr'} />
                    <button
                      disabled={this.props.appState.data.submitting}
                      form="Summary"
                      className="btn btn-primary" type="submit"
                    >Share</button>
                  </Form>
                </div>
                <div className="detail-group property-details">
                  <h2 className="section-group-header">Property Details</h2>
                  <section className="display-element">
                    <dl className="quote-number">
                      <div>
                        <dt>Quote Number</dt>
                        <dd>quoteNumber</dd>
                      </div>
                    </dl>
                    <dl className="property-information">
                      <div>
                        <dt>Property Address</dt>
                        <dd>{property.physicalAddress.address1}</dd>
                        <dd>{property.physicalAddress.address2}</dd>
                        <dd>{`${property.physicalAddress.city}, ${property.physicalAddress.state} ${
                        property.physicalAddress.zip}`}</dd>
                      </div>
                    </dl>
                    <dl className="property-information">
                      <div>
                        <dt>Year Built</dt>
                        <dd>{property.yearBuilt}</dd>
                      </div>
                    </dl>
                    <dl className="property-information">
                      <div>
                        <dt>Flood Zone</dt>
                        <dd>{property.floodZone}</dd>
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
                        <dd>{`${selectedAgent.firstName} ${selectedAgent.lastName}` }</dd>
                      </div>
                    </dl>
                  </section>

                </div>
                <div className="detail-group quote-details">
                  <h2 className="section-group-header">Quote Details</h2>
                  <section className="display-element">
                    <dl>
                      <div>
                        <dt>Yearly Premium</dt>
                        <dd>{quoteData.rating ? quoteData.rating.totalPremium : '-'}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>A. Dwelling</dt>
                        <dd>{coverageLimits.dwelling.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>B. Other Structures</dt>
                        <dd>{coverageLimits.otherStructures.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>C. Personal Property</dt>
                        <dd>{coverageLimits.personalProperty.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>D. Loss Of Use</dt>
                        <dd>{coverageLimits.lossOfUse.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>E. Personal Liability</dt>
                        <dd>{coverageLimits.personalLiability.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>F. Medical Payments</dt>
                        <dd>{coverageLimits.medicalPayments.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Personal Property Replacement Cost</dt>
                        <dd>{coverageOptions.personalPropertyReplacementCost.answer}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Mold Property</dt>
                        <dd>{coverageLimits.moldProperty.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Mold Liability</dt>
                        <dd>{coverageLimits.moldLiability.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Ordinance or Law</dt>
                        <dd>{coverageLimits.dwelling.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>All Other Perils Deductible</dt>
                        <dd>{deductibles.allOtherPerils.amount}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>Hurricane Deductible</dt>
                        <dd>{deductibles.hurricane.calculatedAmount}</dd>
                      </div>
                    </dl>

                    <dl>
                      <div>
                        <dt>Sinkhole Deductible</dt>
                        <dd>{coverageLimits.dwelling.amount}</dd>
                      </div>
                    </dl>

                  </section>

                </div>
                <div className="detail-group policyholder-details">
                  <h2 className="section-group-header"> Policyholder Details</h2>
                  <section className="display-element">
                    {(quoteData.policyHolders && quoteData.policyHolders.length > 0) ?
                         quoteData.policyHolders.map((policyHolder, index) => (_.trim(policyHolder.firstName).length > 0 &&
                         <dl key={`ph${index}`}>
                           <h4>{index === 0 ? 'Primary' : 'Secondary'} {'Policyholder'}</h4>
                           <div className="contact-card">
                             <div className="contact-name">
                               <dt>Name</dt>
                               <dd>{`${policyHolder.firstName} ${policyHolder.lastName}`}</dd>
                             </div>
                             <div className="contact-phone">
                               <dt>Phone Number</dt>
                               <dd>{policyHolder.primaryPhoneNumber}</dd>
                             </div>
                             <div className="contact-email">
                               <dt>Email</dt>
                               <dd>{policyHolder.emailAddress}</dd>
                             </div>
                           </div>
                         </dl>)) : null}
                  </section>
                </div>
                <div className="detail-group mailing-address-details">
                  <h2 className="section-group-header">Mailing Address</h2>
                  <section className="display-element">
                    <dl>
                      <div>
                        <dt>Street Address</dt>
                        <dd>{mailingAddress.address1}</dd>
                        <dd>{mailingAddress.address2}</dd>
                      </div>
                    </dl>
                    <dl>
                      <div>
                        <dt>City/State/Zip</dt>
                        <dd>{mailingAddress.city}, {mailingAddress.state}
                          {mailingAddress.zip}</dd>
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
                  <h3 className="section-group-header"><i className="fa fa-users" /> Additional Interests</h3>
                  <section className="display-element additional-interests">
                    {(quoteData.additionalInterests && quoteData.additionalInterests.length > 0) ?
                        quoteData.additionalInterests.map((additionalInterest, index) => (_.trim(additionalInterest.name1).length > 0 &&
                        <div className="card" key={`ph${index}`}>
                          <div className="icon-wrapper">
                            <i className={`fa ${additionalInterest.type}`} />
                            <p>{handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)}</p>
                          </div>
                          <section>
                            <h4>{`${additionalInterest.name1}`} {`${additionalInterest.name2}`}</h4>
                            <p>{`${additionalInterest.mailingAddress.address1}`} {`${additionalInterest.mailingAddress.address2}`}</p>
                            <p>{`${additionalInterest.mailingAddress.city}`}, {`${additionalInterest.mailingAddress.state}`} {`${additionalInterest.mailingAddress.zip}`}</p>
                          </section>
                          <div className="ref-number">
                            <label htmlFor="ref-number">Reference Number</label>
                            <span>{`${additionalInterest.referenceNumber}`}</span>
                          </div>
                        </div>)) : null}
                  </section>
                </div>
              </div>
            }
          </div>
          { showShareConfirmationModal && <ShareConfirmationModal hideShareConfirmationModal={() => this.hideConfirmationModal()} /> }
        </div>
      </QuoteBaseConnect>
    );
  }
}

Summary.contextTypes = {
  router: PropTypes.object
};
// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Summary.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
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
  fieldValues: _.get(state.form, 'Summary.values', {}),
  initialValues: handleInitialize(state),
  showScheduleDateModal: state.appState.data.showScheduleDateModal,
  showShareConfirmationModal: state.appState.data.showShareConfirmationModal,
  quoteData: handleGetQuoteData(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Summary' })(Summary));
