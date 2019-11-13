// @ts-nocheck
import React from 'react';
import {
  OnChangeListener,
  OnBlurListener,
  Field,
  date
} from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const EndorsementsWatcherAF3 = ({ formValues, initialValues }) => {
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
                    _get(formValues, 'coverageLimits.building.value', 0) / 4 >
                      (value || 0)
                  )
                ) {
                  onChange(false);
                }
              }}
            </OnChangeListener>

            <OnChangeListener name="coverageLimits.building.value">
              {value => {
                if (
                  Math.ceil(
                    value / 4 >
                      (_get(
                        formValues,
                        'coverageLimits.personalProperty.value',
                        0
                      ) || 0)
                  )
                ) {
                  onChange(false);
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
