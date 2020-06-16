import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Select,
  Field,
  Button,
  normalize,
  validation,
  noop,
  emptyObject,
  emptyArray
} from '@exzeo/core-ui';

import { AgencyTypeAhead, Pagination } from '@exzeo/core-ui/src/@Harmony';

import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import ResetButton from '../components/ResetButton';
import { useFetchPolicyStatus } from '../hooks';
import { cspConfigForSearch } from '../utilities';

const {
  isValidNameFormat,
  isValidChar,
  isAlphaNumeric,
  isValidDateFormat,
  isRequired
} = validation;

const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);

const sortByOptions = [
  { answer: 'policyNumber', label: 'Policy Number' },
  { answer: 'firstName', label: 'First Name' },
  { answer: 'lastName', label: 'Last Name' }
];

const PolicySearch = ({
  submitting,
  handlePagination,
  searchResults,
  searchTypeOptions,
  resetFormResults,
  userProfile,
  formValues
}) => {
  const { statusList } = useFetchPolicyStatus();

  const {
    companyCodeOptions,
    stateOptions,
    productOptionMap
  } = cspConfigForSearch(userProfile, 'PolicyData:Transactions:*');

  return (
    <React.Fragment>
      <div className="search-context-sort">
        <div className="form-group search-context">
          <Field name="searchType" validate={isRequired}>
            {({ input, meta }) => (
              <Select
                input={{ ...input }}
                meta={meta}
                id="searchType"
                dataTest="searchType"
                label="Search Context"
                answers={searchTypeOptions}
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
                answers={sortByOptions}
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
                answers={stateOptions}
                showPlaceholder={true}
                placeholder={'All'}
                placeholderDisabled={false}
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
                answers={companyCodeOptions}
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
                answers={productOptionMap[formValues.state] || emptyArray}
                showPlaceholder={true}
                placeholder={'All'}
                placeholderDisabled={false}
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
                  answers={statusList}
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
                  normalize={normalize.date /* TODO this wont work */}
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

      {!!searchResults.results.length && searchResults.totalPages > 1 && (
        <Pagination
          pageUp={() => handlePagination(true)}
          pageDown={() => handlePagination(false)}
          pageNumber={searchResults.currentPage}
          totalPages={searchResults.totalPages}
        />
      )}
    </React.Fragment>
  );
};

PolicySearch.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  changeSearchType: PropTypes.func,
  questions: PropTypes.object,
  searchResults: PropTypes.shape({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  }).isRequired,
  searchTypeOptions: PropTypes.array,
  submitting: PropTypes.bool
};

PolicySearch.defaultProps = {
  questions: emptyObject,
  changeSearchType: noop
};

export default PolicySearch;
