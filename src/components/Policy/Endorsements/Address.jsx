import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const PropertyAddress = ({ name, sectionId, header, testPrefix }) => (
  <section name={name} id={sectionId}>
    <h3>{header}</h3>
    <div className="flex-parent wrap">
      <div className="address">
        <Field
          name="address1"
          label="Address 1"
          component={Input}
          validate={validation.isRequired}
          dataTest={`${testPrefix}Address1`}
        />
      </div>
      <div className="address">
        <Field
          name="address2"
          label="Address 2"
          component={Input}
          dataTest={`${testPrefix}Address2`}
        />
      </div>
      <div className="city">
        <Field
          name="city"
          label="City"
          component={Input}
          validate={validation.isRequired}
          dataTest={`${testPrefix}City`}
        />
      </div>
      <div className="state">
        <Field
          name="state"
          label="State"
          component={Input}
          validate={validation.isRequired}
          dataTest={`${testPrefix}State`}
        />
      </div>
      <div className="zip">
        <Field
          name="zip"
          label="Zip"
          component={Input}
          validate={validation.isRequired}
          dataTest={`${testPrefix}Zip`}
        />
      </div>
    </div>
  </section>
);

PropertyAddress.propTypes = {};

PropertyAddress.defaultProps = {};

export default PropertyAddress;
