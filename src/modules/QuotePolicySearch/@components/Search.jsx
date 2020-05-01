import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Common/Header';
import Footer from '../../../components/Common/Footer';
import {
  Button,
  Field,
  Form,
  Input,
  normalize,
  Select,
  Date,
  validation,
  composeValidators
} from '@exzeo/core-ui';
import {
  COMPANY_ANSWERS,
  PRODUCT_ANSWERS,
  STATE_ANSWERS
} from '../../../constants/search';

import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import {
  AgencyTypeAhead,
  POLICY_STATUS_OPTIONS,
  QUOTE_STATUS_OPTIONS
} from '@exzeo/core-ui/src/@Harmony';
import ResetButton from '../../../components/ResetButton';
import { SEARCH_CONTEXT_OPTIONS, SEARCH_CONFIG } from '../constants';
import { SEARCH_TYPES } from '../../../constants/search';
import {
  companyAnswers,
  productAnswers,
  stateAnswers
} from '../../Search/constants';
import Pagination from '../../Search/components/Pagination';
const {
  isValidNameFormat,
  isValidChar,
  isAlphaNumeric,
  isValidDateFormat,
  isRequired
} = validation;

const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);
const searchTypeOptions = [];
const QUOTE_SORT_BY_OPTIONS = [
  { answer: 'quoteNumber', label: 'Quote Number' },
  { answer: 'policyHolders.firstName', label: 'First Name' },
  { answer: 'policyHolders.lastName', label: 'Last Name' }
];

const POLICY_SORT_BY_OPTIONS = [
  { answer: 'policyNumber', label: 'Policy Number' },
  { answer: 'firstName', label: 'First Name' },
  { answer: 'lastName', label: 'Last Name' }
];

const AddressSearch = ({ handleChangeContext }) => {
  return (
    <React.Fragment>
      <div className="search">
        <div id="SearchBar">
          <Form onSubmit={x => x}>
            {({ handleSubmit, values, form, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                  <div className="search-context-sort">
                    <div className="form-group search-context">
                      <Field name="searchType" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={{ ...input, onChange: handleChangeContext }}
                            meta={meta}
                            id="searchType"
                            dataTest="searchType"
                            label="Search Context"
                            answers={SEARCH_CONTEXT_OPTIONS}
                            showPlaceholder={false}
                            errorHint
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="search-inputs fade-in">
                    <div className="search-input-row">
                      <Field name="companyCode" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="company"
                            label="Company"
                            answers={COMPANY_ANSWERS}
                            styleName="company-search"
                          />
                        )}
                      </Field>

                      <Field name="product" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="product"
                            label="Product"
                            answers={PRODUCT_ANSWERS}
                            placeholder="Select..."
                            styleName="product-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field
                        name="product"
                        validate={composeValidators([isValidChar, isRequired])}
                      >
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="address"
                            label="Property Address"
                            placeholder="Property Address Search"
                            styleName="property-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="state">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="state"
                            label="State"
                            answers={STATE_ANSWERS}
                            styleName="state-search"
                            showPlaceholder={false}
                          />
                        )}
                      </Field>
                    </div>
                    <ResetButton reset={form.reset} />
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
            )}
          </Form>
        </div>
      </div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  {/* Search Results */}

                  <div className="basic-footer">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

