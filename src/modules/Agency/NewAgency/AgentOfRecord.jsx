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
      name="agentFirstName"
      dataTest="agentFirstName"
      component={Input}
      validate={validation.isRequired} />
    <Field
      label="Agent Last Name"
      styleName="agentLastName flex-item"
      name="agentLastName"
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
      styleName="phone1"
      name="phone1"
      dataTest="phone1"
      component={Phone}
      validate={[validation.isRequired, validation.isPhone]} />
    <Field
      label="Phone 2"
      styleName="phone2"
      name="phone2"
      dataTest="phone2"
      component={Phone}
      validate={validation.isPhone} />
    <Field
      label="Fax"
      styleName="fax"
      name="fax"
      dataTest="fax"
      component={Phone}
      validate={validation.isPhone} />
  </React.Fragment>
);

export default AgentOFRecord;
