import React from 'react';
import { Field, Input } from '@exzeo/core-ui';

const CustomFields = () => {
  return (
    <>
      <Field name="customfield2">
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            dataTest="ph-name"
            label="Name"
            styleName="phName"
            readOnly
          />
        )}
      </Field>
      <Field name="customfield1">
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            dataTest="ph-number"
            label="Policy Number"
            styleName="policyNumber"
            readOnly
          />
        )}
      </Field>
      <Field name="customfield3">
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            dataTest="batch-id"
            label="Batch ID"
            styleName="batchID"
            readOnly
          />
        )}
      </Field>
    </>
  );
};

export default CustomFields;
