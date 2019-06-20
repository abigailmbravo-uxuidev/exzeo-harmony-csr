import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Phone, validation, normalize } from '@exzeo/core-ui';

const firstNameDepends = validation.dependsOn([
  'policyHolders[1].lastName',
  'policyHolders[1].emailAddress',
  'policyHolders[1].primaryPhoneNumber'
]);
const lastNameDepends = validation.dependsOn([
  'policyHolders[1].firstName',
  'policyHolders[1].emailAddress',
  'policyHolders[1].primaryPhoneNumber'
]);
const primaryPhoneDepends = validation.dependsOn([
  'policyHolders[1].firstName',
  'policyHolders[1].lastName',
  'policyHolders[1].emailAddress'
]);
const emailAddressDepends = validation.dependsOn([
  'policyHolders[1].firstName',
  'policyHolders[1].lastName',
  'policyHolders[1].primaryPhoneNumber'
]);

const PolicyHolder = ({
  setSecondaryPolicyHolder,
  policyHolders,
  setPHToggle
}) => (
  <section name="policy" id="policy">
    <div className="flex-row">
      {/* Col1 */}
      <div className="col-2">
        <h3>Primary Policyholder</h3>
        <div className="flex-row">
          <Field
            name="policyHolders[0].firstName"
            label="First Name"
            component={Input}
            validate={validation.isRequired}
            dataTest="pH1FirstName"
          />
          <Field
            name="policyHolders[0].lastName"
            label="Last Name"
            component={Input}
            validate={validation.isRequired}
            dataTest="pH1LastName"
          />
        </div>
        <div className="flex-row">
          <Field
            name="policyHolders[0].primaryPhoneNumber"
            label="Primary Phone"
            component={Phone}
            validate={[validation.isRequired, validation.isPhone]}
            dataTest="pH1phone"
          />
          <Field
            name="policyHolders[0].secondaryPhoneNumber"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            dataTest="pH1secondaryPhone"
          />
        </div>
        <div className="flex-row">
          <Field
            name="policyHolders[0].emailAddress"
            label="Email Address"
            component={Input}
            validate={[validation.isRequired, validation.isEmail]}
            normalize={normalize.email}
            dataTest="pH1email"
          />
          {/* electronic delivery question placeholder */}
        </div>
      </div>
      {/* Col2 */}
      <div className="col-2">
        <div className="flex-header-wrap">
          <h3>Secondary Policyholder</h3>
          <div className="check-box-wrapper">
            <Field
              name="clearFields"
              id="clearFields"
              component="input"
              type="checkbox"
              normalize={setSecondaryPolicyHolder}
              disabled={!(policyHolders && policyHolders[1])}
              data-test="clearFields"
            />
            <label htmlFor="clearFields">Remove</label>
          </div>
        </div>
        <div className="flex-row">
          <Field
            name="policyHolders[1].firstName"
            label="First Name"
            component={Input}
            validate={firstNameDepends}
            onChange={setPHToggle}
            dataTest="pH2FirstName"
          />
          <Field
            name="policyHolders[1].lastName"
            label="Last Name"
            component={Input}
            validate={lastNameDepends}
            onChange={setPHToggle}
            dataTest="pH2LastName"
          />
        </div>
        <div className="flex-row">
          <Field
            name="policyHolders[1].primaryPhoneNumber"
            label="Primary Phone"
            component={Phone}
            validate={[primaryPhoneDepends, validation.isPhone]}
            onChange={setPHToggle}
            dataTest="pH2phone"
          />
          <Field
            name="policyHolders[1].secondaryPhoneNumber"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            onChange={setPHToggle}
            dataTest="pH2secondaryPhone"
          />
        </div>
        <div className="flex-row">
          <Field
            name="policyHolders[1].emailAddress"
            label="Email Address"
            component={Input}
            validate={[emailAddressDepends, validation.isEmail]}
            onChange={setPHToggle}
            dataTest="pH2email"
          />
        </div>
      </div>
    </div>
  </section>
);

PolicyHolder.propTypes = {
  clearSecondaryPolicyholder: PropTypes.func,
  policyHolders: PropTypes.array,
  setPHToggle: PropTypes.func
};

PolicyHolder.defaultProps = {};

export default PolicyHolder;
