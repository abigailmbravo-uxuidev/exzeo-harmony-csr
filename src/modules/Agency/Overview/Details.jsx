import React from 'react';
import { Field } from 'redux-form';
import { Input, Integer, Radio, Select, validation } from '@exzeo/core-ui';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const Details = (agencyCodeDisabled) => {
  return (
    <React.Fragment>
      <Field
        label="Agency ID"
        styleName="agencyCode"
        name="agencyCode"
        dataTest="agencyCode"
        component={Input}
        validate={validation.isRequired}
        disabled={agencyCodeDisabled} />
      <Field
        label="Agency Name"
        styleName="agencyName"
        name="displayName"
        dataTest="displayName"
        component={Input}
        validate={validation.isRequired} />
      <Field
        label="Entity Name"
        styleName="entityName"
        name="legalName"
        dataTest="legalName"
        component={Input}
        validate={validation.isRequired} />
      <Field
        id="status"
        name="status"
        dataTest="status"
        styleName="status"
        label="Status"
        component={Select}
        validate={validation.isRequired}
        answers={statusAnswers} />
      <Field
        label="TPAID"
        styleName="tpaid"
        name="tpaid"
        dataTest="tpaid"
        component={Integer}
        validate={[validation.isRequired, validation.isNumbersOnly]} />
      <Field
        name="okToPay"
        dataTest="okToPay"
        styleName="okToPay-wrapper"
        label="Ok to Pay"
        component={Radio}
        segmented
        answers={okToPayAnswers} />
      <Field
        label="Tier"
        styleName="tier"
        name="tier"
        dataTest="tier"
        component={Input}
        validate={[validation.isRequired, validation.isNumbersOnly]} />
      <Field
        label="Web Address"
        styleName="webAddress"
        name="websiteUrl"
        dataTest="websiteUrl"
        component={Input} />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
