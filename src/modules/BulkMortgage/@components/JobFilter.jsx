import React from 'react';
import {
  Button,
  Field,
  Form,
  Input,
  MultiSelectTypeAhead,
  noop
} from '@exzeo/core-ui';

const JobFilter = ({ userList }) => {
  return (
    <Form
      id="FilterJobs"
      initialValues={{
        jobNumber: '',
        completedBy: '',
        windowStart: '',
        windowEnd: '',
        mortgageeName: ''
      }}
      onSubmit={noop}
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
