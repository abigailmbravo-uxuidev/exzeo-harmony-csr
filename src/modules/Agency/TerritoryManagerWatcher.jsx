import { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';
import { fetchPostalCodes, setTerritoryManager } from './utilities';

const TerritoryManagerWatcher = ({
  physicalAddressPrefix,
  mailingAddressPrefix,
  territoryManagers
}) => {
  const physicalPostalCodeValue = useField(`${physicalAddressPrefix}.zip`).input
    .value;
  const mailingPostalCodeValue = useField(`${mailingAddressPrefix}.zip`).input
    .value;
  const stateValue = useField(`${physicalAddressPrefix}.state`).input.value;
  const watchFieldValue =
    useField(`${physicalAddressPrefix}.sameAsMailing`).input.value || false;
  const formApi = useForm();

  async function updateFields(fieldValue, postalCodeValue) {
    if (fieldValue) {
      const result = await fetchPostalCodes(postalCodeValue, stateValue);
      const { state, county } = result[0];
      setTerritoryManager(
        state,
        county,
        'territoryManagerId',
        formApi.change,
        territoryManagers
      );
      formApi.change(`${physicalAddressPrefix}.county`, county);
    }
  }

  useEffect(() => {
    updateFields(watchFieldValue, mailingPostalCodeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFieldValue]);

  useEffect(() => {
    updateFields(physicalPostalCodeValue, physicalPostalCodeValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [physicalPostalCodeValue]);

  return null;
};

export default TerritoryManagerWatcher;
