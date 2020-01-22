import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui';
import _get from 'lodash/get';

const filterZipCodeSettings = (zip, zipCodeSettings) => {
  const matchingZipCodes = zipCodeSettings.filter(z => z.zip === zip);
  if (matchingZipCodes.length === 1) {
    return matchingZipCodes[0];
  }
  return null;
};

const setCounty = (zip, zipCodeSettings, onChange) => {
  const result = filterZipCodeSettings(zip, zipCodeSettings);
  if (!result) return;
  onChange(result.county);
};

const filterTerritoryManager = (state, county, territoryManagers) => {
  return territoryManagers.find(tm => {
    const { states } = tm;
    if (
      states &&
      states.some(s => {
        const { counties } = s;
        return (
          s.state.includes(state) &&
          counties &&
          counties.some(c => {
            return c.county.includes(county);
          })
        );
      })
    ) {
      return tm;
    }
    return null;
  });
};

const setTerritoryManager = (
  zip,
  zipCodeSettings,
  onChange,
  territoryManagers
) => {
  const result = filterZipCodeSettings(zip, zipCodeSettings);
  if (!result) return;

  const tm = filterTerritoryManager(
    result.state,
    result.county,
    territoryManagers
  );
  if (!tm) return;
  onChange(tm._id);
};

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
                  // onChange(_get(values, `${matchPrefix}.zip`, ''));
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
                  //onChange(_get(values, `${matchPrefix}.zip`, ''));
                } else {
                  // onChange('');
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
                  // onChange(_get(values, `${matchPrefix}.zip`, ''));
                } else {
                  //  onChange('');
                }
              }}
            </OnChangeListener>
            <OnChangeListener name={`${fieldPrefix}.zip`}>
              {value => {
                if (value) {
                  setCounty(value, zipCodeSettings, onChange, 'county');
                  //onChange(_get(values, `${matchPrefix}.zip`, ''));
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
