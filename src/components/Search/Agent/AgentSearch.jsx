import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';

const AgentSearch = ({ disabled }) => {
  return (
    <div className="search-inputs fade-in">
      <Field
        name='agentCode'
        component={Input}
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
      />
      <Field
        name='lastName'
        component={Input}
        placeholder='Last Name Search'
        label='Last Name'
        styleName='last-name-search'
      />
      <Field
        name='address'
        component={Input}
        placeholder='Agent Address Search'
        label='Agent Address'
        styleName='agency-address-search'
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
        disabled={disabled}
      >
        <i className="fa fa-search" />Search
      </button>
    </div>
  );
};

AgentSearch.propTypes = {};

AgentSearch.defaultProps = {};

export default AgentSearch;
