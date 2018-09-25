import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, NewSelectTypeAhead, Button, validation } from '@exzeo/core-ui';

import { REASONS, USERS } from '../../../constants/diaries';
import DateRange from '../components/DateRange';

const DiariesSearch = ({
  submitting,
  changeSearchType,
  searchTypeOptions
}) => {
  return (
    <React.Fragment>
      <div className="search-inputs fade-in">
        <div className="input-wrapper">
          <div className="form-group search-context">
            <Field
              name="status"
              dataTest="status"
              label="Diary Status"
              component={Select}
              id="status"
              validate={validation.isRequired}
              onChange={changeSearchType}
              answers={searchTypeOptions}
              showPlaceholder={false}
              errorHint />
          </div>
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
          <Field
            name="assignees"
            dataTest="assignees"
            component={NewSelectTypeAhead}
            isMulti
            label="Assigned To"
            answers={USERS}
            errorHint />
        </div>

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
