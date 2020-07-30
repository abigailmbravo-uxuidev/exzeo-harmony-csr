import { useEffect } from 'react';
import { useField, useForm } from '@exzeo/core-ui';
import { getCheckedDiaries } from '../utilities';

const DiariesTransferWatcher = ({ diaries }) => {
  const watchedField = useField('selectAll');
  const formApi = useForm();

  const checkedDiaries = getCheckedDiaries(formApi.getState().values.diaries);

  useEffect(() => {
    const batchChange = [];

    function changeValues(value) {
      diaries.forEach(diary => {
        batchChange.push({
          field: `diaries.${diary._id}`,
          value
        });
      });

      formApi.batch(() => {
        batchChange.forEach(item => {
          formApi.change(item.field, item.value);
        });
      });
    }

    if (watchedField.input.value) {
      changeValues(true);
    } else if (checkedDiaries.length === diaries.length) {
      changeValues(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedField.input.value]);

  return null;
};

export default DiariesTransferWatcher;
