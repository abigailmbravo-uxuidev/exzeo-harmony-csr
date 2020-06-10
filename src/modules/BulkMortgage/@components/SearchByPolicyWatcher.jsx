import { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';
import { SEARCH_TYPES } from '../constants';

const SearchByPolicyWatcher = () => {
  const fieldsToUpdate = [
    SEARCH_TYPES.propertyAddress,
    SEARCH_TYPES.policyNumber,
    SEARCH_TYPES.lastName
  ];
  const watchedField = useField('searchType');
  const formApi = useForm();

  useEffect(() => {
    const batchChange = [];

    if (!watchedField.input.value) return;

    fieldsToUpdate.forEach(fieldName => {
      batchChange.push({
        field: fieldName,
        value: ''
      });
    });

    formApi.batch(() => {
      batchChange.forEach(item => {
        formApi.change(item.field, item.value);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedField.input.value]);

  return null;
};

export default SearchByPolicyWatcher;
