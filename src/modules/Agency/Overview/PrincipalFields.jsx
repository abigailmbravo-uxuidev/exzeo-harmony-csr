import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const PrincipalFields = () => (
  <div className="flex-form">
    <Field
      label="Principal First Name"
      styleName="principalFirstName"
      name="principalFirstName"
      component={Input}
      validate={validation.isRequired}
    />
    <Field
      label="Principal Last Name"
      styleName="principalLastName"
      name="principalLastName"
      component={Input}
      validate={validation.isRequired}
    />
    <Field
      label="Principal Email Address"
      styleName="principalEmailAddress flex-item"
      name="principalEmailAddress"
      component={Input}
      validate={[validation.isRequired, validation.isEmail]}
    />
  </div>);

export default PrincipalFields;
