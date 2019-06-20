import { createSelector } from 'reselect';

export const getZipCodeSettings = state =>
  state.zipCodeSettingsState.zipCodeSettings;

export const getListOfZipCodes = createSelector(
  [getZipCodeSettings],
  zipCodeSettings => {
    if (!Array.isArray(zipCodeSettings)) return [];

    const zipCodeList = zipCodeSettings.map(z => ({
      answer: z.zip,
      label: `${z.zip}`
    }));
    return zipCodeList;
  }
);
