import React from 'react';
import { Field } from 'redux-form'
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const PropertyAddress = props => (
  <section>
    <h3>Property Address</h3>
    <div className="flex-parent wrap">
      <div className="address">
        <Field
          name="propertyAddress1New"
          label="Address 1"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="address">
        <Field
          name="propertyAddress2New"
          label="Address 2"
          component={Input}
        />
      </div>
      <div className="city">
        <Field
          name="propertyCityNew"
          label="City"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="state">
        <Field
          name="propertyStateNew"
          label="State"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="zip">
        <Field
          name="propertyZipNew"
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
