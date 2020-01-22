import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui';
import _get from 'lodash/get';
import { setTerritoryManager, setCounty } from './utilities';

const TerritoryManager = ({
  watchField,
  fieldPrefix,
  matchPrefix,
  values,
  zipCodeSettings,
  territoryManagers
}) => {
  return (
    <React.Fragment>
      <Field name={`${fieldPrefix}.territoryManagerId`} subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name={watchField}>
              {value => {
                if (value) {
                  setTerritoryManager(
                    _get(values, `${matchPrefix}.zip`, ''),
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
                  setCounty(
                    _get(values, `${matchPrefix}.zip`, ''),
                    zipCodeSettings,
                    onChange,
                    'county'
                  );
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
