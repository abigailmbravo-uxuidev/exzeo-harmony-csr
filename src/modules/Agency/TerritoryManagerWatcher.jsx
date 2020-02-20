import React from 'react';
import { OnChangeListener, Field, useField } from '@exzeo/core-ui';
import { setTerritoryManager, setCounty } from './utilities';

const TerritoryManager = ({
  watchField,
  fieldPrefix,
  matchPrefix,
  zipCodeSettings,
  territoryManagers
}) => {
  const zipCodeValue = useField(`${matchPrefix}.zip`).input.value;
  return (
    <React.Fragment>
      <Field name="territoryManagerId" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name={watchField}>
              {value => {
                if (value) {
                  setTerritoryManager(
                    zipCodeValue,
                    zipCodeSettings,
                    onChange,
                    territoryManagers
                  );
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
            <OnChangeListener name={`${fieldPrefix}.zip`}>
              {value => {
                if (value) {
                  setTerritoryManager(
                    value,
                    zipCodeSettings,
                    onChange,
                    territoryManagers
                  );
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
      <Field name={`${fieldPrefix}.county`} subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name={watchField}>
              {value => {
                if (value) {
                  setCounty(zipCodeValue, zipCodeSettings, onChange, 'county');
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
            <OnChangeListener name={`${fieldPrefix}.zip`}>
              {value => {
                if (value) {
                  setCounty(value, zipCodeSettings, onChange, 'county');
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
    </React.Fragment>
  );
};

export default TerritoryManager;
