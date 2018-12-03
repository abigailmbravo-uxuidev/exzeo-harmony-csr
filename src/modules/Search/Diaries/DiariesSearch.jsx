import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, MultiSelectTypeAhead, DateRange, Button, validation, emptyObject, emptyArray } from '@exzeo/core-ui';

import { REASONS, STATUS_ANSWERS } from '../../../constants/diaries';

class DiariesSearch extends Component {
  
  /*
    TODO: redux-form initialize has a bug. We need to check back with this.
    For now we won't initialize a value for the current user.
    Link: https://github.com/erikras/redux-form/issues/2818
    
    componentDidMount() {
    const {
      assigneeAnswers,
      initialValues,
      initialize,
      userProfile
    } = this.props;
    const currentUser = assigneeAnswers.find(a => a.answer === userProfile.userId);

    initialize({ ...initialValues, assignees: currentUser ? [currentUser] : [] });
  }*/

  render() {
    const {
      assigneeAnswers,
      submitting
    } = this.props;

    return (
      <React.Fragment>
        <div className="search-inputs fade-in">
          <div className="input-wrapper">
            <div className="form-group search-context">
              <Field
                name="open"
                dataTest="status"
                label="Diary Status"
                component={Select}
                id="status"
                validate={validation.isRequired}
                answers={STATUS_ANSWERS}
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
  initialize: PropTypes.func.isRequired,
  userProfile: PropTypes.shape().isRequired,
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