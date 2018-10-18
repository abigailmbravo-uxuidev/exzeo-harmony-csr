import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { Input, Select, NewSelectTypeAhead, Button, normalize, validation } from '@exzeo/core-ui';

import { getAnswers } from '../../../utilities/forms';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';
import Pagination from '../components/Pagination';

const { isAlphaNumeric, isValidChar, isNumberDashOnly, isValidDateFormat, isRequired } = validation;
const isValidDate = isValidDateFormat(STANDARD_DATE_FORMAT);

const sortByOptions = [
  { answer: 'policyNumber', label: 'Policy Number' },
  { answer: 'firstName', label: 'First Name' },
  { answer: 'lastName', label: 'Last Name' }
];

const PolicySearch = ({
  agencyList,
  submitting,
  advancedSearch,
  questions,
  toggleAdvancedSearch,
  handlePagination,
  search,
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
        errorHint />
    </div>
    <div className="search-inputs  p">
      <Field
        name="firstName"
        dataTest="firstName"
        label="First Name"
        placeholder="First Name Search"
        component={Input}
        styleName="first-name-search"
        validate={isAlphaNumeric}
        errorHint />
      <Field
        name="lastName"
        dataTest="lastName"
        label="Last Name"
        placeholder="Last Name Search"
        component={Input}
        styleName="last-name-search"
        validate={isAlphaNumeric}
        errorHint />
      <Field
        name="address"
        dataTest="address"
        label="Property Street Address"
        placeholder="Property Street Address Search"
        component={Input}
        styleName="property-search"
        validate={isValidChar}
        errorHint />
      <Field
        name="policyNumber"
        dataTest="policyNumber"
        label="Policy Number"
        placeholder="Policy No Search"
        component={Input}
        styleName="policy-no-search"
        validate={isNumberDashOnly}
        errorHint />
      <Button
        baseClass="success"
        customClass="multi-input"
        type="submit"
        disabled={submitting}
        dataTest="submit"><i className="fa fa-search" />Search
      </Button>
      <Button
        baseClass="icon"
        customClass="advanced-search-btn"
        size="small"
        dataTest="policy-advanced-search"
        onClick={toggleAdvancedSearch}>
        <i className={classNames(advancedSearch ? 'fa fa-chevron-up' : 'fa fa-chevron-down')} />
      </Button>
    </div>

    {advancedSearch &&
      <div className="advanced-search">
        <Field
          name="agencyCode"
          dataTest="agencyCode"
          label="Agency Name"
          component={NewSelectTypeAhead}
          styleName="agencyCodeSelectField"
          answers={agencyList} />
        <div className="form-group effectiveDate">
          <Field
            name="effectiveDate"
            dataTest="effectiveDate"
            label="Effective Date"
            component={Input}
            placeholder={STANDARD_DATE_FORMAT}
            normalize={normalize.date}
            validate={isValidDate}
            errorHint />
        </div>
        <div className="form-group policy-status">
          <Field
            name="policyStatus"
            dataTest="policyStatus"
            label="Policy Status"
            component={Select}
            answers={getAnswers('policyStatus', questions)} />
        </div>
        <Field
          name="sortBy"
          dataTest="sortBy"
          label="Sort By"
          component={Select}
          answers={sortByOptions}
          showPlaceholder={false} />
      </div>
    }
    {!!search.results.length && search.totalPages > 1 &&
      <Pagination
        changePageForward={handlePagination(true)}
        changePageBack={handlePagination(false)}
        pageNumber={search.currentPage}
        totalPages={search.totalPages} />
    }
  </React.Fragment>
);

PolicySearch.propTypes = {
  agencyList: PropTypes.array,
  submitting: PropTypes.bool,
  advancedSearch: PropTypes.bool.isRequired,
  questions: PropTypes.object,
  toggleAdvancedSearch: PropTypes.func.isRequired,
  handlePagination: PropTypes.func.isRequired,
  search: PropTypes.shape({
    results: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number
  }).isRequired,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

PolicySearch.defaultProps = {
  agencyList: [],
  questions: {}
};

export default PolicySearch;
