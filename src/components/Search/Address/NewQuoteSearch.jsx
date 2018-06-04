import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';

const NewQuoteSearch = ({ submitting }) => (
  <div className="search-inputs fade-in">
    <Field
      name="address"
      label="Property Address"
      placeholder="Property Address Search"
      component={Input}
      styleName="property-search"
    />
    {/* name, placeholder, labelText, formErrors, formGroupCss */}
    <button
      className="btn btn-success multi-input"
      type="submit"
      disabled={submitting}
    >
      <i className="fa fa-search" />Search
    </button>
  </div>
);

NewQuoteSearch.propTypes = {};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
