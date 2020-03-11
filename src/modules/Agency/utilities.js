import { defaultMemoize } from 'reselect';

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
