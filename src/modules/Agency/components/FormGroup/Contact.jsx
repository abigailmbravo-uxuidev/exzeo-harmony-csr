import React from 'react';
import { Field } from 'redux-form';
import { Input, Select, validation } from '@exzeo/core-ui';

const titleAnswers = [
  { answer: 'officer', label: 'Officer' }
];

export const Contact = ({ section }) => (
  <React.Fragment>
    <div className="contact-name">
      {section !== 'principal' && <Field
        name="title"
        dataTest={`${section}.title`}
        styleName="title"
        label="Title"
        component={Select}
        validate={validation.isRequired}
        answers={titleAnswers} />}
      <Field
        label="First Name"
        styleName="firstName"
        name="firstName"
        dataTest={`${section}.firstName`}
        component={Input}
        validate={validation.isRequired} />
      <Field
        label="Last Name"
        styleName="lastName"
        name="lastName"
        dataTest={`${section}.lastName`}
        component={Input}
        validate={validation.isRequired} />
    </div>
    <Field
      label="Email Address"
      styleName="emailAddress"
      name="emailAddress"
      dataTest={`${section}.emailAddress`}
      component={Input}
      validate={validation.isRequired} />
  </React.Fragment>
);

export default Contact;
