import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const PropertyAddress = () => (
  <section>
    <h3>Property Address</h3>
    <div className="flex-parent wrap">
      <div className="address">
        <Field
          name="property.physicalAddress.address1"
          label="Address 1"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="address">
        <Field
          name="property.physicalAddress.address2"
          label="Address 2"
          component={Input}
        />
      </div>
      <div className="city">
        <Field
          name="property.physicalAddress.city"
          label="City"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="state">
        <Field
          name="property.physicalAddress.state"
          label="State"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="zip">
        <Field
          name="property.physicalAddress.zip"
          label="Zip"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
    </div>
  </section>
);

PropertyAddress.propTypes = {};

PropertyAddress.defaultProps = {};

export default PropertyAddress;
