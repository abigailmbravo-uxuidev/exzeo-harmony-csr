import React from 'react';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

const MailingAddress = props => (
  <section name="addresses" id="addresses">
    <h3>Mailing Address</h3>
    <div className="flex-parent wrap">
      <div className="address">
        <Field
          name="address1New"
          label="Address 1"
          component={Input}
        />
      </div>
      <div className="address">
        <Field
          name="address2New"
          label="Address 2"
          component={Input}
        />
      </div>
      <div className="city">
        <Field
          name="cityNew"
          label="City"
          component={Input}
        />
      </div>
      <div className="state">
        <Field
          name="stateNew"
          label="State"
          component={Input}
        />
      </div>
      <div className="zip">
        <Field
          name="zipNew"
          label="Zip"
          component={Input}
        />
      </div>
    </div>
  </section>
);

MailingAddress.propTypes = {};

MailingAddress.defaultProps = {};

export default MailingAddress;
