import React from 'react';
import {
  Field,
  Input,
  Integer,
  Radio,
  Select,
  Phone,
  validation,
  Date,
  format,
  composeValidators,
  SelectTypeAhead
} from '@exzeo/core-ui';

const { isRequired, validateState, validateZipCode } = validation;

const Address = ({ fieldPrefix, isOptional, listOfZipCodes }) => {
  return (
    <React.Fragment>
      <Field name={`${fieldPrefix}.address1`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Address 1"
            styleName="input"
            dataTest={`${fieldPrefix}.address1`}
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
            dataTest={`${fieldPrefix}.address2`}
          />
        )}
      </Field>

      <Field name={`${fieldPrefix}.city`} validate={isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="City"
            size="view-col-9"
            styleName="input"
            dataTest={`${fieldPrefix}.city`}
          />
        )}
      </Field>

      <Field
        name={`${fieldPrefix}.state`}
        parse={format.toUppercase}
        validate={composeValidators([isRequired, validateState])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="State"
            size="view-col-1"
            styleName="input"
            dataTest={`${fieldPrefix}.state`}
          />
        )}
      </Field>

      {listOfZipCodes.length > 0 && (
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
              validate={isOptional ? null : validation.isRequired}
              // normalize={normalizeZipCode}
              answers={listOfZipCodes}
              // disabled={sectionDisabled}
            />
          )}
        </Field>
      )}
      {listOfZipCodes.length === 0 && (
        <Field
          name={`${fieldPrefix}.zip`}
          validate={composeValidators([isRequired, validateZipCode])}
        >
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              label="Zip"
              size="view-col-2"
              styleName="input"
              dataTest={`${fieldPrefix}.zip`}
            />
          )}
        </Field>
      )}
    </React.Fragment>
  );
};

Address.defaultProps = {
  listOfZipCodes: []
};

export default Address;
