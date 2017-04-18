import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import * as cgActions from '../../actions/cgActions';
import ScheduleDate from '../Common/ScheduleDate';
import { CheckField } from '../Form/inputs';
import Footer from '../Common/Footer';
import * as appStateActions from '../../actions/appStateActions';

// ------------------------------------------------
// List the user tasks that directly tie to
//  the cg tasks.
// ------------------------------------------------
const userTasks = {
  formSubmit: 'askScheduleInspectionDates'
};

// ------------------------------------------------
// This allows the step to be completed in the CG,
//  make sure the data matches what the step needs.
// The appState id comes from props.appState.
// ------------------------------------------------
const scheduleDateModal = (props) => {
  const showScheduleDateModal = props.appState.data.showScheduleDateModal;
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, { showScheduleDateModal: !showScheduleDateModal });
};

const handleFormSubmit = (data, dispatch, props) => {
  const workflowId = props.tasks[props.appState.modelName].data.modelInstanceId;
  const taskName = userTasks.formSubmit;
  const taskData = { ...data };
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });
  props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
};

// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const Verify = (props) => {
  let property = {};
  let coverageLimits = {};
  let coverageOptions = {};
  let mailingAddress = {};

  const { tasks,
    fieldValues,
     appState,
     handleSubmit,
     submitting
   } = props;

  const taskData = (tasks && appState && tasks[appState.modelName]) ? tasks[appState.modelName].data : {};

  const quoteData = taskData && taskData.model &&
   taskData.model.variables &&
   _.find(taskData.model.variables, { name: 'getFinalQuote' }) &&
   _.find(taskData.model.variables, { name: 'getFinalQuote' }).value ?
    _.find(taskData.model.variables, { name: 'getFinalQuote' }).value.result : {};

  if (quoteData) {
    property = quoteData.property;
    coverageLimits = quoteData.coverageLimits;
    coverageOptions = quoteData.coverageOptions;
    mailingAddress = quoteData.policyHolderMailingAddress || {};
  }

  return (
    <div className="route-content verify">
      { quoteData && quoteData.quoteNumber && <div>
        <Form id="Verify" onSubmit={handleSubmit(() => scheduleDateModal(props))} noValidate>
          <div className="scroll">
            <div className="detail-wrapper">
              <div className="detail-group property-details">
                <h3 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h3>
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
                </section>
                <CheckField styleName="verification" name="confirmProperyDetails" label="Verified" isSwitch />
              </div>
              <div className="detail-group quote-details">
                <h3 className="section-group-header"><i className="fa fa-list" /> Quote Details</h3>
                <section className="display-element">
                  <dl>
                    <div>
                      <dt>Yearly Premium</dt>
                      <dd>${quoteData.rating.totalPremium}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>A. Dwelling</dt>
                      <dd>${coverageLimits.dwelling.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>B. Other Structures</dt>
                      <dd>${coverageLimits.otherStructures.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>C. Personal Property</dt>
                      <dd>${coverageLimits.personalProperty.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Personal Property Replacement Cost</dt>
                      <dd>{coverageOptions.personalPropertyReplacementCost.answer ? 'Yes' : 'No'}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Loss Of Use</dt>
                      <dd>${coverageLimits.lossOfUse.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Personal Liability</dt>
                      <dd>${coverageLimits.personalLiability.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Medical Payments</dt>
                      <dd>${coverageLimits.medicalPayments.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Mold Property</dt>
                      <dd>${coverageLimits.moldProperty.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Mold Liability</dt>
                      <dd>${coverageLimits.moldLiability.amount}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Ordinance or Law</dt>
                      <dd>${coverageLimits.dwelling.amount *
                    (coverageLimits.ordinanceOrLaw.amount / 100)}</dd>
                    </div>
                  </dl>
                </section>
                <CheckField styleName="verification" name="confirmQuoteDetails" label="Verified" isSwitch />
              </div>
              <div className="detail-group policyholder-details">
                <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details</h3>
                <section className="display-element">
                  <p>Please check that the below information is up to date and accurate.
                  The policyholder contact information listed below will be used to schedule the required property inspection.
                   Failure to schedule property inspection will result in a failure to bind the policy.</p>
                  {(quoteData.policyHolders && quoteData.policyHolders.length > 0) ?
                 quoteData.policyHolders.map((policyHolder, index) => (
                   _.trim(policyHolder.firstName).length > 0 && <dl key={`ph${index}`}>
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
                <h3 className="section-group-header"><i className="fa fa-envelope-open" /> Mailing Address</h3>
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
                <CheckField styleName="verification" name="confirmPolicyHolderDetails" label="Verify" isSwitch />
              </div>
              <div className="detail-group mailing-address-details">
                <h3 className="section-group-header"><i className="fa fa-users" />additional Interests</h3>
                <section className="display-element">
                  {(quoteData.additionalInterests &&
                quoteData.additionalInterests.length > 0) ?
                quoteData.additionalInterests.map((additionalInterest, index) => (
                  _.trim(additionalInterest.name1).length > 0 && <dl key={`ph${index}`}>
                    <h4>{`${additionalInterest.type}`}</h4>
                    <div>
                      <dt>Name 1</dt>
                      <dd>{`${additionalInterest.name1}`}</dd>
                      <dt>Name 2</dt>
                      <dd>{`${additionalInterest.name2}`}</dd>
                      <dt>Address 1</dt>
                      <dd>{`${additionalInterest.mailingAddress.address1}`}</dd>
                      <dt>Address 2</dt>
                      <dd>{`${additionalInterest.mailingAddress.address2}`}</dd>
                      <dt>City</dt>
                      <dd>{`${additionalInterest.mailingAddress.city}`}</dd>
                      <dt>State</dt>
                      <dd>{`${additionalInterest.mailingAddress.state}`}</dd>
                      <dt>Zip</dt>
                      <dd>{`${additionalInterest.mailingAddress.zip}`}</dd>
                      <dt>Reference Number</dt>
                      <dd>{`${additionalInterest.referenceNumber}`}</dd>
                    </div>
                  </dl>)) : null}
                </section>
                <CheckField styleName="verification" name="confirmAdditionalInterestsDetails" label="Verify" isSwitch />
              </div>
            </div>
            <div className="workflow-steps">
              <button
                form="Verify"
                disabled={!fieldValues.confirmProperyDetails || !fieldValues.confirmQuoteDetails ||
                !fieldValues.confirmPolicyHolderDetails ||
               !fieldValues.confirmAdditionalInterestsDetails || submitting}
                className="btn btn-primary" type=""
              >next</button>
            </div>
            <Footer />
          </div>
        </Form>
      </div>}
      {appState.data.showScheduleDateModal && <ScheduleDate verify={handleFormSubmit} showScheduleDateModal={() => scheduleDateModal(props)} />}
    </div>
  );
};

// ------------------------------------------------
// Property type definitions
// ------------------------------------------------
Verify.propTypes = {
  fieldValues: PropTypes.any,  // eslint-disable-line
  submitting: PropTypes.any, // eslint-disable-line
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape()
  })
};

// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Verify.values', {}),
  showScheduleDateModal: state.appState.data.showScheduleDateModal
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Verify' })(Verify));
