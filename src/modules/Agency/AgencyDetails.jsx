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
  composeValidators
} from '@exzeo/core-ui';

import { STATUS, OK_TO_PAY, TAX_CLASSIFICATION } from '../../constants/agency';

const AgencyDetails = ({ agencyCodeDisabled }) => {
  return (
    <React.Fragment>
      <Field name="agencyCode">
        {({ input, meta }) => (
          <Integer
            input={input}
            meta={meta}
            label="Agency ID"
            styleName="agencyCode"
            dataTest="agencyCode"
            placeholder="Generated if left blank"
            thousandSeparator={false}
            disabled={agencyCodeDisabled}
          />
        )}
      </Field>
      <Field name="displayName" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Agency Name"
            styleName="agencyName"
            dataTest="displayName"
          />
        )}
      </Field>
      <Field name="legalName" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Entity Name"
            styleName="entityName"
            dataTest="legalName"
          />
        )}
      </Field>
      <Field name="status" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Select
            input={input}
            meta={meta}
            id="status"
            dataTest="status"
            styleName="status"
            label="Status"
            answers={STATUS}
          />
        )}
      </Field>
      <Field
        name="tpaid"
        validate={composeValidators([
          validation.isRequired,
          validation.isNumbersOnly
        ])}
      >
        {({ input, meta }) => (
          <Integer
            input={input}
            meta={meta}
            label="TPAID"
            styleName="tpaid"
            dataTest="tpaid"
          />
        )}
      </Field>
      <Field name="okToPay">
        {({ input, meta }) => (
          <Radio
            input={input}
            meta={meta}
            dataTest="okToPay"
            styleName="okToPay-wrapper"
            label="Ok to Pay"
            segmented
            answers={OK_TO_PAY}
          />
        )}
      </Field>
      <Field name="websiteUrl" validate={validation.isWebAddress}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Web Address"
            styleName="webAddress"
            dataTest="websiteUrl"
          />
        )}
      </Field>
      <Field name="taxIdNumber" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="Tax ID"
            styleName="taxId"
            name="taxIdNumber"
            dataTest="taxIdNumber"
          />
        )}
      </Field>
      <Field name="taxClassification" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Select
            input={input}
            meta={meta}
            id="taxClassification"
            dataTest="taxClassification"
            styleName="taxClassification"
            label="Tax Classification"
            answers={TAX_CLASSIFICATION}
          />
        )}
      </Field>
      <Field
        name="eoExpirationDate"
        validate={composeValidators([
          validation.isRequired,
          validation.isDateRange('1900', '10000')
        ])}
      >
        {({ input, meta }) => (
          <Date
            input={input}
            meta={meta}
            label="EO Expiration Date"
            dataTest="eoExpirationDate"
            styleName="eoExpirationDate"
          />
        )}
      </Field>
      <hr />
      <Field
        name="primaryPhoneNumber"
        validate={composeValidators([
          validation.isRequired,
          validation.isPhone
        ])}
      >
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Phone 1"
            styleName="primaryPhoneNumber"
            dataTest="primaryPhoneNumber"
          />
        )}
      </Field>
      <Field name="secondaryPhoneNumber" validate={validation.isPhone}>
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Phone 2"
            styleName="secondaryPhoneNumber"
            dataTest="secondaryPhoneNumber"
          />
        )}
      </Field>
      <Field name="faxNumber" validate={validation.isPhone}>
        {({ input, meta }) => (
          <Phone
            input={input}
            meta={meta}
            label="Fax"
            styleName="faxNumber"
            dataTest="faxNumber"
          />
        )}
      </Field>
      <Field
        name="customerServiceEmailAddress"
        validate={composeValidators([
          validation.isRequired,
          validation.isEmail
        ])}
      >
        {({ input, meta }) => (
          <Input
            input={input}
            meta={meta}
            label="CSR Contact Email Address"
            styleName="customerServiceEmailAddress"
            name="customerServiceEmailAddress"
            dataTest="csrEmail"
          />
        )}
      </Field>
    </React.Fragment>
  );
};

AgencyDetails.defaultProps = {
  agencyCodeDisabled: false
};

export default AgencyDetails;
