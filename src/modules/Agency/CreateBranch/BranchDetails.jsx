import React from 'react';
import { Field } from 'redux-form';
import { Input, Radio, Select, validation } from '@exzeo/core-ui';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const mailAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];


const BranchDetails = (agencyCodeDisabled) => {
  return (
    <React.Fragment>
      <section className="agency-details">
        <div className="agency-contact">
          <Field
            name="displayName"
            dataTest="displayName"
            styleName="displayName"
            label="Branch Name"
            validate={validation.isRequired}
            component={Input} />
          <Field
            id="status"
            name="status"
            dataTest="status"
            styleName="status"
            label="Status"
            component={Select}
            validate={validation.isRequired}
            answers={statusAnswers} />

        </div>
        <div className="agency-web-address">
          <Field
            label="Web Address"
            styleName="websiteUrl"
            name="websiteUrl"
            dataTest="websiteUrl"
            component={Input}
            validate={[validation.isRequired, validation.isWebAddress]} />
        </div>
        <div className="agemcny-mail">
          <Field
            name="mailCommissionChecksToBranch"
            dataTest="mailCommissionChecksToBranch"
            styleName="mailCommissionChecksToBranch"
            label="Mail Commision Checks to this Branch"
            component={Radio}
            segmented
            answers={mailAnswers} />
          <Field
            name="mailPolicyDocsToBranch"
            dataTest="mailPolicyDocsToBranch"
            styleName="mailPolicyDocsToBranch"
            label="Mail Policy Docs to this Branch"
            component={Radio}
            segmented
            answers={mailAnswers} />

        </div>
      </section>;
    </React.Fragment>
  );
};

BranchDetails.propTypes = {};

BranchDetails.defaultProps = {};

export default BranchDetails;
