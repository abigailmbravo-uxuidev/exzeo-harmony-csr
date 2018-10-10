import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, MultiSelectTypeAhead, Button, validation } from '@exzeo/core-ui';

import { REASONS, USERS, ASSIGNEE_ANSWERS } from '../../../constants/diaries';
import DateRange from '../components/DateRange';

class DiariesSearch extends Component {
  componentDidMount() {
    const { initialValues, initialize, userProfile } = this.props;
    const answers = ASSIGNEE_ANSWERS();
    const currentUser = answers.find(a => a.answer === userProfile.userId);

    initialize({ ...initialValues, assignees: [currentUser] });
  }

  render() {
    const {
      submitting,
      changeSearchType,
      searchTypeOptions
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
  }
}

DiariesSearch.propTypes = {
  changeSearchType: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  searchTypeOptions: PropTypes.arrayOf().isRequired,
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
