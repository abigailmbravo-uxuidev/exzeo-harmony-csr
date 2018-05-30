import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import {Field} from 'redux-form';
import {Input, Select, SelectTypeAhead } from '@exzeo/core-ui/lib/Input';
import { normalizeDate, isRequired } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from "../../../utilities/forms";

const sortByOptions = [
  { answer: 'policyNumber', label: 'Policy Number' },
  { answer: 'firstName', label: 'First Name' },
  { answer: 'lastName', label: 'Last Name' }
];

const NewQuoteSearch = ({
  agencyListValues,
  disabled,
  effectiveDateFormErrors,
  advancedSearch,
  questions,
  toggleAdvancedSearch
}) => {
  return (
    <React.Fragment>
      <div className="search-inputs fade-in p">
        <Field
          name='firstName'
          label='First Name'
          placeholder='First Name Search'
          component={Input}
          styleName='first-name-search'
        />
        <Field
          name='lastName'
          label='Last Name'
          placeholder='Last Name Search'
          component={Input}
          styleName='last-name-search'
        />
        <Field
          name='address'
          label='Property Address'
          placeholder='Property Address Search'
          component={Input}
          styleName='property-search'
        />
        <Field
          name='policyNumber'
          label='Policy Number'
          placeholder='Policy No Search'
          component={Input}
          styleName='policy-no-search'
        />
        <button
          id="searchPolicySubmit"
          className="btn btn-success multi-input"
          type="submit"
          disabled={disabled}
        >
          <i className="fa fa-search"/>Search
        </button>
        <button
          type="button"
          className="advanced-search-btn btn-sm btn-icon"
          onClick={toggleAdvancedSearch}>
          <i className={classNames(advancedSearch ? 'fa fa-chevron-up' : 'fa fa-chevron-down')}/>
        </button>
      </div>

      {advancedSearch &&
        <div className="advanced-search fade-in">
          <Field
            name="agencyCode"
            label="Agency Name"
            component={SelectTypeAhead}
            styleName='agencyCodeSelectField'
            labelKey="label"
            answers={agencyListValues}
          />
          <div className="form-group effectiveDate">
            <Field
              name="effectiveDate"
              label='Effective Date'
              component={Input}
              hint={effectiveDateFormErrors}
              errorHint
              placeholder="MM/DD/YYYY"
              normalize={normalizeDate}
            />
          </div>
          <div className="form-group policy-status">
            <Field
              name="policyStatus"
              label="Policy Status"
              component={Select}
              answers={getAnswers('policyStatus', questions)}
            />
          </div>
          <Field
            name="sortBy"
            label="Sort By"
            component={Select}
            validate={isRequired}
            answers={sortByOptions}
          />
        </div>
      }

    </React.Fragment>
  );
};

NewQuoteSearch.propTypes = {};

NewQuoteSearch.defaultProps = {};

export default NewQuoteSearch;
