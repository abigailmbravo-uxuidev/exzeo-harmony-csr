import React from 'react';
import {
  Input,
  Phone,
  validation,
  Field,
  composeValidators
} from '@exzeo/core-ui';

const Agent = ({ fieldPrefix }) => (
  <React.Fragment>
    <div className="agent-id">
      <Field name={`${fieldPrefix}.agentCode`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Agent ID"
            styleName="agentCode"
            dataTest="agentCode"
            placeholder="Generated if blank"
          />
        )}
      </Field>
      <Field name={`${fieldPrefix}.firstName`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Agent First Name"
            styleName="agentFirstName flex-item"
            dataTest="agentFirstName"
          />
        )}
      </Field>
      <Field name={`${fieldPrefix}.lastName`} validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Agent Last Name"
            styleName="agentLastName flex-item"
            dataTest="agentLastName"
          />
        )}
      </Field>
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
            styleName="emailAddress"
            dataTest="emailAddress"
          />
        )}
      </Field>
    </div>
    <div className="agent-phone" data-test="agent-phone">
      <Field
        name={`${fieldPrefix}.primaryPhoneNumber`}
        validate={composeValidators([
          validation.isRequired,
          validation.isPhone
        ])}
      >
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Phone 1"
            styleName="primaryPhoneNumber"
            dataTest="primaryPhoneNumber"
          />
        )}
      </Field>
      <Field name={`${fieldPrefix}.primaryPhoneNumberExtension`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Extension"
            styleName="primaryPhoneNumberExtension"
            dataTest="primaryPhoneNumberExtension"
          />
        )}
      </Field>
      <Field
        name={`${fieldPrefix}.secondaryPhoneNumber`}
        validate={composeValidators([validation.isPhone])}
      >
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Phone 2"
            styleName="secondaryPhoneNumber"
            dataTest="secondaryPhoneNumber"
          />
        )}
      </Field>
      <Field
        name={`${fieldPrefix}.faxNumber`}
        validate={composeValidators([validation.isPhone])}
      >
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Fax"
            styleName="faxNumber"
            name="faxNumber"
            dataTest="faxNumber"
          />
        )}
      </Field>
    </div>
  </React.Fragment>
);

export default Agent;
