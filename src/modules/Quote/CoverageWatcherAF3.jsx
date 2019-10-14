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
        <OnChangeListener name="coverageLimits.personalProperty.value">
          {value => {
            console.log(_get(formValues, 'coverageLimits.building.value', 0));
            if (
              Math.ceil(
                _get(formValues, 'coverageLimits.building.value', 0) / 4 >
                  (value || 0)
              )
            ) {
              onChange(false);
            }
          }}
        </OnChangeListener>
      )}
    </Field>
  );
};

export default CoverageWatcherAF3;
