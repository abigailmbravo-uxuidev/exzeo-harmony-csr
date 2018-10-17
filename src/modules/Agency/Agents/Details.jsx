import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Integer, Phone, Radio, validation } from '@exzeo/core-ui';

const radioStatusAnswers = [
  {
    answer: 'Active',
    label: 'Active'
  }, {
    answer: 'Inactive',
    label: 'Inactive'
  }
];

const Details = ({ isEditing }) => {
  return (
    <React.Fragment>
      <Field
        name="agentCode"
        label="Agent ID"
        component={Integer}
        dataTest="agentCode"
        styleName="agentCode"
        validate={[validation.isRequired, validation.isNumbersOnly]}
        disabled={isEditing}
        thousandSeparator={false} />
      <Field
        name="firstName"
        label="First Name"
        component={Input}
        dataTest="firstName"
        styleName="firstName"
        validate={validation.isRequired} />
      <Field
        name="lastName"
        label="Last Name"
        component={Input}
        dataTest="lastName"
        styleName="lastName"
        validate={validation.isRequired} />
      <Field
        name="primaryPhoneNumber"
        label="Primary Phone"
        component={Phone}
        dataTest="primaryPhoneNumber"
        styleName="primaryPhoneNumber"
        validate={validation.isRequired} />
      <Field
        name="secondaryPhoneNumber"
        label="Secondary Phone"
        component={Phone}
        dataTest="secondaryPhoneNumber"
        styleName="secondaryPhoneNumber" />
      <Field
        name="faxNumber"
        label="Fax Number"
        component={Phone}
        dataTest="faxNumber"
        styleName="faxNumber" />
      <Field
        name="status"
        label="Status"
        component={Radio}
        dataTest="status"
        styleName="status"
        validate={validation.isRequired}
        answers={radioStatusAnswers}
        segmented />
      <Field
        name="emailAddress"
        label="Email Address"
        component={Input}
        dataTest="emailAddress"
        styleName="emailAddress"
        validate={[validation.isRequired, validation.isEmail]} />
    </React.Fragment>
  );
};

Details.propTypes = {};

Details.defaultProps = {};

export default Details;
