import React from 'react';
import { Form } from '@exzeo/core-ui';
import SendApplicationHO3Script from './SendApplictionHO3Script';
import SendApplicationBaseScript from './SendApplicationBaseScript';

const SendApplicationForm = ({ children, handleSubmit, initialValues }) => {
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form
          id="sendApplicationForm"
          className="application"
          onSubmit={handleSubmit}
        >
          <div className="card-block user-script">
            {initialValues.product === 'HO3' && (
              <SendApplicationHO3Script initialValues={initialValues} />
            )}
            <SendApplicationBaseScript initialValues={initialValues} />
          </div>
          {children({ submitting, pristine })}
        </form>
      )}
    </Form>
  );
};

export default SendApplicationForm;
