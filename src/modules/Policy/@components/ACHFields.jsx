import React from 'react';
import { composeValidators, Field, Input, validation } from '@exzeo/core-ui';
import { ccValidation } from '@exzeo/core-ui/src/@Harmony';

import check from '../../../img/check.svg';

const ACHFields = ({ disabled, amountField }) => {
  return (
    <React.Fragment>
      <h4>
        Account Information{' '}
        <div className="checkwrapper">
          <img src={check} alt="Harmony" />
        </div>
      </h4>
      <section className="flex-row">
        <input type="hidden" name="media" value="ach" />

        {amountField}

        <Field
          name="routing"
          validate={composeValidators([
            validation.isRequired,
            ccValidation.isValidRoutingNumber
          ])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="routing"
              label="Routing"
              styleName="achRouting"
              placeholder="XXXXXXXXX"
              disabled={disabled}
            />
          )}
        </Field>
        <Field
          name="account"
          validate={composeValidators([
            validation.isRequired,
            ccValidation.isValidAccountNumber
          ])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              dataTest="account"
              label="Account"
              styleName="achAccount"
              placeholder="XXXXXXXXXXXX"
              disabled={disabled}
            />
          )}
        </Field>
        <div className="account-type">
          <div className="label">Account Type</div>
          <input
            type="radio"
            id="checking"
            name="savings"
            value="n"
            defaultChecked
          />
          <label htmlFor="checking" tabIndex="0">
            Checking
          </label>
          <input type="radio" id="savings" name="savings" value="y" />
          <label htmlFor="savings" tabIndex="0">
            Savings
          </label>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ACHFields;
