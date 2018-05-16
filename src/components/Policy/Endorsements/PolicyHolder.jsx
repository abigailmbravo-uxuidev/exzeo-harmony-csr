import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

const { Input, Phone } = Inputs;
const { validation, normalize } = lifecycle;

const PolicyHolder = ({ setSecondaryPolicyHolder, policyHolders, setPHToggle }) => (
  <section name="policy" id="policy">
    <div className="flex-parent col2">
      {/* Col1 */}
      <div className="flex-child">
        <h3>Primary Policyholder</h3>
        <div className="flex-parent col2">
          <Field
            name="policyHolders[0].firstName"
            label="First Name"
            component={Input}
            validate={validation.isRequired}
          />
          <Field
            name="policyHolders[0].lastName"
            label="Last Name"
            component={Input}
            validate={validation.isRequired}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            name="policyHolders[0].primaryPhoneNumber"
            label="Primary Phone"
            component={Phone}
            validate={[validation.isRequired, validation.isPhone]}
          />
          <Field
            name="policyHolders[0].secondaryPhoneNumber"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
          />
        </div>
        <div className="flex-parent">
          <Field
            name="policyHolders[0].emailAddress"
            label="Email Address"
            component={Input}
            validate={[validation.isRequired, validation.isEmail]}
            normalize={normalize.email}
          />
          {/* electronic delivery question placeholder */ }
        </div>
      </div>
      {/* Col2 */}
      <div className="flex-child">
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
            />
            <label htmlFor="clearFields">Remove</label>
          </div>
        </div>
        <div className="flex-parent col2">
          <Field
            name="policyHolders[1].firstName"
            label="First Name"
            component={Input}
            validate={validation.dependsOn(['pH2LastName', 'pH2email', 'pH2phone'])}
            onChange={setPHToggle}
          />
          <Field
            name="policyHolders[1].lastName"
            label="Last Name"
            component={Input}
            validate={validation.dependsOn(['pH2FirstName', 'pH2email', 'pH2phone'])}
            onChange={setPHToggle}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            name="policyHolders[1].primaryPhoneNumber"
            label="Primary Phone"
            component={Phone}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2email']), validation.isPhone]}
            onChange={setPHToggle}
          />
          <Field
            name="policyHolders[1].secondaryPhoneNumber"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            onChange={setPHToggle}
          />
        </div>
        <div className="flex-parent">
          <Field
            name="policyHolders[1].emailAddress"
            label="Email Address"
            component={Input}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2phone']), validation.isEmail]}
            onChange={setPHToggle}
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
