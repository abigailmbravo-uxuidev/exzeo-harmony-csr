import { defaultMemoize } from 'reselect';

export const filterPostalCodes = (zip, postalCodes) => {
  const matchingPostalCodes = postalCodes.filter(z => z.zip === zip);
  if (matchingPostalCodes.length === 1) {
    return matchingPostalCodes[0];
  }
  return null;
};

export const setCounty = async (zip, postalCodes, onChange) => {
  const result = filterPostalCodes(zip, postalCodes);
  if (!result) return;
  onChange(result.county);
};

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
  zip,
  postalCodes,
  onChange,
  territoryManagers
) => {
  const result = filterPostalCodes(zip, postalCodes);
  if (!result) return;

  const tm = filterTerritoryManager(
    result.state,
    result.county,
    territoryManagers
  );
  if (!tm) return;
  onChange(tm._id);
};

export const listOfZipCodes = postalCodes => {
  if (!Array.isArray(postalCodes)) return [];

  return postalCodes.map(z => ({
    answer: z.zip,
    label: `${z.zip}`
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
