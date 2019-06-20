import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, validation } from '@exzeo/core-ui';

export const CSRFields = () => (
  <div className="flex-form">
    <Field
      label="CSR Phone 1"
      styleName="primaryPhoneNumber"
      name="primaryPhoneNumber"
      dataTest="primaryPhoneNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]}
    />
    <Field
      label="CSR Phone 2"
      styleName="secondaryPhoneNumber"
      name="secondaryPhoneNumber"
      dataTest="secondaryPhoneNumber"
      component={Phone}
      validate={validation.isPhone}
    />
    <Field
      label="CSR Fax"
      styleName="faxNumber"
      name="faxNumber"
      dataTest="faxNumber"
      component={Phone}
      validate={[validation.isPhone]}
    />
    <Field
      label="CSR Email Address"
      styleName="customerServiceEmailAddress"
      name="customerServiceEmailAddress"
      dataTest="customerServiceEmailAddress"
      component={Input}
      validate={[validation.isRequired, validation.isEmail]}
    />
  </div>
);

export default CSRFields;
