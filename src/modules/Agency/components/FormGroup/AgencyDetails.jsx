import React from 'react';
import { Field } from 'redux-form';
import { Input, Integer, Radio, Select, Phone, validation, Date } from '@exzeo/core-ui';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'Service Only', label: 'Service Only' },
  { answer: 'Pending', label: 'Pending' },
  { answer: 'Cancel', label: 'Cancel' }

];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation' },
  { answer: 'Individual/Sole Proprietor', label: 'Individual/Sole Proprietor' },
  { answer: 'Partnership', label: 'Partnership' },
  { answer: 'Disregarded Entity', label: 'Disregarded Entity' },
  { answer: 'Tax Exempt', label: 'Tax Exempt' },
  { answer: 'Other', label: 'Other' },
  { answer: 'LLC - C', label: 'LLC - C' },
  { answer: 'LLC - P', label: 'LLC - P' },
  { answer: 'LLC - S', label: 'LLC - S' },
  { answer: 'S-Corporation', label: 'S-Corporation' },
  { answer: 'LLC – I/SP', label: 'LLC – I/SP' }
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
        validate={[validation.isPhone]} />
      <Field
        label="Fax"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}
        validate={[validation.isPhone]} />
      <Field
        label="CSR Contact Email Address"
        styleName="customerServiceEmailAddress"
        name="customerServiceEmailAddress"
        dataTest="customerServiceEmailAddress"
        component={Input}
        validate={[validation.isRequired, validation.isEmail]} />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
