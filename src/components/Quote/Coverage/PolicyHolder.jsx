import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Phone, Radio } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const firstNameDepends = validation.dependsOn(['pH2LastName', 'pH2email', 'pH2phone']);
const lastNameDepends = validation.dependsOn(['pH2FirstName', 'pH2email', 'pH2phone']);
const primaryPhoneDepends = validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2email']);
const emailAddressDepends = validation.dependsOn(['pH2FirstName', 'pH2LastName', 'pH2phone']);

const PolicyHolder = ({
  name, sectionId, sectionClass, header, headerSecondary, radioAnsers, canSendToDocusign, clearSecondaryPolicyholder, setPHToggle
}) => (
  <section name={name} id={sectionId} className={sectionClass}>
    <div id="policy-holder-a" className="flex-child policy-holder-a">
      <h3>{header}</h3>
      <div className="flex-parent col2 policy-holder-a-name">
        <div className="flex-child policy-holder-a-first-name">
          <Field
            component={Input}
            validate={validation.isRequired}
            label="First Name"
            name="pH1FirstName"
          />
        </div>
        <div className="flex-child policy-holder-a-last-name">
          <Field
            component={Input}
            validate={validation.isRequired}
            label="Last Name"
            name="pH1LastName"
          />
        </div>
      </div>
      <div className="flex-parent col2 policy-holder-a-phone">
        <div className="flex-child policy-holder-a-primary-phone">
          <Field
            component={Phone}
            validate={[validation.isRequired, validation.isPhone]}
            label="Primary Phone"
            name="pH1phone"
          />
        </div>
        <div className="flex-child policy-holder-a-secondary-phone">
          <Field
            component={Phone}
            validate={validation.isPhone}
            label="Secondary Phone"
            name="pH1phone2"
          />
        </div>
      </div>
      <div className="flex-parent policy-holder-a-email">
        <div className="flex-child email-address">
          <Field
            component={Input}
            validate={[validation.isRequired, validation.isEmail]}
            label="Email Address"
            name="pH1email"
          />
        </div>
        <div hidden className="flex-child electronicDelivery">
          <Field
            segmented
            component={Radio}
            label="Electronic Delivery"
            name="electronicDelivery"
            answers={radioAnsers}
          />
        </div>
      </div>
    </div>
    <div id="policy-holder-b" className="flex-child policy-holder-b">
      <div className="flex-header-wrap">
        <h3>{headerSecondary}</h3>
        <div className="check-box-wrapper">
          <Field
            name="clearFields"
            id="clearFields"
            component="input"
            type="checkbox"
            disabled={canSendToDocusign}
            normalize={value => clearSecondaryPolicyholder(value)}

          />
          <label htmlFor="clearFields"> Remove</label>
        </div>
      </div>
      <div className="flex-parent col2 policy-holder-b-name">
        <div className="flex-child policy-holder-b-first-name">
          <Field
            name="pH2FirstName"
            label="First Name"
            component={Input}
            validate={firstNameDepends}
            onChange={setPHToggle}
          />
        </div>
        <div className="flex-child policy-holder-b-last-name">
          <Field
            name="pH2LastName"
            label="Last Name"
            component={Input}
            validate={lastNameDepends}
            onChange={setPHToggle}
          />

        </div>
      </div>
      <div className="flex-parent col2 policy-holder-b-phone">
        <div className="flex-child policy-holder-b-primary-phone">
          <Field
            name="pH2phone"
            label="Primary Phone"
            component={Phone}
            validate={[primaryPhoneDepends, validation.isPhone]}
            onChange={setPHToggle}
          />
        </div>
        <div className="flex-child policy-holder-b-secondary-phone">
          <Field
            name="pH2phone2"
            label="Secondary Phone"
            component={Phone}
            validate={validation.isPhone}
            onChange={setPHToggle}
          />
        </div>
      </div>
      <div className="flex-parent policy-holder-b-email">
        <div className="flex-child email-address">
          <Field
            name="pH2email"
            label="Email Address"
            component={Input}
            validate={[emailAddressDepends, validation.isEmail]}
            onChange={setPHToggle}
          />
        </div>
      </div>
    </div>
  </section>
);

PolicyHolder.propTypes = {
  radioAnsers: PropTypes.array,
  canSendToDocusign: PropTypes.bool
};

PolicyHolder.defaultProps = {
  canSendToDocusign: false,
  radioAnsers: [
    {
      answer: false,
      label: 'No'
    }, {
      answer: true,
      label: 'Yes'
    }
  ]
};

export default PolicyHolder;
