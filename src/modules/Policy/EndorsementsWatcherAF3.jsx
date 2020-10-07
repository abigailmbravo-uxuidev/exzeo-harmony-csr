import React from 'react';
import {
  OnChangeListener,
  OnBlurListener,
  Field,
  useFormState,
  date
} from '@exzeo/core-ui';
import _get from 'lodash/get';

const EndorsementsWatcherAF3 = () => {
  const { values: formValues } = useFormState({
    subscription: { values: true }
  });

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
      <Field name="coverageLimits.increasedCompliance.value" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="property.floodZone">
              {value => {
                const isBeforeDate = date.isBeforeDate(
                  _get(formValues, 'effectiveDate'),
                  '2019-10-01',
                  date.FORMATS.SECONDARY
                );
                if (isBeforeDate && value === 'Z') {
                  onChange('0');
                } else if (isBeforeDate) {
                  onChange(30000);
                }
              }}
            </OnChangeListener>
            <OnChangeListener name="property.floodterritory">
              {value => {
                const isAfterDate = date.isAfterDate(
                  _get(formValues, 'effectiveDate'),
                  '2019-09-30',
                  date.FORMATS.SECONDARY
                );
                if (isAfterDate && value === '45000') {
                  onChange('0');
                } else if (isAfterDate) {
                  onChange(30000);
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
