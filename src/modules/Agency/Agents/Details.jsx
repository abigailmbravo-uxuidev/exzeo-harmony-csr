import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {AutoCompleteChips, Input, Integer, Phone, Radio} from "@exzeo/core-ui/lib/Input/index";
import {validation} from "@exzeo/core-ui/lib/InputLifecycle/index";

const radioStatusAnswers = [
  {
    answer: 'Active',
    label: 'Active'
  }, {
    answer: 'Inactive',
    label: 'Inactive'
  }
];

const Details = ({editType, agencyLicenseArray, isInAgencyLicenseArray}) => {
  return (
    <React.Fragment>
      <Field
        name="agentCode"
        label="Agent ID"
        component={Integer}
        dataTest="agentCode"
        styleName="agentCode"
        validate={[validation.isRequired, validation.isNumbersOnly]}
        disabled={editType === 'Edit'}
        thousandSeparator={false}
      />
      <Field
        name="firstName"
        label="First Name"
        component={Input}
        dataTest="firstName"
        styleName="firstName"
        validate={validation.isRequired}
      />
      <Field
        name="lastName"
        label="Last Name"
        component={Input}
        dataTest="lastName"
        styleName="lastName"
        validate={validation.isRequired}
      />
      <Field
        name="primaryPhoneNumber"
        label="Primary Phone"
        component={Phone}
        dataTest="primaryPhoneNumber"
        styleName="primaryPhoneNumber"
        validate={validation.isRequired}
      />
      <Field
        name="secondaryPhoneNumber"
        label="Secondary Phone"
        component={Phone}
        dataTest="secondaryPhoneNumber"
        styleName="secondaryPhoneNumber"
      />
      <Field
        name="faxNumber"
        label="Fax Number"
        component={Phone}
        dataTest="faxNumber"
        styleName="faxNumber"
      />
      <Field
        name="status"
        label="Status"
        component={Radio}
        dataTest="status"
        styleName="status"
        validate={validation.isRequired}
        answers={radioStatusAnswers}
        segmented
      />
      <Field
        name="emailAddress"
        label="Email Address"
        component={Input}
        dataTest="emailAddress"
        styleName="emailAddress"
        validate={[validation.isRequired, validation.isEmail]}
      />
      <Field
        name="DBA"
        label="Doing Business As Agency"
        component={Input}
        dataTest="DBA"
        styleName="DBA"
      />
      <Field
        name="agencyLicense"
        label="Agency License"
        component={AutoCompleteChips}
        dataTest="agencyLicense"
        styleName="agencyLicense"
        validate={[validation.isRequiredArray, isInAgencyLicenseArray]}
        placeholder="Add license"
        noMatchText="No More Licenses Available"
        autoSuggest={agencyLicenseArray}
      />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
