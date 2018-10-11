import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, validation } from '@exzeo/core-ui';

export const Agent = () => (
  <React.Fragment>
    <Field
      label="Agent First Name"
      styleName="agentFirstName flex-item"
      name="firstName"
      dataTest="agentFirstName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Agent Last Name"
      styleName="agentLastName flex-item"
      name="lastName"
      dataTest="agentLastName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Agent ID"
      styleName="agentCode"
      name="agentCode"
      dataTest="agentCode"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Email Address"
      styleName="emailAddress"
      name="emailAddress"
      dataTest="emailAddress"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Phone 1"
      styleName="primaryPhoneNumber"
      name="primaryPhoneNumber"
      dataTest="primaryPhoneNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]} />
    <Field
      label="Phone 2"
      styleName="secondaryPhoneNumber"
      name="secondaryPhoneNumber"
      dataTest="secondaryPhoneNumber"
      component={Phone}
      validate={validation.isPhone} />
    <Field
      label="Fax"
      styleName="faxNumber"
      name="faxNumber"
      dataTest="faxNumber"
      component={Phone}
      validate={validation.isPhone} />
  </React.Fragment>
);

export default Agent;
