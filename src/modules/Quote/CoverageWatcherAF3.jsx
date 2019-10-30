// @ts-nocheck
import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const CoverageWatcherAF3 = ({ formValues }) => {
  return (
    <Field
      name="coverageOptions.personalPropertyReplacementCost.answer"
      subscription={{}}
    >
      {({ input: { onChange } }) => (
        <React.Fragment>
          <OnChangeListener name="coverageLimits.personalProperty.value">
            {value => {
              if (
                _get(formValues, 'coverageLimits.building.value', 0) / 4 >
                (value || 0)
              ) {
                onChange(false);
              }
            }}
          </OnChangeListener>

          <OnChangeListener name="coverageLimits.building.value">
            {value => {
              if (
                value / 4 >
                _get(formValues, 'coverageLimits.personalProperty.value', 0)
              ) {
                onChange(false);
              }
            }}
          </OnChangeListener>
        </React.Fragment>
      )}
    </Field>
  );
};

export default CoverageWatcherAF3;
