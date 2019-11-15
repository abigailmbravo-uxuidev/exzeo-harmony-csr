// @ts-nocheck
import React from 'react';
import { OnChangeListener, OnBlurListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const CoverageWatcherAF3 = ({ formValues }) => {
  return (
    <React.Fragment>
      <Field name="coverageLimits.building.value">
        {({ input: { onChange, value } }) => (
          <OnBlurListener name="coverageLimits.building.value">
            {() => {
              if (!value) return;
              onChange(Math.round(Number(value) / 1000) * 1000);
            }}
          </OnBlurListener>
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
                  _get(formValues, 'coverageLimits.personalProperty.value', 0)
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

export default CoverageWatcherAF3;
