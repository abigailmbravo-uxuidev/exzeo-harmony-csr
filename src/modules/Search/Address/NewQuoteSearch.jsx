import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input } from '@exzeo/core-ui/lib/Input';
import { isValidChar, isRequired } from '@exzeo/core-ui/lib/InputLifecycle';

const NewQuoteSearch = ({ submitting }) => (
  <div className="search-inputs fade-in">
    <Field
      name="address"
      dataTest="address"
      label="Property Address"
      placeholder="Property Address Search"
      component={Input}
      styleName="property-search"
      validate={isRequired}
      errorHint
    />

    <button
      className="btn btn-success multi-input"
      data-test="search-new-quote-submit"
      type="submit"
      disabled={submitting}
    >
      <i className="fa fa-search" />Search
    </button>
  </div>
);

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool
};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
