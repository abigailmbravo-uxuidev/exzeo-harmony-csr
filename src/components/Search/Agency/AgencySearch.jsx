import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';

const NewQuoteSearch = ({ disabled }) => {
  return (
    <div className="search-inputs fade-in">
      <Field
        name='agencyCode'
        component={Input}
        placeholder='Agency ID Search'
        label='Agency ID'
        styleName='agency-id-search'
      />
      <Field
        name='displayName'
        component={Input}
        placeholder='Agency Name Search'
        label='Agency Name'
        styleName='agency-name-search'
      />
      <Field
        name='address'
        component={Input}
        placeholder='Agency Address Search'
        label='Agency Address'
        styleName='agency-address-search'
      />
      <Field
        name='licenseNumber'
        component={Input}
        placeholder='Lic No Search'
        label='Lic Number'
        styleName='agency-reg-lic-fein-search'
      />
      <Field
        name='fein'
        component={Input}
        placeholder='FEIN No Search'
        label='FEIN Number'
        styleName='agency-reg-lic-fein-search'
      />
      <Field
        name='phone'
        component={Input}
        placeholder='Phone No Search'
        label='Agency Phone Number'
        styleName='agency-phone-search'
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

NewQuoteSearch.propTypes = {};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
