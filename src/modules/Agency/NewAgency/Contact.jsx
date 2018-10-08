import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, Select, validation } from '@exzeo/core-ui';

const titleAnswers = [
  { answer: 'officer', label: 'Officer' }
];

export const ContactFields = () => (
  <React.Fragment>
    <Field
      name="title"
      dataTest="title"
      styleName="title"
      label="Title"
      component={Select}
      validate={validation.isRequired}
      answers={titleAnswers} />
    <Field
      label="First Name"
      styleName="contactFirstName flex-item"
      name="contactFirstName"
      dataTest="contactFirstName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Last Name"
      styleName="contactLastName flex-item"
      name="contactLastName"
      dataTest="contactLastName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Contact Email Address"
      styleName="contactEmailAddress"
      name="contactEmailAddress"
      dataTest="contactEmailAddress"
      component={Input}
      validate={validation.isRequired} />
  </React.Fragment>
);

export default ContactFields;
