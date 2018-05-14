import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

const {
  validation
} = lifecycle;

const MailingAddress = () => (
  <section name="addresses" id="addresses">
    <h3>Mailing Address</h3>
    <div className="flex-parent wrap">
      <div className="address">
        <Field
          name="policyHolderMailingAddress.address1"
          label="Address 1"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="address">
        <Field
          name="policyHolderMailingAddress.address2"
          label="Address 2"
          component={Input}
        />
      </div>
      <div className="city">
        <Field
          name="policyHolderMailingAddress.city"
          label="City"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="state">
        <Field
          name="policyHolderMailingAddress.state"
          label="State"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
      <div className="zip">
        <Field
          name="policyHolderMailingAddress.zip"
          label="Zip"
          component={Input}
          validate={validation.isRequired}
        />
      </div>
    </div>
  </section>
);

MailingAddress.propTypes = {};

MailingAddress.defaultProps = {};

export default MailingAddress;
