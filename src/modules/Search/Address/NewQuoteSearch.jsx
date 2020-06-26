import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Button,
  Select,
  validation,
  Field,
  composeValidators,
  Form,
  noop
} from '@exzeo/core-ui';
import ResetButton from '../components/ResetButton';

import { cspConfigForSearch } from '../utilities';
import AddressTip from '../components/AddressTip';
import { useAddressSearch } from '@exzeo/core-ui/src/@Harmony/Search';
import Loader from '@exzeo/core-ui/src/Loader/Loader';
import AddressCard from '../components/AddressCard';
import {
  SEARCH_CONFIG,
  SEARCH_TYPE_OPTIONS,
  SEARCH_TYPES
} from '../../../constants/search';
import NoResults from '../components/NoResults';
import SearchTypeWatcher from '../components/SearchTypeWatcher';
import { productAnswers } from '../constants';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({
  submitting,
  changeSearchType,
  searchTypeOptions,
  userProfile,
  history
}) => {
  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap
  } = cspConfigForSearch(userProfile, 'QuoteData:Quotes:*');

  const {
    searchState,
    loading,
    handleSearchSubmit,
    clearSearchState
  } = useAddressSearch();

  const resetFormResults = form => {
    clearSearchState();
    form.reset();
  };

  return (
    <Form
      initialValues={SEARCH_CONFIG[SEARCH_TYPES.newQuote].initialValues}
      subscription={{ submitting: true, values: true }}
      onSubmit={handleSearchSubmit}
    >
      {({ form, handleSubmit, values: { companyCode, state, product } }) => (
        <>
          {loading && <Loader />}
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
                        answers={SEARCH_TYPE_OPTIONS}
                        showPlaceholder={false}
                        errorHint
                      />
                    </div>
                  </div>
                  <div className="search-inputs fade-in">
                    <div className="search-input-row">
                      <Field
                        name="companyCode"
                        dataTest="company"
                        label="Company"
                        component={Select}
                        validate={isRequired}
                        answers={companyCodeOptions}
                        styleName="company-search"
                        errorHint
                      />

                      <Field
                        name="product"
                        dataTest="product"
                        label="Product"
                        component={Select}
                        answers={productOptionMap[state] || productAnswers}
                        placeholder="Select..."
                        styleName="product-search"
                        validate={isRequired}
                        errorHint
                      />

                      <Field
                        name="address"
                        dataTest="address"
                        label="Property Address"
                        placeholder="Property Address Search"
                        component={Input}
                        styleName="property-search"
                        validate={composeValidators([isValidChar, isRequired])}
                        errorHint
                      />

                      <Field
                        name="state"
                        dataTest="state"
                        label="State"
                        component={Select}
                        answers={stateOptions}
                        showPlaceholder={false}
                        styleName="state-search"
                      />
                    </div>
                    <ResetButton reset={() => resetFormResults(form)} />
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
                </div>
              </form>
            </div>
          </div>
          <main role="document">
            <div className="content-wrapper">
              <div className="dashboard" role="article">
                <div className="route">
                  <div className="search route-content">
                    <div className="survey-wrapper scroll">
                      <div className="results-wrapper">
                        <div className="quote-list">
                          {searchState.hasSearched &&
                            (searchState.noResults ? (
                              <NoResults
                                searchType={SEARCH_TYPES.newQuote}
                                error={noop}
                              />
                            ) : (
                              searchState.results.map(address => (
                                <AddressCard
                                  key={address.id}
                                  address={address}
                                  companyCode={companyCode}
                                  state={state}
                                  product={product}
                                />
                              ))
                            ))}
                          {searchState.hasSearched && <AddressTip />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </Form>
  );
};

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool.isRequired,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
