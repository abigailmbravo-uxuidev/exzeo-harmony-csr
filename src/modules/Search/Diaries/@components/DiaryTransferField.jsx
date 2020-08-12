import React from 'react';
import { Field } from '@exzeo/core-ui';

const DiaryTransferField = ({ id }) => {
  return (
    <div className="transfer_checkbox_wrapper fade-in" key={id}>
      <Field
        name={`diaries.${id}`}
        initialValue={false}
        data-test={id}
        component="input"
        type="checkbox"
      />
    </div>
  );
};

export default DiaryTransferField;
