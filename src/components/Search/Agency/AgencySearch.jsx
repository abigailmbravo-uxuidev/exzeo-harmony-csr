import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Integer, Phone } from '@exzeo/core-ui/lib/Input';
import { isValidChar, isNumbersOnly } from '@exzeo/core-ui/lib/InputLifecycle';

const AgencySearch = ({ submitting }) => {
  return (
    <div className="search-inputs fade-in">
      <Field
        name='agencyCode'
        component={Integer}
        placeholder='Agency ID Search'
        label='Agency ID'
        styleName='agency-id-search'
        thousandSeparator={false}
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
      <Field
        name='fein'
        component={Input}
        placeholder='FEIN No Search'
        label='FEIN Number'
        styleName='agency-reg-lic-fein-search'
      />
      <Field
        name='phone'
        component={Phone}
        placeholder='Phone No Search'
        label='Agency Phone Number'
        styleName='agency-phone-search'
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

AgencySearch.propTypes = {
  submitting: PropTypes.bool
};

AgencySearch.defaultProps = {};

export default AgencySearch;
