import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({
  submitting,
  changeSearchType,
  searchTypeOptions
}) => (
  <React.Fragment>
    <div className="form-group search-context">
      <Field
        name="searchType"
        dataTest="searchType"
        label="Search Context"
        component={Select}
        id="searchType"
        validate={isRequired}
        onChange={changeSearchType}
        answers={searchTypeOptions}
        showPlaceholder={false}
        errorHint
      />
    </div>

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
        className={Button.constants.classNames.success}
        customClass="multi-input"
        type="submit"
        disabled={submitting}
        dataTest="submit"
      >
        <i className="fa fa-search" />
        Search
      </Button>
    </div>
  </React.Fragment>
);

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool.isRequired,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
