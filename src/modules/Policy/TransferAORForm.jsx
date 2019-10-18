import React from 'react';
import { Form, Loader } from '@exzeo/core-ui';
import { AgencyAgentSelect } from '@exzeo/core-ui/src/@Harmony';

const TransferAORForm = ({ children, handleSubmit, initialValues }) => {
  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true, values: true }}
    >
      {({ handleSubmit, submitting, pristine, values: formValues }) => (
        <form
          id="TransferAORForm"
          className="application"
          onSubmit={handleSubmit}
        >
          {submitting && <Loader />}
          <div className="card-block aor">
            <AgencyAgentSelect
              initialValues={initialValues}
              formValues={formValues}
              size="12"
              statuses={['Active', 'Service Only', 'Pending']}
            />
          </div>
          {children({ submitting, pristine })}
        </form>
      )}
    </Form>
  );
};

export default TransferAORForm;
