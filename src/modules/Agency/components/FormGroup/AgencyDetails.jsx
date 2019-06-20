import React from 'react';
import { Field } from 'redux-form';
import {
  Input,
  Integer,
  Radio,
  Select,
  Phone,
  validation,
  Date,
  date
} from '@exzeo/core-ui';

import {
  STATUS,
  OK_TO_PAY,
  TAX_CLASSIFICATION
} from '../../../../constants/agency';

const AgencyDetails = ({ agencyCodeDisabled }) => {
  return (
    <React.Fragment>
      <Field
        label="Agency ID"
        styleName="agencyCode"
        name="agencyCode"
        dataTest="agencyCode"
        component={Integer}
        thousandSeparator={false}
        disabled={agencyCodeDisabled}
        validate={validation.isRequired}
      />
      <Field
        label="Agency Name"
        styleName="agencyName"
        name="displayName"
        dataTest="displayName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        label="Entity Name"
        styleName="entityName"
        name="legalName"
        dataTest="legalName"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        id="status"
        name="status"
        dataTest="status"
        styleName="status"
        label="Status"
        component={Select}
        validate={validation.isRequired}
        answers={STATUS}
      />
      <Field
        label="TPAID"
        styleName="tpaid"
        name="tpaid"
        dataTest="tpaid"
        component={Integer}
        validate={[validation.isRequired, validation.isNumbersOnly]}
      />
      <Field
        name="okToPay"
        dataTest="okToPay"
        styleName="okToPay-wrapper"
        label="Ok to Pay"
        component={Radio}
        segmented
        answers={OK_TO_PAY}
      />
      <Field
        label="Web Address"
        styleName="webAddress"
        name="websiteUrl"
        dataTest="websiteUrl"
        component={Input}
      />
      <Field
        label="Tax ID"
        styleName="taxId"
        name="taxIdNumber"
        dataTest="taxIdNumber"
        component={Input}
        validate={validation.isRequired}
      />
      <Field
        id="taxClassification"
        name="taxClassification"
        dataTest="taxClassification"
        styleName="taxClassification"
        label="Tax Classification"
        component={Select}
        validate={validation.isRequired}
        answers={TAX_CLASSIFICATION}
      />
      <Field
        label="EO Expiration Date"
        name="eoExpirationDate"
        dataTest="eoExpirationDate"
        styleName="eoExpirationDate"
        component={Date}
        format={value =>
          !value ? '' : date.formattedDate(value, 'YYYY-MM-DD')
        }
        validate={[
          validation.isRequired,
          validation.isDateRange('1900', '10000')
        ]}
      />
      <Field
        label="Branch Name"
        name="branchName"
        dataTest="branchName"
        styleName="branchName"
        component={Input}
      />
      <hr />
      <Field
        label="Phone 1"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={[validation.isRequired, validation.isPhone]}
      />
      <Field
        label="Phone 2"
        styleName="secondaryPhoneNumber"
        name="secondaryPhoneNumber"
        dataTest="secondaryPhoneNumber"
        component={Phone}
        validate={[validation.isPhone]}
      />
      <Field
        label="Fax"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}
        validate={[validation.isPhone]}
      />
      <Field
        label="CSR Contact Email Address"
        styleName="customerServiceEmailAddress"
        name="customerServiceEmailAddress"
        dataTest="customerServiceEmailAddress"
        component={Input}
        validate={[validation.isRequired, validation.isEmail]}
      />
    </React.Fragment>
  );
};

AgencyDetails.defaultProps = {
  agencyCodeDisabled: false
};

export default AgencyDetails;
