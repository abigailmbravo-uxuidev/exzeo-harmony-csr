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
 * @param state
 * @param county
 * @param territoryManagerField
 * @param onChange
 * @param territoryManagers
 */
export const setTerritoryManager = async (
  state,
  county,
  territoryManagerField,
  onChange,
  territoryManagers
) => {
  const tm = filterTerritoryManager(state, county, territoryManagers);
  if (!tm) return;
  onChange(territoryManagerField, tm._id);
};
/**
 * @returns {Array}
 * @param postalCodes
 */
export const listOfPostalCodes = postalCodes => {
  if (!Array.isArray(postalCodes)) return [];
  return postalCodes.map(p => ({
    answer: p.postalCode,
    label: `${p.postalCode}`
  }));
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
 *
 * @param territoryManagerId
 * @returns {Promise<{}>}
 */
export async function fetchTerritoryManager(territoryManagerId) {
  try {
    const config = {
      exchangeName: 'harmony',
      routingKey: 'harmony.territoryManager',
      data: {
        territoryManagerId
      }
    };
    const response = await serviceRunner.callService(
      config,
      'harmony.territoryManager'
    );
    return response.data && response.data.result ? response.data.result : [];
  } catch (error) {
    throw error;
  }
}
/**
 *
 * @param searchTerm
 * @param state
 * @returns {Array<[]>}
 */
export async function fetchPostalCodes(searchTerm, state) {
  try {
    const config = {
      service: 'list-service',
      method: 'GET',
      path: `v1/postal-codes?postalCode=${searchTerm}&state=${state}&pageSize=10&sortDirection=asc&page=0&country=USA`
    };
    const response = await serviceRunner.callService(
      config,
      'fetchPostalCodes'
    );
    return response?.data?.result?.postalCodes;
  } catch (error) {
    throw error;
  }
}
/**
 *
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
