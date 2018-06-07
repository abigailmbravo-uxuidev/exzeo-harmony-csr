import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Integer } from '@exzeo/core-ui/lib/Input';
import { isAlphaNumeric, isValidChar } from '@exzeo/core-ui/lib/InputLifecycle';

const AgentSearch = ({ submitting }) => {
  return (
    <div className="search-inputs fade-in">
      <Field
        name='agentCode'
        component={Integer}
        placeholder='Agent ID Search'
        label='Agent ID'
        styleName='agency-id-search'
      />
      <Field
        name='firstName'
        component={Input}
        placeholder='First Name Search'
        label='First Name'
        styleName='first-name-search'
        errorHint
        validate={isAlphaNumeric}
      />
      <Field
        name='lastName'
        component={Input}
        placeholder='Last Name Search'
        label='Last Name'
        styleName='last-name-search'
        errorHint
        validate={isAlphaNumeric}
      />
      <Field
        name='address'
        component={Input}
        placeholder='Agent Address Search'
        label='Agent Address'
        styleName='agency-address-search'
        errorHint
        validate={isValidChar}
      />
      <Field
        name='licenseNumber'
        component={Input}
        placeholder='Lic No Search'
        label='Lic Number'
        styleName='agency-reg-lic-fein-search'
      />

      <button
        className="btn btn-success multi-input"
        type="submit"
        disabled={submitting}
      >
        <i className="fa fa-search" />Search
      </button>
    </div>
  );
};

AgentSearch.propTypes = {
  submitting: PropTypes.bool
};

AgentSearch.defaultProps = {};

export default AgentSearch;
