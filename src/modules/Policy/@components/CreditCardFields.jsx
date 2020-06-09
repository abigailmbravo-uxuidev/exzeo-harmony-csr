import React from 'react';
import { composeValidators, Field, Input, validation } from '@exzeo/core-ui';
import { ccValidation } from '@exzeo/core-ui/src/@Harmony';

const CreditCardFields = ({ disabled, amountField }) => {
  return (
    <React.Fragment>
      <h4>
        Credit Card Information{' '}
        <span>
          <i className="fa fa-cc-visa" />
          &nbsp;
          <i className="fa fa-cc-mastercard" />
          &nbsp;
          <i className="fa fa-cc-discover" />
        </span>
      </h4>

      <section className="flex-row">
        {amountField}

        <Field
          name="cc"
          validate={composeValidators([
            validation.isRequired,
            ccValidation.isValidCreditCard
          ])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="cardNumber"
              label="Credit Card Number"
              styleName="ccNumber"
              placeholder="XXXXXXXXXXXXXXXX"
              disabled={disabled}
            />
          )}
        </Field>
        <Field
          name="exp"
          validate={composeValidators([
            validation.isRequired,
            validation.isNumbersOnly,
            ccValidation.isValidExpirationDate
          ])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="expDate"
              label="Expiration Date"
              styleName="ccDate"
              placeholder="MMYY"
              disabled={disabled}
            />
          )}
        </Field>
        <Field
          name="cvv"
          validate={composeValidators([
            validation.isRequired,
            ccValidation.isValidCVV
          ])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="cvv"
              label="CVV"
              styleName="ccCvv"
              placeholder="XXX"
              disabled={disabled}
            />
          )}
        </Field>
      </section>
    </React.Fragment>
  );
};

export default CreditCardFields;
