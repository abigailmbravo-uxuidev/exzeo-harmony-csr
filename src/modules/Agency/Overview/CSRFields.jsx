import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const CSRFields = () => (
  <div className="flex-form">
    <Field
      label="CSR Phone 1"
      styleName="primaryPhoneNumber"
      name="primaryPhoneNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]}
    />
    <Field
      label="CSR Phone 2"
      styleName="secondaryPhoneNumber"
      name="secondaryPhoneNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]}
    />
    <Field
      label="CSR Fax"
      styleName="faxNumber"
      name="faxNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]}
    />
    <Field
      label="CSR Email Address"
      styleName="customerServiceEmailAddress"
      name="customerServiceEmailAddress"
      component={Input}
      validate={[validation.isRequired, validation.isEmail]}
    />
  </div>);

export default CSRFields;
