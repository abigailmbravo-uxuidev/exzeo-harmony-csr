import React from 'react';
import { Field } from 'redux-form';
import { Input, Select } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation' }
];


export const Address = ({ isMailing, sameAsMailingValue }) => (
  <React.Fragment>
    <Field
      label="Address 1"
      styleName="address1"
      name="address1"
      dataTest="address1"
      component={Input}
      validate={validation.isRequired}
      disabled={sameAsMailingValue}
    />
    <Field
      label="Address 2"
      styleName="address2"
      name="address2"
      dataTest="address2"
      component={Input}
      disabled={sameAsMailingValue}
    />
    <Field
      label="City"
      styleName="city"
      name="city"
      dataTest="city"
      component={Input}
      validate={validation.isRequired}
      disabled={sameAsMailingValue}
    />
    <Field
      label="State"
      styleName="state"
      name="state"
      dataTest="state"
      component={Input}
      validate={validation.isRequired}
      disabled={sameAsMailingValue}
    />
    <Field
      label="Zip Code"
      styleName="zip"
      name="zip"
      dataTest="zip"
      component={Input}
      validate={validation.isRequired}
      disabled={sameAsMailingValue}
    />
    {isMailing &&
      <React.Fragment>
        <Field
          label="Tax ID"
          styleName="taxId"
          name="taxIdNumber"
          dataTest="taxIdNumber"
          component={Input}
          validate={validation.isRequired}
        />
        <Field
          id="taxClassification"
          name="taxClassification"
          dataTest="taxClassification"
          styleName="taxClassification"
          label="Tax Classification"
          component={Select}
          validate={validation.isRequired}
          answers={taxClassificationAnswers}
        />
      </React.Fragment>
    }
    {!isMailing && <Field
      label="County"
      styleName="county"
      name="county"
      dataTest="county"
      component={Input}
      validate={validation.isRequired}
    />}
  </React.Fragment>
);

export default Address;
