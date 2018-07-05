import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const ContactFields = () => (
  <div className="flex-form">
    <Field
      label="Contact First Name"
      styleName="contactFirstName flex-item"
      name="contactFirstName"
      dataTest="contactFirstName"
      component={Input}
      validate={validation.isRequired}
    />
    <Field
      label="Contact Last Name"
      styleName="contactLastName flex-item"
      name="contactLastName"
      dataTest="contactLastName"
      component={Input}
      validate={validation.isRequired}
    />
    <Field
      label="Contact Email Address"
      styleName="contactEmailAddress"
      name="contactEmailAddress"
      dataTest="contactEmailAddress"
      component={Input}
      validate={validation.isRequired}
    />
  </div>);

export default ContactFields;
