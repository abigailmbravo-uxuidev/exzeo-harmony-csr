import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

const { Input, Phone } = Inputs;
const {
  validation, normalize, parse
} = lifecycle;

const PolicyHolder = props => (
  <section name="policy" id="policy">
    <div className="flex-parent col2">
      {/* Col1 */}
      <div className="flex-child">
        <h3>Primary Policyholder</h3>
        <div className="flex-parent col2">
          <Field
            name="pH1FirstName"
            label="First Name"
            component={Input}
            validate={validation.isRequired}
          />
          <Field
            name="pH1LastName"
            label="Last Name"
            component={Input}
            validate={validation.isRequired}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            name="pH1phone"
            label="Primary Phone"
            component={Phone}
            validate={[validation.isRequired, validation.isPhone]}
            parse={parse.toNumberString}
          />
          <Field
            name="pH1secondaryPhone"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            parse={parse.toNumberString}
          />
        </div>
        <div className="flex-parent">
          <Field
            name="pH1email"
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
              normalize={props.clearSecondaryPolicyholder}
              disabled={!(props.policy && props.policy.policyHolders && props.policy.policyHolders[1])}
            />
            <label htmlFor="clearFields">Remove</label>
          </div>
        </div>
        <div className="flex-parent col2">
          <Field
            name="pH2FirstName"
            label="First Name"
            component={Input}
            validate={validation.dependsOn(['pH2LastName', 'pH2email', 'pH2phone'])}
            onChange={props.setPHToggle}
          />
          <Field
            name="pH2LastName"
            label="Last Name"
            component={Input}
            validate={validation.dependsOn(['pH2FirstName', 'pH2email', 'pH2phone'])}
            onChange={props.setPHToggle}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            name="pH2phone"
            label="Primary Phone"
            component={Phone}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2email']), validation.isPhone]}
            parse={parse.toNumberString}
            onChange={props.setPHToggle}
          />
          <Field
            name="pH2secondaryPhone"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            parse={parse.toNumberString}
            onChange={props.setPHToggle}
          />
        </div>
        <div className="flex-parent">
          <Field
            name="pH2email"
            label="Email Address"
            component={Input}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2phone']), validation.isEmail]}
            onChange={props.setPHToggle}
          />
        </div>
      </div>
    </div>
  </section>
);

PolicyHolder.propTypes = {};

PolicyHolder.defaultProps = {};

export default PolicyHolder;
