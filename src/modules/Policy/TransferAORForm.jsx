import React from 'react';
import { Form } from '@exzeo/core-ui';
import { AgencyAgentSelect } from '@exzeo/core-ui/src/@Harmony';

const TransferAORForm = ({
  children,
  handleSubmit,
  initialValues,
  formValues
}) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form
          id="TransferAORForm"
          className="application"
          onSubmit={handleSubmit}
        >
          <div className="card-block aor">
            <AgencyAgentSelect
              initialValues={initialValues}
              formValues={formValues}
              size="12"
            />
          </div>
          {children({ submitting, pristine })}
        </form>
      )}
    </Form>
  );
};

export default TransferAORForm;
