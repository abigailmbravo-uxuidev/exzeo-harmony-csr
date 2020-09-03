import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  Button,
  Field,
  validation,
  Form,
  FormSpy,
  normalize,
  Loader
} from '@exzeo/core-ui';
import { useQuoteSearch, Pagination } from '@exzeo/core-ui/src/@Harmony';

import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import {
  SEARCH_CONFIG,
  SEARCH_TYPE_OPTIONS,
  SEARCH_TYPES
} from '../../../constants/search';

import { useFetchQuoteState } from '../hooks';
import { cspConfigForSearch } from '../utilities';
import ResetButton from '../@components/ResetButton';
import SearchTypeWatcher from '../@components/SearchTypeWatcher';
import NoResults from '../@components/NoResults';
import QuoteCard from '../@components/QuoteCard';
import SearchResultsWrapper from '../@components/SearchResultsWrapper';

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

const QuoteSearch = ({ changeSearchType, userProfile, history }) => {
  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap,
    productOptions
  } = cspConfigForSearch(userProfile, 'QuoteData:Quotes:*', 'READ');

  const { quoteStateList } = useFetchQuoteState();

  const {
    state: searchState,
    handleSearchSubmit,
    clearSearchState
  } = useQuoteSearch();

  const handlePagination = values => page => {
    handleSearchSubmit({ ...values, page });
  };

  const handleSelectQuote = async quote => {
    window.open(`/quote/${quote.quoteNumber}/coverage`, '_blank');
  };

  const resetFormResults = form => {
    clearSearchState();
    form.reset();
  };

  return (
    <Form
      initialValues={SEARCH_CONFIG[SEARCH_TYPES.quote].initialValues}
      subscription={{ submitting: true, values: true }}
      onSubmit={handleSearchSubmit}
    >
      {({
        form,
        submitting,
        handleSubmit,
        values: { state, effectiveDate }
      }) => (
        <>
          {searchState.status === 'pending' && <Loader />}
          <div className="search">
            <div id="SearchBar">
              <SearchTypeWatcher history={history} />
              <form id="SearchBarForm" onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
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
                        answers={SEARCH_TYPE_OPTIONS}
                        showPlaceholder={false}
                        errorHint
                      />
                    </div>
                    <div className="form-group sortBy">
                      <Field
                        name="sort"
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
                        name="propertyAddress"
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
                        showPlaceholder={true}
                        placeholder={'All'}
                        placeholderDisabled={false}
                        styleName="company-search"
                      />
                      <Field
                        name="product"
                        dataTest="product"
                        label="Product"
                        component={Select}
                        answers={productOptionMap[state] || productOptions}
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
                          parse={value => normalize.date(value, effectiveDate)}
                          validate={isValidDate}
                          errorHint
                        />
                      </div>
                    </div>
                    <ResetButton reset={() => resetFormResults(form)} />
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
                  {searchState.results.length > 0 &&
                    searchState.totalPages > 1 && (
                      <FormSpy subscription={{ values: true }}>
                        {({ values }) => (
                          <Pagination
                            pageUp={() =>
                              handlePagination(values)(
                                searchState.currentPage + 1
                              )
                            }
                            pageDown={() =>
                              handlePagination(values)(
                                searchState.currentPage - 1
                              )
                            }
                            pageNumber={searchState.currentPage}
                            totalPages={searchState.totalPages}
                          />
                        )}
                      </FormSpy>
                    )}
                </div>
              </form>
            </div>
          </div>
          <SearchResultsWrapper>
            {['resolved', 'rejected'].includes(searchState.status) &&
            searchState.totalRecords === 0 ? (
              <NoResults
                searchType={SEARCH_TYPES.newQuote}
                error={searchState.error}
              />
            ) : (
              <ul className="quote-list">
                {searchState.results.map(quote => (
                  <QuoteCard
                    key={quote._id}
                    quote={quote}
                    handleClick={() => handleSelectQuote(quote)}
                  />
                ))}
              </ul>
            )}
          </SearchResultsWrapper>
        </>
      )}
    </Form>
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
