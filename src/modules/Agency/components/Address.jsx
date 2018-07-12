import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const Address = ({ showCounty, sectionDisabled }) => (
  <React.Fragment>
    <Field
      label="Address 1"
      styleName="address1"
      name="address1"
      dataTest="address1"
      component={Input}
      validate={validation.isRequired}
      disabled={sectionDisabled}
    />
    <Field
      label="Address 2"
      styleName="address2"
      name="address2"
      dataTest="address2"
      component={Input}
      disabled={sectionDisabled}
    />
    <Field
      label="City"
      styleName="city"
      name="city"
      dataTest="city"
      component={Input}
      validate={validation.isRequired}
      disabled={sectionDisabled}
    />
    <Field
      label="State"
      styleName="state"
      name="state"
      dataTest="state"
      component={Input}
      validate={validation.isRequired}
      disabled={sectionDisabled}
    />
    <Field
      label="Zip Code"
      styleName="zip"
      name="zip"
      dataTest="zip"
      component={Input}
      validate={validation.isRequired}
      disabled={sectionDisabled}
    />
    {showCounty &&
      <Field
        label="County"
        styleName="county"
        name="county"
        dataTest="county"
        component={Input}
        validate={validation.isRequired}
        disabled={sectionDisabled}
      />
    }
  </React.Fragment>
);

Address.defaultProps = {
  normalizeAddress
}

export default Address;
