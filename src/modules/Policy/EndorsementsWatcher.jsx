import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui/src';
import _get from 'lodash/get';

const EndorsementsWatcher = ({ formValues }) => {
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
    </React.Fragment>
  );
};

export default EndorsementsWatcher;
