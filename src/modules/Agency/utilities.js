import { defaultMemoize } from 'reselect';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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

export const listOfPostalCodes = postalCodes => {
  if (!Array.isArray(postalCodes)) return [];

  return postalCodes.map(p => ({
    answer: p.postalCode,
    label: `${p.postalCode}`
  }));
};

export const isUnique = defaultMemoize((name, values, uniqueList) => value => {
  const exception = values ? values[name] : null;
  return value && uniqueList.includes(value) && value !== exception
    ? 'This must be unique.'
    : undefined;
});

export const formatAgent = data => {
  return {
    ...data,
    primaryPhoneNumberExtension: data.primaryPhoneNumberExtension || '',
    secondaryPhoneNumber: data.secondaryPhoneNumber || '',
    faxNumber: data.faxNumber || ''
  };
};

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
