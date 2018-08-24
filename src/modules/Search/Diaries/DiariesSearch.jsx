import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, SelectTypeAhead } from '@exzeo/core-ui/lib/Input';
import { isRequired } from '@exzeo/core-ui/lib/InputLifecycle';
import Button from '@exzeo/core-ui/lib/Button';

import { REASONS, USERS } from '../../../constants/diaries';

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
          name="assignee"
          dataTest="assignee"
          component={SelectTypeAhead}
          label="Assigned To"
          answers={USERS} />
        <Field
          name="reason"
          dataTest="reason"
          component={Select}
          answers={REASONS}
          placeholder="Please choose"
          label="Reason" />

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

export default DiariesSearch;
