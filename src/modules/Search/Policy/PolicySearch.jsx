import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  Input,
  Select,
  Button,
  normalize,
  validation,
  noop,
  emptyObject,
  emptyArray
} from '@exzeo/core-ui';

import { AgencyTypeAhead } from '@exzeo/core-ui/src/@Harmony';

import { getAnswers } from '../../../utilities/forms';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import Pagination from '../components/Pagination';
import ResetButton from '../components/ResetButton';
import { companyAnswers, stateAnswers, productAnswers } from '../constants';

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
  questions,
  handlePagination,
  search,
  changeSearchType,
  searchTypeOptions,
  reset
}) => {
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
            showPlaceholder={false}
          />
        </div>
      </div>
      <div className="search-inputs">
        <div className="search-input-row margin bottom full-width">
          <Field
            name="policyNumber"
            dataTest="policyNumber"
            label="Policy Number"
            placeholder="Policy No Search"
            component={Input}
            styleName="policy-no-search"
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
          <div className="form-group policy-status">
            <Field
              name="policyStatus"
              dataTest="policyStatus"
              label="Policy Status"
              component={Select}
              answers={getAnswers('policyStatus', questions)}
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
          <Field
            name="agencyCode"
            dataTest="agencyCode"
            label="Agency Name"
            component={AgencyTypeAhead}
            styleName="agencyCode agencyCodeSelectField"
          />
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
};

PolicySearch.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  agencyList: PropTypes.array,
  changeSearchType: PropTypes.func,
  questions: PropTypes.object,
  search: PropTypes.shape({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  }).isRequired,
  searchTypeOptions: PropTypes.array,
  submitting: PropTypes.bool
};

PolicySearch.defaultProps = {
  agencyList: emptyArray,
  questions: emptyObject,
  changeSearchType: noop
};

export default PolicySearch;
