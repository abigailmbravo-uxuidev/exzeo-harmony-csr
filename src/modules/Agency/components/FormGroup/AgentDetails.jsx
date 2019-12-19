import React from 'react';
import { Field } from 'redux-form';
import { Input, Integer, Phone, Select, validation } from '@exzeo/core-ui';

import { STATUS } from '../../../../constants/agency';

const Details = ({ isEditing }) => {
  return (
    <React.Fragment>
      <div className="agent-name">
        <Field
          name="agentCode"
          label="Agent ID"
          component={Integer}
          dataTest="agentCode"
          styleName="agentCode"
          validate={validation.isNumbersOnly}
          disabled={isEditing}
          placeholder="Generated if blank"
          thousandSeparator={false}
        />
        <Field
          name="firstName"
          label="First Name"
          component={Input}
          dataTest="firstName"
          styleName="firstName"
          validate={validation.isRequired}
        />
        <Field
          name="lastName"
          label="Last Name"
          component={Input}
          dataTest="lastName"
          styleName="lastName"
          validate={validation.isRequired}
        />
      </div>
      <div className="agent-phone">
        <Field
          name="primaryPhoneNumber"
          label="Primary Phone"
          component={Phone}
          dataTest="primaryPhoneNumber"
          styleName="primaryPhoneNumber"
          validate={validation.isRequired}
        />
        <Field
          name="primaryPhoneNumberExtension"
          label="Primary Phone Extension"
          component={Input}
          dataTest="primaryPhoneNumberExtension"
          styleName="primaryPhoneNumberExtension"
        />
        <Field
          name="secondaryPhoneNumber"
          label="Secondary Phone"
          component={Phone}
          dataTest="secondaryPhoneNumber"
          styleName="secondaryPhoneNumber"
        />
        <Field
          name="faxNumber"
          label="Fax Number"
          component={Phone}
          dataTest="faxNumber"
          styleName="faxNumber"
        />
      </div>
      <div className="agent-status-email">
        <Field
          name="status"
          label="Status"
          component={Select}
          dataTest="status"
          styleName="status"
          validate={validation.isRequired}
          answers={STATUS}
        />
        <Field
          name="emailAddress"
          label="Email Address"
          component={Input}
          dataTest="emailAddress"
          styleName="emailAddress"
          validate={[validation.isRequired, validation.isEmail]}
        />
      </div>
    </React.Fragment>
  );
};

Details.defaultProps = {
  isEditing: false
};

export default Details;
