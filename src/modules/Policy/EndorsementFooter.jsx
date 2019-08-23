import React from 'react';
import { Field, Date, validation, Currency } from '@exzeo/core-ui';

const EndorsementFooter = props => {
  const validateEndorsementDate = (...args) => {
    // we shouldn't need to do this, waiting for a patch from redux-form
    const { initialValues } = props;
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
    <div className="endo-results-calc">
      <div className="flex-parent">
        <div className="form-group endorsement-date-wrapper">
          <Field name="endorsementDate" validate={validateEndorsementDate}>
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
        {props.children}
      </div>
    </div>
  );
};

EndorsementFooter.propTypes = {};

EndorsementFooter.defaultProps = {};

export default EndorsementFooter;
