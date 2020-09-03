import React from 'react';
import { OnBlurListener, Field } from '@exzeo/core-ui/src';

const CoverageWatcherHO3 = () => {
  return (
    <Field name="coverageLimits.dwelling.value">
      {({ input: { onChange, value } }) => (
        <OnBlurListener name="coverageLimits.dwelling.value">
          {() => {
            if (!value) return;
            onChange(Math.round(Number(value) / 1000) * 1000);
          }}
        </OnBlurListener>
      )}
    </Field>
  );
};

export default CoverageWatcherHO3;
