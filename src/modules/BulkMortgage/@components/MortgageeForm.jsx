import React, { useState, Fragment } from 'react';
import {
  date,
  Form,
  Field,
  Currency,
  Input,
  validation,
  OnBlurListener,
  SectionLoader,
  composeValidators,
  Phone,
  SelectTypeAhead,
  Radio
} from '@exzeo/core-ui';
import TopOptionsWatcher from '@exzeo/core-ui/src/@Harmony/AdditionalInterests/@components/TopOptionsWatcher';
import { toUppercase } from '@exzeo/core-ui/src/Utilities/format';
import RadioInput from '@exzeo/core-ui/src/Input/Radio';
import { INSTRUCTION_ANSWERS } from '../constants';

const MortgageeForm = ({ handleFormSubmit }) => {
  const topMortgagees = [];

  return (
    <Form
      id="BulkMortgagee"
      onSubmit={handleFormSubmit}
      initialValues={{ instruction: 'Suppress Notice' }}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="card-block">
            <Field
              label="Top Mortgagees"
              name="mortgagee"
              dataTest="mortgage"
              component={SelectTypeAhead}
              valueKey="displayText"
              labelKey="displayText"
              optionValue="id"
              answers={topMortgagees}
              styleName="type-ahead"
              inputId="mortgagee-search"
            />

            <TopOptionsWatcher options={topMortgagees} watchField="mortgagee" />
            <Field
              name="name1"
              dataTest="name1"
              label="Name 1"
              component={Input}
              styleName="name-1"
              validate={validation.isRequired}
            />
            <Field
              name="name2"
              dataTest="name2"
              label="Name 2"
              component={Input}
              styleName="name-2"
            />
            <Field
              name="address1"
              dataTest="address1"
              label="Address 1"
              component={Input}
              styleName="address-1"
              validate={validation.isRequired}
            />
            <Field
              name="address2"
              dataTest="address2"
              label="Address 2"
              component={Input}
              styleName="address-2"
            />
            <div className="flex-form">
              <Field
                name="city"
                dataTest="city"
                label="City"
                component={Input}
                styleName="city"
                validate={validation.isRequired}
              />
              <Field
                name="state"
                dataTest="state"
                label="State"
                component={Input}
                styleName="state"
                parse={toUppercase}
                validate={composeValidators([
                  validation.isRequired,
                  validation.validateState
                ])}
              />
              <Field
                name="zip"
                dataTest="zip"
                label="Zip Code"
                component={Input}
                styleName="zip"
                validate={composeValidators([
                  validation.isRequired,
                  validation.validateZipCode
                ])}
              />
              <Field
                name="instruction"
                dataTest="instruction"
                label="Instruction"
                component={Radio}
                styleName="instruction"
                segmented
                answers={INSTRUCTION_ANSWERS}
              />
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default MortgageeForm;
