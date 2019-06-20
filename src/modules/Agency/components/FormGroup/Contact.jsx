import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, validation } from '@exzeo/core-ui';

export const Contact = ({ showTitle, testPrefix }) => (
  <React.Fragment>
    <div className="contact-name">
      {showTitle && (
        <Field
          name="title"
          dataTest={`${testPrefix}.title`}
          styleName="title"
          label="Title"
          component={Input}
        />
      )}
      <Field
        label="First Name"
        styleName="firstName"
        name="firstName"
        dataTest={`${testPrefix}.firstName`}
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Last Name"
        styleName="lastName"
        name="lastName"
        dataTest={`${testPrefix}.lastName`}
        component={Input}
        validate={validation.isRequired}
      />
    </div>
    <div className="contact-name">
      <Field
        label="Email Address"
        styleName=""
        name="emailAddress"
        dataTest={`${testPrefix}.emailAddress`}
        component={Input}
        validate={[validation.isRequired, validation.isEmail]}
      />
      <Field
        label="Phone Number"
        styleName=""
        name="primaryPhoneNumber"
        dataTest={`${testPrefix}.primaryPhoneNumber`}
        component={Phone}
        validate={[validation.isPhone]}
      />
      <Field
        label="Phone Number Extension"
        styleName=""
        name="primaryPhoneNumberExtension"
        dataTest={`${testPrefix}.primaryPhoneNumberExtension`}
        component={Input}
      />
    </div>
  </React.Fragment>
);

export default Contact;
