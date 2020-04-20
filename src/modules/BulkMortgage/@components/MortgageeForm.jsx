import React from 'react';
import {
  Button,
  Form,
  Field,
  Input,
  validation,
  composeValidators,
  SelectTypeAhead,
  Radio
} from '@exzeo/core-ui';
import { toUppercase } from '@exzeo/core-ui/src/Utilities/format';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import TopOptionsWatcher from '@exzeo/core-ui/src/@Harmony/AdditionalInterests/@components/TopOptionsWatcher';

import { INSTRUCTION_ANSWERS } from '../constants';
import { useFetchTopMortgagees } from '../hooks';

const MortgageeForm = ({ handleFormSubmit, errorHandler }) => {
  const { topMortgagees } = useFetchTopMortgagees(errorHandler);

  return (
    <Form
      onSubmit={handleFormSubmit}
      initialValues={{ instruction: 'Suppress Notice' }}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting, form }) => (
        <form
          id="BulkMortgagee"
          className="bulk-mortgagee-form"
          onSubmit={handleSubmit}
        >
          <Button
            dataTest="refresh"
            className={BUTTON_CLASS.link}
            type="button"
            onClick={form.reset}
          >
            <i className="fa fa-refresh" />
            Clear &amp; Reset Form
          </Button>
          <TopOptionsWatcher options={topMortgagees} watchField="mortgagee" />
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
            name="mailingAddress.address1"
            dataTest="address1"
            label="Address 1"
            component={Input}
            styleName="address-1"
            validate={validation.isRequired}
          />
          <Field
            name="mailingAddress.address2"
            dataTest="address2"
            label="Address 2"
            component={Input}
            styleName="address-2"
          />
          <div className="flex-form">
            <Field
              name="mailingAddress.city"
              dataTest="city"
              label="City"
              component={Input}
              styleName="city"
              validate={validation.isRequired}
            />
            <Field
              name="mailingAddress.state"
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
              name="mailingAddress.zip"
              dataTest="zip"
              label="Zip"
              component={Input}
              styleName="zip"
              validate={composeValidators([
                validation.isRequired,
                validation.validateZipCode
              ])}
            />
          </div>
          <Field
            name="instruction"
            dataTest="instruction"
            label="Instruction"
            component={Radio}
            styleName="instruction"
            segmented
            answers={INSTRUCTION_ANSWERS}
          />
        </form>
      )}
    />
  );
};

export default MortgageeForm;
