import { defaultMemoize } from 'reselect';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

/**
 *
 * @returns {(Object|null)}
 * @param zip
 * @param zipCodeSettings
 */
export const filterZipCodeSettings = (zip, zipCodeSettings) => {
  const matchingZipCodes = zipCodeSettings.filter(z => z.zip === zip);
  if (matchingZipCodes.length === 1) {
    return matchingZipCodes[0];
  }
  return null;
};

/**
 *
 * @param zip
 * @param zipCodeSettings
 * @param onChange
 */
export const setCounty = async (zip, zipCodeSettings, onChange) => {
  const result = filterZipCodeSettings(zip, zipCodeSettings);
  if (!result) return;
  onChange(result.county);
};

/**
 *
 * @returns {(Object|null)}
 * @param state
 * @param county
 * @param territoryManagers
 */
export const filterTerritoryManager = (state, county, territoryManagers) => {
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

/**
 *
 * @param zip
 * @param zipCodeSettings
 * @param onChange
 * @param territoryManagers
 */
export const setTerritoryManager = async (
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

/**
 * @returns {Array}
 * @param zipCodeSettings
 */
export const listOfZipCodes = zipCodeSettings => {
  if (!Array.isArray(zipCodeSettings)) return [];

  const zipCodeList = zipCodeSettings.map(z => ({
    answer: z.zip,
    label: `${z.zip}`
  }));
  return zipCodeList;
};

/**
 * @returns {(String|undefined)}
 * @param agents
 */
export const isUnique = defaultMemoize((name, values, uniqueList) => value => {
  const exception = values ? values[name] : null;
  return value && uniqueList.includes(value) && value !== exception
    ? 'This must be unique.'
    : undefined;
});

/**
 *
 * @returns {Object}
 * @param data
 */
export const formatAgent = data => {
  return {
    ...data,
    primaryPhoneNumberExtension: data.primaryPhoneNumberExtension || '',
    secondaryPhoneNumber: data.secondaryPhoneNumber || '',
    faxNumber: data.faxNumber || ''
  };
};

/**
 * @returns {Object}
 * @param data
 */
export const formatAgency = data => {
  return {
    ...data,
    websiteUrl: data.websiteUrl || '',
    secondaryPhoneNumber: data.secondaryPhoneNumber || '',
    faxNumber: data.faxNumber || '',
    branches: data.branches.filter(b => String(b.branchCode) !== '0')
  };
};

/**
 * @returns {Array}
 * @param agents
 */
export const formatAgents = agents => {
  if (!Array.isArray(agents)) return [];
  return agents.map(o => ({
    label: `${o.firstName} ${o.lastName}`,
    answer: o.agentCode
  }));
};
