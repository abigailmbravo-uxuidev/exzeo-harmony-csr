import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select, Button, validation, normalize } from '@exzeo/core-ui';

import { getAnswers } from '../../../utilities/forms';
import Pagination from '../components/Pagination';
import ResetButton from '../components/ResetButton';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import { companyAnswers, stateAnswers, productAnswers } from '../constants';

const {
  isValidNameFormat,
  isValidChar,
  isRequired,
  isValidDateFormat,
  isNumberDashOnly
} = validation;

const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);

const sortByOptions = [
  { answer: 'quoteNumber', label: 'Quote Number' },
  { answer: 'policyHolders.firstName', label: 'First Name' },
  { answer: 'policyHolders.lastName', label: 'Last Name' }
];

const QuoteSearch = ({
  submitting,
  questions,
  handlePagination,
  search,
  changeSearchType,
  searchTypeOptions,
  reset
}) => (
  <React.Fragment>
    <div className="search-context-sort">
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
      <div className="form-group sortBy">
        <Field
          name="sortBy"
          dataTest="sortBy"
          label="Sort By"
          component={Select}
          answers={sortByOptions}
          id="sort"
          showPlaceholder={false}
          errorHint
        />
      </div>
    </div>
    <div className="search-inputs fade-in">
      <div className="search-input-row margin bottom full-width">
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
          name="state"
          dataTest="state"
          label="State"
          component={Select}
          answers={stateAnswers}
          showPlaceholder={false}
          styleName="state-search"
        />
      </div>
      <div className="search-input-row">
        <Field
          name="companyCode"
          dataTest="company"
          label="Company"
          component={Select}
          answers={companyAnswers}
          showPlaceholder={false}
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
        <div className="form-group quote-state">
          <Field
            name="quoteState"
            dataTest="quoteState"
            label="Quote Status"
            component={Select}
            answers={getAnswers('quoteState', questions)}
          />
        </div>
        <div className="form-group effectiveDate">
          <Field
            name="effectiveDate"
            dataTest="effectiveDate"
            label="Effective Date"
            component={Input}
            placeholder={STANDARD_DATE_FORMAT}
            normalize={normalize.date}
            validate={isValidDate}
            errorHint
          />
        </div>
      </div>
      <ResetButton reset={reset} />
      <Button
        className={Button.constants.classNames.success}
        customClass="multi-input"
        type="submit"
        disabled={submitting}
        data-test="submit"
      >
        <i className="fa fa-search" />
        Search
      </Button>
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
