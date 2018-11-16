import React from 'react';
import { Field } from 'redux-form';
import { Input, validation } from '@exzeo/core-ui';

export const Contact = ({ showTitle, testPrefix }) => (
  <React.Fragment>
    <div className="contact-name">
      {showTitle && <Field
        name="title"
        dataTest={`${testPrefix}.title`}
        styleName="title"
        label="Title"
        component={Input} />}
      <Field
        label="First Name"
        styleName="firstName"
        name="firstName"
        dataTest={`${testPrefix}.firstName`}
        component={Input}
        validate={validation.isRequired} />
      <Field
        label="Last Name"
        styleName="lastName"
        name="lastName"
        dataTest={`${testPrefix}.lastName`}
        component={Input}
        validate={validation.isRequired} />
    </div>
    <Field
      label="Email Address"
      styleName="emailAddress"
      name="emailAddress"
      dataTest={`${testPrefix}.emailAddress`}
      component={Input}
      validate={validation.isRequired} />
  </React.Fragment>
);

export default Contact;
