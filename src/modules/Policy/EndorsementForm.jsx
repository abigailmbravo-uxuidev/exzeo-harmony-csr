// @ts-nocheck
import React from 'react';
import {
  FormSpy,
  Form,
  Field,
  Date,
  Currency,
  validation,
  Loader
} from '@exzeo/core-ui';

const EndorsementForm = ({ children, handleSubmit, initialValues }) => {
  const validateEndorsementDate = (...args) => {
    // we shouldn't need to do this, waiting for a patch from redux-form
    if (!initialValues) return undefined;
    return (
      validation.isDate(...args) &&
      validation.isDateRange(
        initialValues.effectiveDate,
        initialValues.endDate
      )(...args)
    );
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      subscription={{ submitting: true, pristine: true }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <React.Fragment>
          {submitting && <Loader />}
          <form
            id="EndorsePolicy"
            className="endorse-policy"
            onSubmit={handleSubmit}
          >
            <div className="endo-results-calc">
              <div className="flex-parent">
                <div className="form-group endorsement-date-wrapper">
                  <Field
                    name="endorsementDate"
                    validate={validateEndorsementDate}
                  >
                    {({ input, meta }) => (
                      <Date
                        input={input}
                        meta={meta}
                        styleName="endorsementDate"
                        dataTest="endorsementDate"
                        label="Endorsement Effective Date"
                      />
                    )}
                  </Field>
                </div>
                <Field name="rating.endorsementAmount">
                  {({ input, meta }) => (
                    <Field
                      name="rating.endorsementAmount"
                      label="New End Amount"
                      component={Currency}
                      disabled
                      dataTest="endorsementAmount"
                    />
                  )}
                </Field>
                <Field name="rating.newCurrentPremium">
                  {({ input, meta }) => (
                    <Field
                      name="rating.newCurrentPremium"
                      label="New End Premium"
                      component={Currency}
                      disabled
                      dataTest="newCurrentPremium"
                    />
                  )}
                </Field>
                <Field name="rating.newAnnualPremium">
                  {({ input, meta }) => (
                    <Field
                      name="rating.newAnnualPremium"
                      label="New Annual Premium"
                      component={Currency}
                      disabled
                      dataTest="newAnnualPremium"
                    />
                  )}
                </Field>
                {children({ submitting, pristine })}
              </div>
            </div>
          </form>
        </React.Fragment>
      )}
    </Form>
  );
};

export default EndorsementForm;