const PolicySearch = ({ handleChangeContext }) => {
  return (
    <React.Fragment>
      <div className="search">
        <div id="SearchBar">
          <Form onSubmit={x => x}>
            {({ handleSubmit, values, form, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                  <div className="search-context-sort">
                    <div className="form-group search-context">
                      <Field name="searchType" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={{ ...input, onChange: handleChangeContext }}
                            meta={meta}
                            id="searchType"
                            dataTest="searchType"
                            label="Search Context"
                            answers={SEARCH_CONTEXT_OPTIONS}
                            showPlaceholder={false}
                            errorHint
                          />
                        )}
                      </Field>
                    </div>
                    <div className="form-group sortBy">
                      <Field name="sortBy">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="sortBy"
                            label="Sort By"
                            answers={POLICY_SORT_BY_OPTIONS}
                            showPlaceholder={false}
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="search-inputs">
                    <div className="search-input-row margin bottom full-width">
                      <Field name="policyNumber" validate={isAlphaNumeric}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="policyNumber"
                            label="Policy Number"
                            placeholder="Policy No Search"
                            styleName="policy-no-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="firstName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="firstName"
                            label="First Name"
                            placeholder="First Name Search"
                            styleName="first-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="lastName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="lastName"
                            label="Last Name"
                            placeholder="Last Name Search"
                            styleName="last-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="address" validate={isValidChar}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="address"
                            label="Property Street Address"
                            placeholder="Property Street Address Search"
                            styleName="property-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="state">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="state"
                            label="State"
                            answers={STATE_ANSWERS}
                            showPlaceholder={false}
                            styleName="state-search"
                          />
                        )}
                      </Field>
                    </div>
                    <div className="search-input-row">
                      <Field name="companyCode">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="company"
                            label="Company"
                            answers={COMPANY_ANSWERS}
                            showPlaceholder={false}
                            styleName="company-search"
                          />
                        )}
                      </Field>

                      <Field name="product">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="product"
                            label="Product"
                            answers={PRODUCT_ANSWERS}
                            placeholder="Select..."
                            styleName="product-search"
                          />
                        )}
                      </Field>

                      <div className="form-group policy-status">
                        <Field name="policyStatus">
                          {({ input, meta }) => (
                            <Select
                              input={input}
                              meta={meta}
                              dataTest="policyStatus"
                              label="Policy Status"
                              answers={POLICY_STATUS_OPTIONS}
                            />
                          )}
                        </Field>
                      </div>
                      <div className="form-group effectiveDate">
                        <Field name="effectiveDate" validate={isValidDate}>
                          {({ input, meta }) => (
                            <Input
                              input={input}
                              meta={meta}
                              dataTest="effectiveDate"
                              label="Effective Date"
                              placeholder={STANDARD_DATE_FORMAT}
                              normalize={
                                normalize.date /* TODO this wont work */
                              }
                              errorHint
                            />
                          )}
                        </Field>
                      </div>
                      <Field name="agencyCode">
                        {({ input, meta }) => (
                          <AgencyTypeAhead
                            input={input}
                            meta={meta}
                            dataTest="agencyCode"
                            label="Agency Name"
                            styleName="agencyCode agencyCodeSelectField"
                          />
                        )}
                      </Field>
                    </div>
                    <ResetButton reset={form.reset} />
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

                  {/*{!!search.results.length && search.totalPages > 1 && (*/}
                  {/*  <Pagination*/}
                  {/*    pageUp={handlePagination(true)}*/}
                  {/*    pageDown={handlePagination(false)}*/}
                  {/*    pageNumber={search.currentPage}*/}
                  {/*    totalPages={search.totalPages}*/}
                  {/*  />*/}
                  {/*)}*/}
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  {/* Search Results */}

                  <div className="basic-footer">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

