import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const PrincipalFields = () => (
  <React.Fragment>
      <Field
        label="First Name"
        styleName="principalFirstName"
        name="principalFirstName"
        dataTest="principalFirstName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Last Name"
        styleName="principalLastName"
        name="principalLastName"
        dataTest="principalLastName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Email Address"
        styleName="principalEmailAddress flex-item"
        name="principalEmailAddress"
        dataTest="principalEmailAddress"
        component={Input}
        validate={[validation.isRequired, validation.isEmail]}
      />
  </React.Fragment>
);

export default PrincipalFields;
