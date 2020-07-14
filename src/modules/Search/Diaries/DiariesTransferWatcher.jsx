import { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';

const DiariesTransferWatcher = ({ diaries }) => {
  const watchedField = useField('selectAll');
  const formApi = useForm();

  useEffect(() => {
    const batchChange = [];

    diaries.forEach(diary => {
      batchChange.push({
        field: `diaries.${diary._id}`,
        value: watchedField.input.value
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

export default DiariesTransferWatcher;
