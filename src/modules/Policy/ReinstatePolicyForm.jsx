import React from 'react';
import { Form, Loader, Field, validation } from '@exzeo/core-ui';

const ReinstatePolicyForm = ({
  children,
  handleSubmit,
  initialValues,
  policyNumber
}) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true, values: true }}
    >
      {({ handleSubmit, submitting, pristine, values: formValues }) => (
        <form
          id="ReinstatePolicyForm"
          className="reinstate-policy"
          onSubmit={handleSubmit}
        >
          {submitting && <Loader />}
          <div className="card-block">
            <h5>Reinstate this policy?</h5>
            <label htmlFor="reinstatePolicy">{`Yes, I want to reinstate policy: ${policyNumber} `}</label>
            <Field
              name="reinstatePolicy"
              component="input"
              type="checkbox"
              validate={validation.isRequired}
            />
          </div>
          {children({ submitting, pristine, formValues })}
        </form>
      )}
    </Form>
  );
};

export default ReinstatePolicyForm;
