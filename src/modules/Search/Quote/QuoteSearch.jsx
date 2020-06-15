import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  Button,
  Field,
  validation,
  normalize,
  emptyArray
} from '@exzeo/core-ui';

import Pagination from '../components/Pagination';
import ResetButton from '../components/ResetButton';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import { cspConfigForSearch } from '../utilities';
import { useFetchQuoteState } from '../hooks';

const {
  isValidNameFormat,
  isValidChar,
  isRequired,
  isValidDateFormat,
  isAlphaNumeric
} = validation;

const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);

const sortByOptions = [
  { answer: 'quoteNumber', label: 'Quote Number' },
  { answer: 'policyHolders.firstName', label: 'First Name' },
  { answer: 'policyHolders.lastName', label: 'Last Name' }
];

const QuoteSearch = ({
  submitting,
  handlePagination,
  searchResults,
  changeSearchType,
  searchTypeOptions,
  resetFormResults,
  userProfile,
  formValues
}) => {
  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap
  } = cspConfigForSearch(userProfile, 'QuoteData:Quotes:*');

  //TODO: useFetchQuoteState
  const { quoteStateList } = useFetchQuoteState();

  return (
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
            validate={isAlphaNumeric}
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
            answers={stateOptions}
            showPlaceholder={true}
            placeholder={'All'}
            placeholderDisabled={false}
            styleName="state-search"
          />
        </div>
        <div className="search-input-row">
          <Field
            name="companyCode"
            dataTest="company"
            label="Company"
            component={Select}
            answers={companyCodeOptions}
            showPlaceholder={false}
            styleName="company-search"
          />
          <Field
            name="product"
            dataTest="product"
            label="Product"
            component={Select}
            answers={productOptionMap[formValues.state] || emptyArray}
            styleName="product-search"
            showPlaceholder={true}
            placeholder={'All'}
            placeholderDisabled={false}
          />
          <div className="form-group quote-state">
            <Field
              name="quoteState"
              dataTest="quoteState"
              label="Quote Status"
              component={Select}
              answers={quoteStateList}
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
        <ResetButton reset={resetFormResults} />
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
      {!!searchResults.length && searchResults.totalPages > 1 && (
        <Pagination
          changePageForward={() => handlePagination(true)}
          changePageBack={() => handlePagination(false)}
          pageNumber={searchResults.currentPage}
          totalPages={searchResults.totalPages}
        />
      )}
    </React.Fragment>
  );
};

QuoteSearch.propTypes = {
  submitting: PropTypes.bool,
  handlePagination: PropTypes.func,
  searchResults: PropTypes.shape({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  }),
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

QuoteSearch.defaultProps = {
  searchResults: {}
};

export default QuoteSearch;
