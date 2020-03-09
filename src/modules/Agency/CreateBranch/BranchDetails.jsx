import React from 'react';
import {
  Input,
  Radio,
  Phone,
  Select,
  validation,
  composeValidators,
  Field
} from '@exzeo/core-ui';

import { STATUS } from '../../../constants/agency';

const mailAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

export const BranchDetails = () => {
  return (
    <React.Fragment>
      <Field
        name="displayName"
        dataTest="displayName"
        styleName="branchName"
        label="Branch Name"
        validate={validation.isRequired}
        component={Input}
      />
      <Field
        label="Web Address"
        styleName="webAddress"
        name="websiteUrl"
        dataTest="websiteUrl"
        component={Input}
        validate={validation.isWebAddress}
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
        name="mailCommissionChecksToBranch"
        dataTest="mailCommissionChecksToBranch"
        styleName="mailCommissionChecksToBranch"
        label="Mail Commission Checks to this Branch"
        component={Radio}
        segmented
        answers={mailAnswers}
        validate={validation.isRequired}
      />
      <Field
        name="mailPolicyDocsToBranch"
        dataTest="mailPolicyDocsToBranch"
        styleName="mailPolicyDocsToBranch"
        label="Mail Policy Docs to this Branch"
        component={Radio}
        segmented
        answers={mailAnswers}
        validate={validation.isRequired}
      />
      <hr />
      <Field
        label="Phone 1"
        styleName="primaryPhoneNumber"
        name="primaryPhoneNumber"
        dataTest="primaryPhoneNumber"
        component={Phone}
        validate={composeValidators([
          validation.isRequired,
          validation.isPhone
        ])}
      />
      <Field
        label="Phone 2"
        styleName="secondaryPhoneNumber"
        name="secondaryPhoneNumber"
        dataTest="secondaryPhoneNumber"
        component={Phone}
        validate={validation.isPhone}
      />
      <Field
        label="Fax"
        styleName="faxNumber"
        name="faxNumber"
        dataTest="faxNumber"
        component={Phone}
        validate={validation.isPhone}
      />
      <Field
        label="CSR Contact Email Address"
        styleName="customerServiceEmailAddress"
        name="customerServiceEmailAddress"
        dataTest="customerServiceEmailAddress"
        component={Input}
        validate={composeValidators([
          validation.isRequired,
          validation.isEmail
        ])}
      />
    </React.Fragment>
  );
};

BranchDetails.propTypes = {};

BranchDetails.defaultProps = {};

export default BranchDetails;
