import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../Form/inputs/TextField';
import PhoneField from '../../Form/inputs/PhoneField';
import {clearSecondaryPolicyholder, setCalculate, setPHToggle} from "./index";

const PolicyHolder = (props) => {
  return (
    <section name="policy" id="policy">
      <div className="flex-parent col2">
        {/* Col1 */}
        <div className="flex-child">
          <h3>Primary Policyholder</h3>
          <div className="flex-parent col2">
            <TextField validations={['required']} label="First Name" styleName="" name="pH1FirstName" onChange={() => setCalculate(props, false)} />
            <TextField validations={['required']} label="Last Name" styleName="" name="pH1LastName" onChange={() => setCalculate(props, false)} />
          </div>
          <div className="flex-parent col2">
            <PhoneField validations={['required', 'phone']} label="Primary Phone" styleName="" name="pH1phone" onChange={() => setCalculate(props, false)} />
            <PhoneField validations={['phone']} label="Secondary Phone" styleName="" name="pH1secondaryPhone" onChange={() => setCalculate(props, false)} />
          </div>
          <div className="flex-parent">
            <TextField validations={['required', 'email']} label="Email Address" styleName="" name="pH1email" onChange={() => setCalculate(props, false)} />
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
            <TextField label="First Name" dependsOn={['pH2LastName', 'pH2email', 'pH2phone']} styleName="" name="pH2FirstName" onChange={() => setPHToggle(props)} />
            <TextField label="Last Name" dependsOn={['pH2FirstName', 'pH2email', 'pH2phone']} styleName="" name="pH2LastName" onChange={() => setPHToggle(props)} />
          </div>
          <div className="flex-parent col2">
            <PhoneField validations={['phone']} label="Primary Phone" dependsOn={['pH2FirstName', 'pH2LastName', 'pH2email']} styleName="" name="pH2phone" onChange={() => setPHToggle(props)} />
            <PhoneField validations={['phone']} label="Secondary Phone" styleName="" name="pH2secondaryPhone" onChange={() => setPHToggle(props)} />
          </div>
          <div className="flex-parent">
            <TextField validations={['email']} label="Email Address" dependsOn={['pH2FirstName', 'pH2LastName', 'pH2phone']} styleName="" name="pH2email" onChange={() => setPHToggle(props)} />
          </div>
        </div>
      </div>
    </section>
  );
};

PolicyHolder.propTypes = {};

PolicyHolder.defaultProps = {};

export default PolicyHolder;
