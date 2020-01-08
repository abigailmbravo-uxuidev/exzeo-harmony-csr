import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  Select,
  MultiSelectTypeAhead,
  DateRange,
  Button,
  validation,
  emptyObject,
  emptyArray
} from '@exzeo/core-ui';

import ResetButton from '../components/ResetButton';
import { STATUS_ANSWERS } from '../../../constants/diaries';
import { productAnswers } from '../constants';

class DiariesSearch extends Component {
  render() {
    const {
      assigneeAnswers,
      submitting,
      diaryReasons,
      reset,
      results
    } = this.props;

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
                  component={DateRange}
                  label="Date Range"
                  errorHint
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
  }
}

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
