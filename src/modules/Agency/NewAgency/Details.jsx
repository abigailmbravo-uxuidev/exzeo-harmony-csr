import React from 'react';
import { Field } from 'redux-form';
import { Input, Integer, Radio, Select, validation, Date, Integer } from '@exzeo/core-ui';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation' }
];

const Details = (agencyCodeDisabled) => {
  return (
    <React.Fragment>
      <Field
        label="Agency ID"
        styleName="agencyCode"
        name="agencyCode"
        dataTest="agencyCode"
        component={Integer}
        thousandSeparator={false}
        validate={validation.isRequired} />
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
        validate={validation.isRequired}
        answers={okToPayAnswers} />
      <Field
        label="Web Address"
        styleName="webAddress"
        name="websiteUrl"
        dataTest="websiteUrl"
        component={Input} />
      <Field
        label="Tax ID"
        styleName="taxId"
        name="taxIdNumber"
        dataTest="taxIdNumber"
        component={Input}
        validate={validation.isRequired} />
      <Field
        id="taxClassification"
        name="taxClassification"
        dataTest="taxClassification"
        styleName="taxClassification"
        label="Tax Classification"
        component={Select}
        validate={validation.isRequired}
        answers={taxClassificationAnswers} />
      <Field
        label="EO Expiration Date"
        name="eoExpirationDate"
        dataTest="eoExpirationDate"
        component={Date}
        validate={validation.isRequired} />
      <Field
        label="Branch Name"
        name="branchName"
        dataTest="branchName"
        component={Input} />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
