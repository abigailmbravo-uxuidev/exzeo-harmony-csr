// @ts-nocheck
import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const EndorsementsWatcherAF3 = () => {
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
    </React.Fragment>
  );
};

export default EndorsementsWatcherAF3;
