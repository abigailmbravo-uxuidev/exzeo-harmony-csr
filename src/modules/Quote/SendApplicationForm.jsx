import React from 'react';
import moment from 'moment-timezone';
import { Form, date } from '@exzeo/core-ui';

const SendApplicationForm = ({ className, children, handleSubmit, initialValues }) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true }}>
      {({ handleSubmit, submitting, pristine }) => (
          <form id="sendApplicationForm" className="application" onSubmit={handleSubmit}>
          <div className="card-block user-script">
            <p className="script margin bottom">I need to confirm a few more items prior to sending the application</p>
            <ul>
              <li className="script">Do you have a pool or similar structure on the property?
              <ul>
                  <li className="script">Is it completely fenced, walled, or screened?</li>
                  <li className="script margin bottom">Are there any slides or diving boards?</li>
                </ul>
              </li>
              {initialValues.property && (initialValues.property.floodZone === 'A' || initialValues.property.floodZone === 'V') &&
                <li className="script">Do you maintain a separate flood policy?</li>
              }
              {initialValues.property && (initialValues.property.floodZone === 'A' || initialValues.property.floodZone === 'V') &&
                <li className="scriptInfo margin bottom">Home is in flood zone: {initialValues.property.floodZone}</li>
              }
              <li className="script margin bottom">Does the property have any existing unrepaired damage?</li>
              {initialValues.property && initialValues.property.yearBuilt && initialValues.property.yearBuilt < (Number(date.formatDate(initialValues.effectiveDate, 'YYYY') - 20)) &&
                <li className="script">What is the roof covering on the home?
                  <ul>
                    <li className="scriptInfo">Asphalt, Fiberglass, Composition/Wood Shake Shingles, Built-up Tar and Gravel</li>
                    <li className="script">Is the roof over 20 years old?</li>
                    <li className="scriptInfo margin bottom">Before: {Number(moment.utc(initialValues.effectiveDate).subtract(20, 'years').format('YYYY'))}</li>
                    <li className="scriptInfo">Tile, Slate, Concrete, or Metal</li>
                    <li className="script">Is the roof over 40 years old?</li>
                    <li className="scriptInfo margin bottom">Before: {Number(moment.utc(initialValues.effectiveDate).subtract(40, 'years').format('YYYY'))}</li>
                  </ul>
                </li>
              }
            </ul>
            <hr />
            <p className="scriptInfo">If any adverse information</p>
            <p className="script margin bottom">Your policy request will be referred to Underwriting for review.</p>
            <p className="scriptInfo margin bottom">Click &ldquo;CANCEL&rdquo; below.</p>
            <hr />
            <p className="scriptInfo">If no adverse information</p>
            <p className="script margin bottom">We will generate the Homeowners Application and e-mail it to:</p>
            <ul>
              {initialValues.policyHolders && initialValues.policyHolders[0] && <li className="script"><strong>{`${initialValues.policyHolders[0].firstName} ${initialValues.policyHolders[0].lastName}  (${initialValues.policyHolders[0].emailAddress})`}</strong></li>}
              {initialValues.policyHolders && initialValues.policyHolders[1] && <li className="script"><strong>{`${initialValues.policyHolders[1].firstName} ${initialValues.policyHolders[1].lastName} (${initialValues.policyHolders[1].emailAddress})`}</strong></li>}
            </ul>
            <p className="script margin bottom">
              {initialValues.policyHolders && initialValues.policyHolders.length === 1 && 'Is this the correct email address?'}
              {initialValues.policyHolders && initialValues.policyHolders.length > 1 && 'Are these the correct email addresses?'}
            </p>
            <p className="script margin bottom">Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you.</p>
            <p className="script margin bottom">PLEASE NOTE: All signatures must be completed within 10 days, or the application will expire.</p>
            <p className="script margin bottom">All properties are inspected within 30 days of the effective date. One of our representatives will be in contact with you to schedule it. Please plan to have someone present at the inspection as the inspector will need to enter the home.</p>
            <p className="scriptInfo margin bottom">Click &ldquo;SEND&rdquo; below to generate the Homeowners Application. Once you click &ldquo;SEND&rdquo; no changes can be made to this quote.</p>
          </div>
          {children({ submitting, pristine })}
          </form>
      )}
    </Form>
  );
};

export default SendApplicationForm;
