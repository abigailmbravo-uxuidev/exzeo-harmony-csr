import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select } from '@exzeo/core-ui/lib/Input';
import { isAlphaNumeric, isValidChar, isNumberDashOnly } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

import Pagination from '../components/Pagination';

const QuoteSearch = ({
  submitting,
  questions,
  handlePagination,
  search
}) => (
  <React.Fragment>
    <div className="search-inputs fade-in">
      <Field
        name="firstName"
        dataTest="firstName"
        label="First Name"
        placeholder="First Name Search"
        component={Input}
        styleName="first-name-search"
        validate={isAlphaNumeric}
        errorHint
      />
      <Field
        name="lastName"
        dataTest="lastName"
        label="Last Name"
        placeholder="Last Name Search"
        component={Input}
        styleName="last-name-search"
        validate={isAlphaNumeric}
        errorHint
      />
      <Field
        name="address"
        dataTest="address"
        label="Property Address"
        placeholder="Property Address Search"
        component={Input}
        styleName="property-search"
        validate={isValidChar}
        errorHint
      />
      <Field
        name="quoteNumber"
        dataTest="quoteNumber"
        label="Quote Number"
        placeholder="Quote No Search"
        component={Input}
        styleName="quote-no-search"
        validate={isNumberDashOnly}
        errorHint
      />
      <div className="form-group quote-state">
        <Field
          name="quoteState"
          dataTest="quoteState"
          label="Quote Status"
          component={Select}
          answers={getAnswers('quoteState', questions)}
        />
      </div>

      <button
        className="btn btn-success multi-input"
        data-test="search-quote-submit"
        type="submit"
        disabled={submitting}
      >
        <i className="fa fa-search" />Search
      </button>
    </div>
    {!!search.results.length && search.totalPages > 1 &&
      <Pagination
        changePageForward={handlePagination(true)}
        changePageBack={handlePagination(false)}
        pageNumber={search.currentPage}
        totalPages={search.totalPages}
      />
    }
  </React.Fragment>
);

QuoteSearch.propTypes = {
  submitting: PropTypes.bool,
  questions: PropTypes.array,
  handlePagination: PropTypes.func,
  search: PropTypes.objectOf({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  })
};

QuoteSearch.defaultProps = {
  questions: [],
  search: {}
};

export default QuoteSearch;
