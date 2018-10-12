import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, validation } from '@exzeo/core-ui';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({ submitting }) => (
  <div className="search-inputs fade-in">
    <Field
      name="address"
      dataTest="address"
      label="Property Address"
      placeholder="Property Address Search"
      component={Input}
      styleName="property-search"
      validate={[isValidChar, isRequired]}
      errorHint
    />

    <Button
      baseClass="success"
      customClass="multi-input"
      type="submit"
      disabled={submitting}
      dataTest="submit"
    ><i className="fa fa-search" />Search
    </Button>
  </div>
);

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool
};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
