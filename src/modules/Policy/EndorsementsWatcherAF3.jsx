// @ts-nocheck
import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const EndorsementsWatcherAF3 = ({ formValues }) => {
  return (
    <React.Fragment>
      <Field
        name="deductibles.personalPropertyDeductible.value"
        subscription={{}}
      >
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="deductibles.buildingDeductible.value">
              {value => {
                if (value) {
                  onChange(value);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
      <Field name="coverageLimits.personalProperty.value" subscription={{}}>
        {({ input: { onBlur } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageLimits.building.value">
              {value => {
                if (value) {
                  onBlur();
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>

      <Field
        name="coverageOptions.personalPropertyReplacementCost.answer"
        subscription={{}}
      >
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageLimits.personalProperty.value">
              {value => {
                if (
                  Math.ceil(
                    _get(formValues, 'coverageLimits.building.value', 0) / 4
                  ) > (value || 0)
                ) {
                  onChange(false);
                }
              }}
            </OnChangeListener>

            <OnChangeListener name="coverageLimits.building.value">
              {value => {
                if (
                  Math.ceil(value / 4) >
                  (_get(
                    formValues,
                    'coverageLimits.personalProperty.value',
                    0
                  ) || 0)
                ) {
                  onChange(false);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
    </React.Fragment>
  );
};

//Math.ceil((it.coverageLimits.building.value || 0) / 4) > (it.coverageLimits.personalProperty.value || 0)

export default EndorsementsWatcherAF3;
