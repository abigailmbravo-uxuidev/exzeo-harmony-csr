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
        label="Agent ID"
        styleName="agentCode"
        name="agentCode"
        dataTest="agentCode"
        validate={[validation.isRequired, validation.isNumbersOnly]}
        disabled={editType === 'Edit'}
        component={Integer}
        thousandSeparator={false}
      />
      <Field
        label="First Name"
        styleName="firstName"
        name="firstName"
        dataTest="firstName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Last Name"
        styleName="lastName"
        name="lastName"
        dataTest="lastName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Primary Phone"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={validation.isRequired}
      />
      <Field
        label="Secondary Phone"
        styleName="secondaryPhoneNumber"
        name="secondaryPhoneNumber"
        dataTest="secondaryPhoneNumber"
        component={Phone}
      />
      <Field
        label="Fax Number"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}/>
      <Field
        label="Status"
        styleName="status"
        name="status"
        dataTest="status"
        component={Radio}
        segmented
        answers={radioStatusAnswers}
        validate={validation.isRequired}
      />
      <Field
        label="Email Address"
        styleName="emailAddress"
        name="emailAddress"
        dataTest="emailAddress"
        component={Input}
        validate={[validation.isRequired, validation.isEmail]}
      />
      <Field
        label="Doing Business As Agency"
        styleName="DBA"
        name="DBA"
        dataTest="DBA"
        component={Input}
      />
      <Field
        label="Agency License"
        styleName="agencyLicense"
        name="agencyLicense"
        dataTest="agencyLicense"
        placeholder="Add license"
        noMatchText="No More Licenses Available"
        autoSuggest={agencyLicenseArray}
        component={AutoCompleteChips}
        validate={[validation.isRequiredArray, isInAgencyLicenseArray]}
      />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
