import React from 'react';
import { Field } from 'redux-form';
import { Input, Phone, validation } from '@exzeo/core-ui';

const titleAnswers = [
  { answer: 'officer', label: 'Officer' }
];

export const AgentOFRecord = () => (
  <React.Fragment>
    <Field
      label="Agent First Name"
      styleName="agentFirstName flex-item"
      name="agentOfRecord.firstName"
      dataTest="agentFirstName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Agent Last Name"
      styleName="agentLastName flex-item"
      name="agentOfRecord.lastName"
      dataTest="agentLastName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Agent ID"
      styleName="agentCode"
      name="agentOfRecord.agentCode"
      dataTest="agentCode"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Email Address"
      styleName="emailAddress"
      name="agentOfRecord.emailAddress"
      dataTest="emailAddress"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Phone 1"
      styleName="primaryPhoneNumber"
      name="agentOfRecord.primaryPhoneNumber"
      dataTest="primaryPhoneNumber"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]} />
    <Field
      label="Phone 2"
      styleName="secondaryPhoneNumber"
      name="agentOfRecord.secondaryPhoneNumber"
      dataTest="secondaryPhoneNumber"
      component={Phone}
      validate={validation.isPhone} />
    <Field
      label="Fax"
      styleName="faxNumber"
      name="agentOfRecord.faxNumber"
      dataTest="faxNumber"
      component={Phone}
      validate={validation.isPhone} />
  </React.Fragment>
);

export default AgentOFRecord;
