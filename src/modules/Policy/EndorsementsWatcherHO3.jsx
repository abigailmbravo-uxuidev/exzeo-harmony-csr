// @ts-nocheck
import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const EndorsementsWatcherHO3 = ({ formValues }) => {
  return (
    <React.Fragment>
      <Field
        name="coverageOptions.liabilityIncidentalOccupancies.answer"
        subscription={{}}
      >
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer">
              {value => {
                if (value) {
                  onChange(true);
                } else if (
                  !value &&
                  !_get(
                    formValues,
                    'coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer',
                    false
                  )
                ) {
                  onChange(false);
                }
              }}
            </OnChangeListener>
            <OnChangeListener name="coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer">
              {value => {
                if (value) {
                  onChange(true);
                } else if (
                  !value &&
                  !_get(
                    formValues,
                    'coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer',
                    false
                  )
                ) {
                  onChange(false);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
      <Field name="coverageLimits.otherStructures.amount" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageLimits.dwelling.value">
              {dwellingValue => {
                if (dwellingValue) {
                  onChange(
                    Math.ceil(
                      (formValues.coverageLimits.otherStructures.value / 100) *
                        dwellingValue
                    )
                  );
                }
              }}
            </OnChangeListener>
            <OnChangeListener name="coverageLimits.otherStructures.value">
              {otherStructuresValue => {
                if (otherStructuresValue) {
                  onChange(
                    Math.ceil(
                      (otherStructuresValue / 100) *
                        formValues.coverageLimits.dwelling.value
                    )
                  );
                } else {
                  onChange(0);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
      <Field name="coverageLimits.personalProperty.amount" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageLimits.dwelling.value">
              {dwellingValue => {
                if (dwellingValue) {
                  onChange(
                    Math.ceil(
                      (formValues.coverageLimits.personalProperty.value / 100) *
                        dwellingValue
                    )
                  );
                }
              }}
            </OnChangeListener>
            <OnChangeListener name="coverageLimits.personalProperty.value">
              {personalPropertyValue => {
                if (personalPropertyValue) {
                  onChange(
                    Math.ceil(
                      (personalPropertyValue / 100) *
                        formValues.coverageLimits.dwelling.value
                    )
                  );
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
      <Field name="coverageLimits.lossOfUse.amount" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="coverageLimits.dwelling.value">
              {dwellingValue => {
                if (dwellingValue) {
                  onChange(
                    Math.ceil(
                      (formValues.coverageLimits.lossOfUse.value / 100) *
                        dwellingValue
                    )
                  );
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
    </React.Fragment>
  );
};

export default EndorsementsWatcherHO3;
