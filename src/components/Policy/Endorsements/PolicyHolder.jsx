import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import TextField from '../../Form/inputs/TextField';
import { clearSecondaryPolicyholder, setPHToggle } from './index';

const { Input } = Inputs;
const {
  validation, normalize
} = lifecycle;

const PolicyHolder = props => (
  <section name="policy" id="policy">
    <div className="flex-parent col2">
      {/* Col1 */}
      <div className="flex-child">
        <h3>Primary Policyholder</h3>
        <div className="flex-parent col2">
          <Field
            label="First Name"
            name="pH1FirstName"
            component={Input}
            validate={validation.isRequired}
          />
          <TextField
            label="Last Name"
            name="pH1LastName"
            component={Input}
            validate={validation.isRequired}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            label="Primary Phone"
            name="pH1phone"
            component={Input}
            validate={[validation.isRequired, validation.isPhone]}
            normalize={normalize.phone}
          />
          <Field
            label="Secondary Phone"
            name="pH1secondaryPhone"
            component={Input}
            validate={validation.isPhone}
            normalize={normalize.phone}
          />
        </div>
        <div className="flex-parent">
          <Field
            label="Email Address"
            name="pH1email"
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
              onChange={event => clearSecondaryPolicyholder(String(event.target.value) === 'false', props)}
              name="clearFields"
              id="clearFields"
              component="input"
              type="checkbox"
              disabled={!(props.policy && props.policy.policyHolders && props.policy.policyHolders[1])}
            />
            <label htmlFor="clearFields">Remove</label>
          </div>
        </div>
        <div className="flex-parent col2">
          <Field
            label="First Name"
            name="pH2FirstName"
            component={Input}
            validate={validation.dependsOn(['pH2LastName', 'pH2email', 'pH2phone'])}
            onChange={() => setPHToggle(props)}
          />
          <Field
            label="Last Name"
            name="pH2LastName"
            component={Input}
            validate={validation.dependsOn(['pH2FirstName', 'pH2email', 'pH2phone'])}
            onChange={() => setPHToggle(props)}
          />
        </div>
        <div className="flex-parent col2">
          <Field
            label="Primary Phone"
            name="pH2phone"
            component={Input}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2email']), validation.isPhone]}
            normalize={normalize.phone}
            onChange={() => setPHToggle(props)}
          />
          <Field
            label="Secondary Phone"
            name="pH2secondaryPhone"
            component={Input}
            validate={validation.isPhone}
            normalize={normalize.phone}
            onChange={() => setPHToggle(props)}
          />
        </div>
        <div className="flex-parent">
          <Field
            label="Email Address"
            name="pH2email"
            component={Input}
            validate={[validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2phone']), validation.isEmail]}
            onChange={() => setPHToggle(props)}
          />
        </div>
      </div>
    </div>
  </section>
);

PolicyHolder.propTypes = {};

PolicyHolder.defaultProps = {};

export default PolicyHolder;
