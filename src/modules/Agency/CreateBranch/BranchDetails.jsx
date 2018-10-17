import React from 'react';
import { Field } from 'redux-form';
import { Input, Radio, Phone, Select, validation } from '@exzeo/core-ui';

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
      <hr />
      <Field
        label="Phone 1"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]} />
      <Field
        label="Phone 2"
        styleName="secondaryPhoneNumber"
        name="secondaryPhoneNumber"
        dataTest="secondaryPhoneNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]} />
      <Field
        label="Fax"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]} />
      <Field
        label="CSR Contact Email Address"
        styleName="customerServiceEmailAddress"
        name="customerServiceEmailAddress"
        dataTest="customerServiceEmailAddress"
        component={Input}
        validate={validation.isRequired} />
    </React.Fragment>
  );
};

BranchDetails.propTypes = {};

BranchDetails.defaultProps = {};

export default BranchDetails;
