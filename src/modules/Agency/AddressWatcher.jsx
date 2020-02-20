import React, { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';
import _get from 'lodash/get';

const AddressWatcher = ({ watchField, fieldPrefix, matchPrefix }) => {
  const fieldsToUpdate = ['address1', 'address2', 'city', 'state', 'zip'];
  const watchedField = useField(watchField);
  const formApi = useForm();

  useEffect(() => {
    const batchChange = [];

    if (!watchedField.input.value) return;

    fieldsToUpdate.forEach(fieldName => {
      const values = formApi.getState().values;
      batchChange.push({
        field: `${fieldPrefix}.${fieldName}`,
        value: _get(values, `${matchPrefix}.${fieldName}`, '')
      });
    });

    formApi.batch(() => {
      batchChange.forEach(item => {
        formApi.change(item.field, item.value);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedField.input.value]);

  return <React.Fragment />;
};

export default AddressWatcher;
