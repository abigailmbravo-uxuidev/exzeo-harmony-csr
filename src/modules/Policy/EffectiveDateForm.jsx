import React from 'react';
import { Form, Loader, Field, Select, validation, Date } from '@exzeo/core-ui';

const EffectiveDateForm = ({
  children,
  handleSubmit,
  initialValues,
  effectiveDateReasons
}) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true, values: true }}
    >
      {({ handleSubmit, submitting, pristine, values: formValues }) => (
        <form
          id="EffectiveDateForm"
          className="effective-date"
          onSubmit={handleSubmit}
        >
          {submitting && <Loader />}
          <div className="card-block unsaved-changes">
            <Field name="effectiveDate" validate={validation.isRequired}>
              {({ input, meta }) => (
                <Date
                  input={input}
                  meta={meta}
                  styleName="effectiveDate"
                  dataTest="effectiveDate"
                  label="Effective Date"
                />
              )}
            </Field>
            <Field
              name="effectiveDateChangeReason"
              validate={validation.isRequired}
            >
              {({ input, meta }) => (
                <Select
                  input={input}
                  meta={meta}
                  styleName="effectiveDateChangeReason"
                  dataTest="agentCode"
                  label="Reason For Change"
                  answers={effectiveDateReasons}
                />
              )}
            </Field>
          </div>
          {children({ submitting, pristine })}
        </form>
      )}
    </Form>
  );
};

export default EffectiveDateForm;
