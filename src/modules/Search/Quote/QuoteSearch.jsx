import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select, Button, validation } from '@exzeo/core-ui';

import { getAnswers } from '../../../utilities/forms';
import Pagination from '../components/Pagination';
import ResetButton from '../components/ResetButton';
import { companyAnswers, stateAnswers, productAnswers } from '../constants';

const {
  isValidNameFormat,
  isValidChar,
  isRequired,
  isNumberDashOnly
} = validation;

const QuoteSearch = ({
  beta,
  submitting,
  questions,
  handlePagination,
  search,
  changeSearchType,
  searchTypeOptions,
  reset
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
        name="firstName"
        dataTest="firstName"
        label="First Name"
        placeholder="First Name Search"
        component={Input}
        styleName="first-name-search"
        validate={isValidNameFormat}
        errorHint
      />
      <Field
        name="lastName"
        dataTest="lastName"
        label="Last Name"
        placeholder="Last Name Search"
        component={Input}
        styleName="last-name-search"
        validate={isValidNameFormat}
        errorHint
      />
      <Field
        name="address"
        dataTest="address"
        label="Property Street Address"
        placeholder="Property Street Address Search"
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
      <Field
        name="state"
        dataTest="state"
        label="State"
        component={Select}
        answers={stateAnswers}
        placeholder="Select..."
        styleName="state-search"
      />
      <Field
        name="companyCode"
        dataTest="company"
        label="Company"
        component={Select}
        answers={companyAnswers}
        placeholder="Select..."
        styleName="company-search"
      />
      <Field
        name="product"
        dataTest="product"
        label="Product"
        component={Select}
        answers={productAnswers}
        placeholder="Select..."
        styleName="product-search"
      />
      )
      <ResetButton reset={reset} />
    </div>
    {!!search.results.length && search.totalPages > 1 && (
      <Pagination
        changePageForward={handlePagination(true)}
        changePageBack={handlePagination(false)}
        pageNumber={search.currentPage}
        totalPages={search.totalPages}
      />
    )}
  </React.Fragment>
);

QuoteSearch.propTypes = {
  submitting: PropTypes.bool,
  questions: PropTypes.object,
  handlePagination: PropTypes.func,
  search: PropTypes.shape({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  }),
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

QuoteSearch.defaultProps = {
  questions: {},
  search: {}
};

export default QuoteSearch;
