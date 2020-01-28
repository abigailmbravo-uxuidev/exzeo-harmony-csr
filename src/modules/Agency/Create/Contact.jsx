import React from 'react';
import {
  Input,
  Phone,
  validation,
  Field,
  composeValidators
} from '@exzeo/core-ui';

export const Contact = ({ showTitle, fieldPrefix }) => (
  <React.Fragment>
    <div className="contact-name">
      {showTitle && (
        <Field name={`${fieldPrefix}.title`}>
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="title"
              styleName="title"
              label="Title"
            />
          )}
        </Field>
      )}
      <Field name={`${fieldPrefix}.firstName`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="First Name"
            styleName="firstName"
            dataTest="firstName"
            component={Input}
          />
        )}
      </Field>
      <Field name={`${fieldPrefix}.lastName`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Last Name"
            styleName="lastName"
            dataTest="lastName"
            component={Input}
          />
        )}
      </Field>
    </div>
    <div className="contact-name">
      <Field
        name={`${fieldPrefix}.emailAddress`}
        validate={composeValidators([
          validation.isRequired,
          validation.isEmail
        ])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Email Address"
            styleName=""
            name="emailAddress"
            dataTest="emailAddress"
          />
        )}
      </Field>
      <Field
        name={`${fieldPrefix}.primaryPhoneNumber`}
        validate={composeValidators([validation.isPhone])}
      >
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Phone Number"
            styleName=""
            dataTest="primaryPhoneNumber"
          />
        )}
      </Field>
      <Field name={`${fieldPrefix}.primaryPhoneNumberExtension`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Phone Number Extension"
            styleName=""
            dataTest="primaryPhoneNumberExtension"
          />
        )}
      </Field>
    </div>
  </React.Fragment>
);

export default Contact;
