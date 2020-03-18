import React from 'react';
import {
  Field,
  Input,
  Select,
  validation,
  format,
  composeValidators,
  SelectTypeAhead
} from '@exzeo/core-ui';

const { isRequired, validateState, validateZipCode } = validation;

const Address = ({
  fieldPrefix,
  isOptional,
  listOfPostalCodes,
  setDisabled,
  listAnswersAsKey,
  postalCodeInput,
  setPostalCodeInput
}) => {
  return (
    <React.Fragment>
      <Field name={`${fieldPrefix}.address1`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address 1"
            styleName="input"
            disabled={setDisabled}
            dataTest="address1"
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.address2`}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address 2"
            styleName="input"
            disabled={setDisabled}
            dataTest="address2"
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="City"
            styleName="input"
            disabled={setDisabled}
            dataTest="city"
          />
        )}
      </Field>

      <Field
        name={`${fieldPrefix}.state`}
        parse={format.toUppercase}
        validate={composeValidators([isRequired, validateState])}
      >
        {({ input, meta }) => (
          <Select
            input={input}
            meta={meta}
            label="State"
            styleName="state"
            answers={listAnswersAsKey.US_states}
            disabled={setDisabled}
            dataTest="state"
          />
        )}
      </Field>

      {listOfPostalCodes && (
        <Field
          name={`${fieldPrefix}.zip`}
          validate={isOptional ? null : validation.isRequired}
        >
          {({ input, meta }) => (
            <SelectTypeAhead
              input={input}
              meta={meta}
              label="Zip Code"
              styleName="zip"
              dataTest="zip"
              optionValue="answer"
              optionLabel="label"
              inputValue={postalCodeInput}
              onInputChange={value => setPostalCodeInput(value)}
              disabled={setDisabled}
              validate={isOptional ? null : validation.isRequired}
              answers={listOfPostalCodes}
            />
          )}
        </Field>
      )}
      {!listOfPostalCodes && (
        <Field
          name={`${fieldPrefix}.zip`}
          validate={composeValidators([isRequired, validateZipCode])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              label="Zip Code"
              size="view-col-2"
              styleName="input"
              disabled={setDisabled}
              dataTest="zip"
            />
          )}
        </Field>
      )}
    </React.Fragment>
  );
};

export default Address;
