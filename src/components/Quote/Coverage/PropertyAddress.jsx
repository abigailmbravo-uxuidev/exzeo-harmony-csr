import React from 'react';
import { Field } from 'redux-form';
import { Input, validation } from '@exzeo/core-ui';

const PropertyAddress = ({ sectionId, className, header }) => (
  <div id={sectionId} className={className}>
    <h3>{header}</h3>
    <div className="flex-parent property-risk-address-1-row">
      <Field
        styleName="flex-child property-risk-address-1"
        name="address1"
        label="Address 1"
        component={Input}
        validate={validation.isRequired}
        disabled
        dataTest="address1"
      />
    </div>
    <div className="flex-parent property-risk-address-2-row">
      <Field
        styleName="flex-child property-risk-address-2"
        name="address2"
        label="Address 2"
        component={Input}
        disabled
        dataTest="address2"
      />
    </div>
    <div className="flex-parent property-risk-city-row">
      <Field
        styleName="flex-child city property-risk-city"
        name="city"
        label="City"
        component={Input}
        validate={validation.isRequired}
        disabled
        dataTest="city"
      />
    </div>
    <div className="flex-parent property-risk-state-zip-row">
      <Field
        styleName="flex-child state property-risk-state"
        name="state"
        label="State"
        component={Input}
        validate={validation.isRequired}
        disabled
        dataTest="state"
      />
      <Field
        styleName="flex-child zip property-risk-zip"
        name="zip"
        label="Zip"
        component={Input}
        validate={validation.isRequired}
        disabled
        dataTest="zip"
      />
    </div>
    <div className="flex-parent property-risk-spacer" />
  </div>
);

PropertyAddress.propTypes = {};

PropertyAddress.defaultProps = {};

export default PropertyAddress;
