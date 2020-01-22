export const filterZipCodeSettings = (zip, zipCodeSettings) => {
  const matchingZipCodes = zipCodeSettings.filter(z => z.zip === zip);
  if (matchingZipCodes.length === 1) {
    return matchingZipCodes[0];
  }
  return null;
};

export const setCounty = (zip, zipCodeSettings, onChange) => {
  const result = filterZipCodeSettings(zip, zipCodeSettings);
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

export const setTerritoryManager = (
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
