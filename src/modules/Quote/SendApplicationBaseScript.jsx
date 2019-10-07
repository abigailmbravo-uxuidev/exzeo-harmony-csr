import React from 'react';
import { PRODUCT_DESCRIPTION } from '../../utilities/entityDetails';

const SendApplicationBaseScript = ({ initialValues }) => {
  return (
    <React.Fragment>
      <p className="script margin bottom">
        We will generate the {PRODUCT_DESCRIPTION[initialValues.product]}{' '}
        Application and e-mail it to:
      </p>
      <ul>
        {initialValues.policyHolders && initialValues.policyHolders[0] && (
          <li className="script">
            <strong>{`${initialValues.policyHolders[0].firstName} ${initialValues.policyHolders[0].lastName}  (${initialValues.policyHolders[0].emailAddress})`}</strong>
          </li>
        )}
        {initialValues.policyHolders && initialValues.policyHolders[1] && (
          <li className="script">
            <strong>{`${initialValues.policyHolders[1].firstName} ${initialValues.policyHolders[1].lastName} (${initialValues.policyHolders[1].emailAddress})`}</strong>
          </li>
        )}
      </ul>
      <p className="script margin bottom">
        {initialValues.policyHolders &&
          initialValues.policyHolders.length === 1 &&
          'Is this the correct email address?'}
        {initialValues.policyHolders &&
          initialValues.policyHolders.length > 1 &&
          'Are these the correct email addresses?'}
      </p>
      <p className="script margin bottom">
        Once all electronic signatures have been received, the policy will
        automatically be bound and the policy documents will be emailed to you.
      </p>
      <p className="script margin bottom">
        PLEASE NOTE: All signatures must be completed within 10 days, or the
        application will expire.
      </p>
      <p className="script margin bottom">
        All properties are inspected within 30 days of the effective date. One
        of our representatives will be in contact with you to schedule it.
        Please plan to have someone present at the inspection as the inspector
        will need to enter the home.
      </p>
      <p className="scriptInfo margin bottom">
        Click &ldquo;SEND&rdquo; below to generate the{' '}
        {PRODUCT_DESCRIPTION[initialValues.product]} Application. Once you click
        &ldquo;SEND&rdquo; no changes can be made to this quote.
      </p>
    </React.Fragment>
  );
};

export default SendApplicationBaseScript;
