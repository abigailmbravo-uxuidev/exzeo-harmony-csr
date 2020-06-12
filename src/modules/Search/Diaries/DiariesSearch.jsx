import React, { useEffect } from 'react';
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

export const DiariesSearch = ({
  submitting,
  resetFormResults,
  searchResults,
  userProfile,
  initialValues,
  handleSubmit
}) => {
  const { tags, reasons } = useFetchDiaryOptions();
  const { assigneeAnswers } = useFetchAssigneeAnswers(userProfile);

  // submit search when answers and options are loaded
  useEffect(() => {
    if (
      Array.isArray(assigneeAnswers) &&
      assigneeAnswers.length &&
      reasons.length &&
      tags.length
    ) {
      handleSubmit(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, reasons, assigneeAnswers]);

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
                answers={reasons}
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
                answers={[...tags, ...assigneeAnswers]}
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
            <strong>{searchResults.totalRecords}</strong>RESULTS
          </span>
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
      </div>
    </React.Fragment>
  );
};

DiariesSearch.defaultProps = {
  assigneeAnswers: emptyArray,
  initialValues: emptyObject,
  submitting: false,
  searchResults: emptyObject
};

export default DiariesSearch;
