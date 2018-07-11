import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const ContactFields = () => (
  <React.Fragment>
      <Field
        label="First Name"
        styleName="contactFirstName flex-item"
        name="contactFirstName"
        dataTest="contactFirstName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Last Name"
        styleName="contactLastName flex-item"
        name="contactLastName"
        dataTest="contactLastName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Phone 1"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]}
      />
      <Field
        label="Phone 2"
        styleName="secondaryPhoneNumber"
        name="secondaryPhoneNumber"
        dataTest="secondaryPhoneNumber"
        component={Phone}
        validate={validation.isPhone}
      />
      <Field
        label="Fax"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]}
      />
      <Field
        label="Contact Email Address"
        styleName="contactEmailAddress"
        name="contactEmailAddress"
        dataTest="contactEmailAddress"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="CSR Email Address"
        styleName="customerServiceEmailAddress"
        name="customerServiceEmailAddress"
        dataTest="customerServiceEmailAddress"
        component={Input}
        validate={[validation.isRequired, validation.isEmail]}
      />
  </React.Fragment>
);

export default ContactFields;
