import React from 'react';
import {
  Button,
  DateRange,
  Field,
  Form,
  Input,
  MultiSelectTypeAhead,
  noop
} from '@exzeo/core-ui';
import { isValidRange } from '../utilities';

const JobFilter = ({ userList, handleJobSubmit }) => {
  return (
    <Form
      id="FilterJobs"
      initialValues={{
        jobNumber: '',
        completedBy: '',
        dateRange: {
          start: '',
          end: ''
        },
        mortgageeName: ''
      }}
      onSubmit={handleJobSubmit}
      subscription={{ submitting: true, values: true }}
    >
      {({ handleSubmit, values, pristine }) => (
        <form
          id="SearchByPolicy"
          className="filter-jobs-form search-inputs"
          onSubmit={handleSubmit}
        >
          <Field
            name="jobNumber"
            dataTest="jobNumber"
            label="Job Number"
            placeholder="Job Number"
            component={Input}
            styleName="search-input"
          />
          <Field
            name="completedBy"
            dataTest="completedBy"
            label="Completed By"
            placeholder="User Name"
            component={MultiSelectTypeAhead}
            styleName="completedBy"
            answers={userList}
          />
          <Field
            name="dateRange"
            dataTest="date-range"
            styleName="dateRange"
            minDateProp="start"
            maxDateProp="end"
            component={DateRange}
            validate={isValidRange}
            label="Date Range"
            errorHint
            errorPosition="left"
          />
          <Field
            name="mortgageeName"
            dataTest="mortgageeName"
            label="Mortgagee Name"
            placeholder="Mortgagee Name"
            component={Input}
            styleName="search-input"
          />
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            dataTest="filter-job-submit"
            disabled={pristine}
          >
            Filter
          </Button>
        </form>
      )}
    </Form>
  );
};

export default JobFilter;
