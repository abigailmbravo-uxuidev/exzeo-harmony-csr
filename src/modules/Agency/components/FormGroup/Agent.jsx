import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, validation } from '@exzeo/core-ui';

export const Agent = () => (
  <React.Fragment>
    <div className="agent-id">
      <Field
        label="Agent ID"
        styleName="agentCode"
        name="agentCode"
        dataTest="agentCode"
        placeholder="Generated if blank"
        component={Input}
      />
      <Field
        label="Agent First Name"
        styleName="agentFirstName flex-item"
        name="firstName"
        dataTest="agentFirstName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Agent Last Name"
        styleName="agentLastName flex-item"
        name="lastName"
        dataTest="agentLastName"
        component={Input}
        validate={validation.isRequired}
      />
    </div>
    <Field
      label="Email Address"
      styleName="emailAddress"
      name="emailAddress"
      dataTest="emailAddress"
      component={Input}
      validate={[validation.isRequired, validation.isEmail]}
    />
    <div className="agent-phone" data-test="agent-phone">
      <Field
        label="Phone 1"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]}
      />
      <Field
        name="primaryPhoneNumberExtension"
        label="Primary Phone Extension"
        component={Input}
        dataTest="primaryPhoneNumberExtension"
        styleName="primaryPhoneNumberExtension"
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
        validate={validation.isPhone}
      />
    </div>
  </React.Fragment>
);

export default Agent;
