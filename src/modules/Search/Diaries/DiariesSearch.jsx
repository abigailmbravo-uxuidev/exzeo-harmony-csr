import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MultiSelectTypeAhead,
  DateRange,
  Button,
  validation,
  emptyObject,
  emptyArray,
  Field
} from '@exzeo/core-ui';

import ResetButton from '../components/ResetButton';
import { STATUS_ANSWERS } from '../../../constants/diaries';
import { productAnswers } from '../constants';
import { isValidRange } from './utilities';
import { useFetchDiaryOptions, useFetchAssigneeAnswers } from '../hooks';
import { SEARCH_TYPES } from '../../../constants/search';

export const DiariesSearch = ({
  submitting,
  reset,
  results,
  userProfile,
  initialValues,
  handleSubmit
}) => {
  const { diaryReasons } = useFetchDiaryOptions();
  const { assigneeAnswers } = useFetchAssigneeAnswers(userProfile);

  console.log('diaryReasons', diaryReasons);
  console.log('assigneeAnswers', assigneeAnswers);

  useEffect(() => {
    if (
      Array.isArray(assigneeAnswers) &&
      Array.isArray(diaryReasons) &&
      diaryReasons.length &&
      assigneeAnswers.length
    ) {
      handleSubmit(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diaryReasons, assigneeAnswers]);

  return (
    <React.Fragment>
      <div className="search-inputs fade-in diary">
        <div className="input-wrapper">
          <div className="search-input-row margin bottom full-width">
            <div className="form-group search-context diary">
              <Field
                name="open"
                dataTest="status"
                label="Diary Status"
                styleName="open"
                component={Select}
                id="status"
                validate={validation.isRequired}
                answers={STATUS_ANSWERS}
                showPlaceholder={false}
                errorHint
              />
            </div>
            <div className="form-group reason">
              <Field
                name="reason"
                dataTest="reason"
                component={Select}
                answers={diaryReasons}
                placeholder="Please choose"
                label="Reason"
                errorHint
              />
            </div>
            <div className="form-group dateRange">
              <Field
                name="dateRange"
                dataTest="date-range"
                styleName="dateRange"
                minDateProp="min"
                maxDateProp="max"
                component={DateRange}
                validate={isValidRange}
                label="Date Range"
                errorHint
                errorPosition="left"
              />
            </div>
          </div>
          <div className="search-input-row">
            <div className="form-group assignees">
              <Field
                name="assignees"
                dataTest="assignees"
                styleName="assignees"
                component={MultiSelectTypeAhead}
                label="Assigned To"
                answers={assigneeAnswers}
                errorHint
              />
            </div>
            <div className="fomr-group product">
              <Field
                name="product"
                dataTest="product"
                label="Product"
                component={Select}
                answers={productAnswers}
                placeholder="Select..."
                styleName="product-search"
              />
            </div>
          </div>
          <span className="count-results">
            <strong>{results.length}</strong>RESULTS
          </span>
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
      </div>
    </React.Fragment>
  );
};

DiariesSearch.propTypes = {
  initialize: PropTypes.func.isRequired,
  assigneeAnswers: PropTypes.arrayOf(PropTypes.shape()),
  initialValues: PropTypes.shape(),
  submitting: PropTypes.bool
};

DiariesSearch.defaultProps = {
  assigneeAnswers: emptyArray,
  initialValues: emptyObject,
  submitting: false
};

export default DiariesSearch;