const QuoteSearch = ({ handleChangeContext }) => {
  return (
    <React.Fragment>
      <div className="search">
        <div id="SearchBar">
          <Form onSubmit={x => x}>
            {({ handleSubmit, values, form, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                  <div className="search-context-sort">
                    <div className="form-group search-context">
                      <Field name="searchType" validate={isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={{ ...input, onChange: handleChangeContext }}
                            meta={meta}
                            id="searchType"
                            dataTest="searchType"
                            label="Search Context"
                            answers={SEARCH_CONTEXT_OPTIONS}
                            showPlaceholder={false}
                            errorHint
                          />
                        )}
                      </Field>
                    </div>
                    <div className="form-group sortBy">
                      <Field name="sortBy">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="sortBy"
                            label="Sort By"
                            id="sort"
                            answers={QUOTE_SORT_BY_OPTIONS}
                            showPlaceholder={false}
                            errorHint
                          />
                        )}
                      </Field>
                    </div>
                  </div>
                  <div className="search-inputs fade-in">
                    <div className="search-input-row margin bottom full-width">
                      <Field name="quoteNumber" validate={isAlphaNumeric}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="quoteNumber"
                            label="Quote Number"
                            placeholder="Quote No Search"
                            styleName="quote-no-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="firstName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="firstName"
                            label="First Name"
                            placeholder="First Name Search"
                            styleName="first-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="lastName" validate={isValidNameFormat}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="lastName"
                            label="Last Name"
                            placeholder="Last Name Search"
                            styleName="last-name-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="address" validate={isValidChar}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            dataTest="address"
                            label="Property Street Address"
                            placeholder="Property Street Address Search"
                            styleName="property-search"
                            errorHint
                          />
                        )}
                      </Field>

                      <Field name="state">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="state"
                            label="State"
                            answers={STATE_ANSWERS}
                            showPlaceholder={false}
                            styleName="state-search"
                          />
                        )}
                      </Field>
                    </div>
                    <div className="search-input-row">
                      <Field name="companyCode">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="company"
                            label="Company"
                            answers={COMPANY_ANSWERS}
                            showPlaceholder={false}
                            styleName="company-search"
                          />
                        )}
                      </Field>

                      <Field name="product">
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            dataTest="product"
                            label="Product"
                            answers={PRODUCT_ANSWERS}
                            placeholder="Select..."
                            styleName="product-search"
                          />
                        )}
                      </Field>

                      <div className="form-group quote-state">
                        <Field name="quoteState">
                          {({ input, meta }) => (
                            <Select
                              input={input}
                              meta={meta}
                              dataTest="quoteState"
                              label="Quote Status"
                              answers={QUOTE_STATUS_OPTIONS}
                            />
                          )}
                        </Field>
                      </div>
                      <div className="form-group effectiveDate">
                        <Field name="effectiveDate" validate={isValidDate}>
                          {({ input, meta }) => (
                            <Input
                              input={input}
                              meta={meta}
                              dataTest="address"
                              label="Property Street Address"
                              placeholder="Property Street Address Search"
                              styleName="property-search"
                              errorHint
                            />
                          )}
                        </Field>

                        <Field name="effectiveDate">
                          {({ input, meta }) => (
                            <Date
                              input={input}
                              meta={meta}
                              dataTest="effectiveDate"
                              styleName="effective-date-search"
                              label="Effective Date"
                              errorHint
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <ResetButton reset={form.reset} />
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

                  {/*{!!search.results.length && search.totalPages > 1 && (*/}
                  {/*  <Pagination*/}
                  {/*    changePageForward={handlePagination(true)}*/}
                  {/*    changePageBack={handlePagination(false)}*/}
                  {/*    pageNumber={search.currentPage}*/}
                  {/*    totalPages={search.totalPages}*/}
                  {/*  />*/}
                  {/*)}*/}
                </div>
              </form>
            )}
          </Form>
        </div>
      </div>
      <main role="document">
        <div className="content-wrapper">
          <div className="dashboard" role="article">
            <div className="route">
              <div className="search route-content">
                <div className="survey-wrapper scroll">
                  {/* Search Results */}

                  <div className="basic-footer">
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

const Search = ({ handleLogout, changeSearchType }) => {
  const [searchType, setSearchType] = useState(SEARCH_TYPES.policy);
  const handleChangeContext = e => {
    setSearchType(e.target.value);
  };

  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Harmony - CSR Portal</title>
      </Helmet>
      <Header handleLogout={handleLogout} />
      {searchType === SEARCH_TYPES.policy && (
        <PolicySearch handleChangeContext={handleChangeContext} />
      )}
    </div>
  );
};

export default Search;
