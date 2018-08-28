import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, SelectTypeAhead } from '@exzeo/core-ui/lib/Input';
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';
import Button from '@exzeo/core-ui/lib/Button';

import { REASONS, USERS } from '../../../constants/diaries';
import DateRange from '../components/DateRange';

const DiariesSearch = ({
  submitting,
  changeSearchType,
  searchTypeOptions
}) => {
  return (
    <React.Fragment>
      <div className="form-group search-context">
        <Field
          name="open"
          dataTest="open"
          label="Diary Status"
          component={Select}
          id="status"
          validate={isRequired}
          onChange={changeSearchType}
          answers={searchTypeOptions}
          showPlaceholder={false}
          errorHint />
      </div>
      <div className="search-inputs fade-in">
        <Field
          name="assignees"
          dataTest="assignees"
          component={SelectTypeAhead}
          label="Assigned To"
          answers={USERS}
          errorHint />
        <Field
          name="reason"
          dataTest="reason"
          component={Select}
          answers={REASONS}
          placeholder="Please choose"
          label="Reason"
          errorHint />
        <Field
          name="dateRange"
          dataTest="date-range"
          component={DateRange}
          label="Date Range"
          errorHint />

        <Button
          baseClass="success"
          customClass="multi-input"
          type="submit"
          disabled={submitting}
          dataTest="submit"><i className="fa fa-search" />Search
        </Button>
      </div>
    </React.Fragment>
  );
};

DiariesSearch.propTypes = {
  changeSearchType: PropTypes.func.isRequired,
  searchTypeOptions: PropTypes.array.isRequired,
  submitting: PropTypes.bool
};

DiariesSearch.defaultProps = {
  submitting: false
};

export default DiariesSearch;
