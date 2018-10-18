import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, MultiSelectTypeAhead, Button, validation } from '@exzeo/core-ui';

import { REASONS } from '../../../constants/diaries';
import DateRange from '../components/DateRange';

class DiariesSearch extends Component {
  componentDidMount() {
    const { assigneeAnswers, initialValues, initialize, userProfile } = this.props;
    const currentUser = assigneeAnswers.find(a => a.answer === userProfile.userId);

    initialize({ ...initialValues, assignees: [currentUser] });
    // fetch diaries with current userId
  }

  render() {
    const {
      assigneeAnswers,
      changeSearchType,
      searchTypeOptions,
      submitting
    } = this.props;

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
              component={MultiSelectTypeAhead}
              label="Assigned To"
              answers={assigneeAnswers}
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
  }
}

DiariesSearch.propTypes = {
  assigneeAnswers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  changeSearchType: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  searchTypeOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  userProfile: PropTypes.shape().isRequired,
  initialValues: PropTypes.shape(),
  submitting: PropTypes.bool
};

DiariesSearch.defaultProps = {
  initialValues: {}
};

DiariesSearch.defaultProps = {
  submitting: false
};

export default DiariesSearch;
