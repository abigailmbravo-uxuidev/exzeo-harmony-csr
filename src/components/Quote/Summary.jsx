import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, Form, propTypes} from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import QuoteBaseConnect from '../../containers/Quote';
import ClearErrorConnect from '../Error/ClearError';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CheckField from '../Form/inputs/CheckField';
import TextField from '../Form/inputs/TextField';

const handleFormSubmit = (data, dispatch, props) => {
    alert('submit');
};

const handleInitialize = (state) => {
    const formValues = {
        textField1: '',
        billTo: 'Mortgagee',
        billPlan: 'Annual',
        textField2: '5000',
        isActive: true,
        deductible: 200000,
        disabled: true
    };
    return formValues;

};







// ------------------------------------------------
// The render is where all the data is being pulled
//  from the props.
// The quote data data comes from the previous task
//  which is createQuote / singleQuote. This might
//  not be the case in later calls, you may need
//  to pull it from another place in the model
// ------------------------------------------------
export const NotesFiles = (props) => {
    const {handleSubmit} = props;
    return (
        <QuoteBaseConnect>
            <ClearErrorConnect/>
            <div className="route-content verify workflow">

              <form id="QuoteSummary" noValidate>
    <div className="scroll">
      <div className="detail-wrapper">
        <div className="detail-group property-details">
          <h3 className="section-group-header"><i className="fa fa-map-marker" /> Property Details</h3>
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
                <dd>property.physicalAddress.address1</dd>
                <dd>property.physicalAddress.address2</dd>
                <dd>property.physicalAddress.city, property.physicalAddress.state
              property.physicalAddress.zip</dd>
              </div>
            </dl>
            <dl className="property-information">
              <div>
                <dt>Year Built</dt>
                <dd>property.yearBuilt</dd>
              </div>
            </dl>
            <dl className="property-information">
              <div>
                <dt>Flood Zone</dt>
                <dd>property.floodZone</dd>
              </div>
            </dl>
            <dl className="effective-date">
              <div>
                <dt>Effective Date</dt>
                <dd>moment.utc(quoteData.effectiveDate).format('MM/DD/YYYY')</dd>
              </div>
            </dl>
            <dl className="agent">
              <div>
                <dt>Agent</dt>
                <dd>AGENT NAME HERE</dd>
              </div>
            </dl>
          </section>

        </div>
        <div className="detail-group quote-details">
          <h3 className="section-group-header"><i className="fa fa-list" /> Quote Details</h3>
          <section className="display-element">
            <dl>
              <div>
                <dt>Yearly Premium</dt>
                <dd>quoteData.rating.totalPremium</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>A. Dwelling</dt>
                <dd>coverageLimits.dwelling.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>B. Other Structures</dt>
                <dd>coverageLimits.otherStructures.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>C. Personal Property</dt>
                <dd>coverageLimits.personalProperty.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>D. Loss Of Use</dt>
                <dd>coverageLimits.lossOfUse.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>E. Personal Liability</dt>
                <dd>coverageLimits.personalLiability.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>F. Medical Payments</dt>
                <dd>coverageLimits.medicalPayments.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Personal Property Replacement Cost</dt>
                <dd>coverageOptions.personalPropertyReplacementCost.answer</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Mold Property</dt>
                <dd>coverageLimits.moldProperty.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Mold Liability</dt>
                <dd>coverageLimits.moldLiability.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Ordinance or Law</dt>
                <dd>coverageLimits.dwelling.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>All Other Perils Deductible</dt>
                <dd>deductibles.allOtherPerils.amount</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Hurricane Deductible</dt>
                <dd>deductibles.hurricane.calculatedAmount</dd>
              </div>
            </dl>

              <dl>
                <div>
                  <dt>Sinkhole Deductible</dt>
                  <dd>coverageLimits.dwelling.amount</dd>
                </div>
              </dl>

          </section>

        </div>
        <div className="detail-group policyholder-details">
          <h3 className="section-group-header"><i className="fa fa-vcard-o" /> Policyholder Details</h3>
          <section className="display-element">
               <dl>
                 <h4>Primary Secondary Policyholder</h4>
                 <div className="contact-card">
                   <div className="contact-name">
                     <dt>Name</dt>
                     <dd>policyHolder.firstName policyHolder.lastName</dd>
                   </div>
                   <div className="contact-phone">
                     <dt>Phone Number</dt>
                     <dd>policyHolder.primaryPhoneNumber</dd>
                   </div>
                   <div className="contact-email">
                     <dt>Email</dt>
                     <dd>policyHolder.emailAddress</dd>
                   </div>
                 </div>
               </dl>
          </section>
        </div>
        <div className="detail-group mailing-address-details">
          <h3 className="section-group-header"><i className="fa fa-envelope" aria-hidden="true"></i> Mailing Address</h3>
          <section className="display-element">
            <dl>
              <div>
                <dt>Street Address</dt>
                <dd>mailingAddress.address1</dd>
                <dd>mailingAddress.address2</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>City/State/Zip</dt>
                <dd>mailingAddress.city, mailingAddress.state
                  mailingAddress.zip</dd>
              </div>
            </dl>
            <dl>
              <div>
                <dt>Country</dt>
                <dd>mailingAddress mailingAddress.country mailingAddress.country.displayText USA</dd>
              </div>
            </dl>
          </section>

        </div>
        <div className="detail-group additional-interests-details">
          <h3 className="section-group-header"><i className="fa fa-users" /> Additional Interests</h3>
          <section className="display-element additional-interests">
            quoteData.additionalInterests quoteData.additionalInterests.length
              quoteData.additionalInterests.map
              <div className="card">
                <div className="icon-wrapper">
                  <p>handlePrimarySecondaryTitles(additionalInterest.type, additionalInterest.order)</p>
                </div>
                <section>
                  <h4>additionalInterest.name1} additionalInterest.name2</h4>
                  <p>additionalInterest.mailingAddress.address1 additionalInterest.mailingAddress.address2</p>
                  <p>additionalInterest.mailingAddress.city additionalInterest.mailingAddress.state additionalInterest.mailingAddress.zip</p>
                </section>
                <div className="ref-number">
                  <label htmlFor="ref-number">Reference Number</label>
                  <span>additionalInterest.referenceNumber</span>
                </div>
              </div>
          </section>

        </div>
      </div>
      <div className="workflow-steps">
        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'email'} />
        <button
          form="Verify"
          className="btn btn-primary" type=""
        >Share</button>
      </div>

    </div>

  </form>

            </div>
        </QuoteBaseConnect>
    );
};



// ------------------------------------------------
// redux mapping
// ------------------------------------------------
const mapStateToProps = state => ({
    tasks: state.cg,
    appState: state.appState,
    fieldValues: _.get(state.form, 'NotesFiles.values', {}),
    initialValues: handleInitialize(state)
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
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'NotesFiles'})(NotesFiles));
