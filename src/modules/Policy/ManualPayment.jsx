import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Date,
  Input,
  Currency,
  Select,
  Loader,
  SectionLoader,
  Form,
  Field,
  OnChangeListener,
  date,
  validation,
  composeValidators
} from '@exzeo/core-ui';

import { postPayment } from './data';
import { useFetchPaymentOptions } from './hooks';

function inputBatch(batchNumber, cashDate) {
  if (!cashDate) return '';
  const suffix = batchNumber.length > 8 ? batchNumber.slice(-2) : '';
  const newBatch = date.formatDate(String(cashDate), 'YYYYMMDD');

  return `${newBatch}${suffix}`;
}

const amountValidation = validation.isRange(-1000000, 1000000);
const cashDateValidation = validation.isDateRange('1900-01-01', '9999-12-31');
const batchNumberValidation = validation.isDateMatchMin10(
  'cashDate',
  'YYYYMMDD'
);

function ManualPayment({ initialValues: policy, getPolicy, errorHandler }) {
  const [loading, setLoading] = useState(false);
  const [descriptionAnswers, setDescriptionAnswers] = useState([]);
  const {
    paymentOptions: { cashTypes, cashDescriptions },
    loaded
  } = useFetchPaymentOptions();

  const handlePayment = async (values, form) => {
    setLoading(true);
    const payment = {
      date: date.formatToUTC(values.cashDate, policy.property.timezone),
      batch: String(values.batchNumber),
      amount: Number(String(values.amount).replace(/[^\d.-]/g, '')),
      type: String(values.cashType),
      description: String(values.cashDescription),
      policyNumber: policy.policyNumber,
      policyTerm: policy.policyTerm,
      policyAccountCode: policy.policyAccountCode,
      companyCode: policy.companyCode,
      state: policy.state,
      product: policy.product
    };

    try {
      await postPayment(payment);
      await getPolicy(policy.policyNumber);
      setTimeout(form.reset);
    } catch (error) {
      return errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    batchNumber: date.currentDay('YYYYMMDD'),
    cashDate: date.toUTC().format('YYYY-MM-DD')
  };

  if (!loaded) return <SectionLoader />;

  return (
    <section className="add-payment">
      {loading && <Loader />}
      <h3 className="title">Add Payment</h3>
      <Form
        initialValues={initialValues}
        onSubmit={handlePayment}
        subscription={{ submitting: true, pristine: true, values: true }}
      >
        {({ handleSubmit, submitting, pristine, form }) => (
          <div className="fade-in">
            <div className="flex-row">
              <Field
                name="cashDate"
                validate={composeValidators([
                  validation.isRequired,
                  cashDateValidation
                ])}
              >
                {({ input, meta }) => (
                  <Date
                    input={input}
                    meta={meta}
                    label="Cash Date"
                    styleName="input"
                    dataTest="cashDate"
                  />
                )}
              </Field>
              <Field name="batchNumber" validate={batchNumberValidation}>
                {({ input, meta }) => (
                  <Fragment>
                    <Input
                      input={input}
                      meta={meta}
                      label="Batch Number"
                      styleName="input"
                      dataTest="batchNumber"
                    />
                    <OnChangeListener name="cashDate">
                      {value => {
                        const newBatch = inputBatch(input.value, value);
                        input.onChange(newBatch);
                      }}
                    </OnChangeListener>
                  </Fragment>
                )}
              </Field>
            </div>
            <div className="flex-row">
              <Field name="cashType" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    label="Cash Type"
                    styleName="select"
                    answers={cashTypes}
                    dataTest="cashType"
                  />
                )}
              </Field>
              <Field name="cashDescription" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <Fragment>
                    <Select
                      input={input}
                      meta={meta}
                      label="Description"
                      styleName="select"
                      answers={descriptionAnswers}
                      dataTest="cashDescription"
                    />
                    <OnChangeListener name="cashType">
                      {value => {
                        setDescriptionAnswers(cashDescriptions[value]);
                        input.onChange('');
                        form.resetFieldState('cashType');
                      }}
                    </OnChangeListener>
                  </Fragment>
                )}
              </Field>
              <Field
                name="amount"
                validate={composeValidators([
                  validation.isRequired,
                  amountValidation
                ])}
              >
                {({ input, meta }) => (
                  <Currency
                    input={input}
                    meta={meta}
                    label="Amount"
                    styleName="currency"
                    dataTest="amount"
                    noDecimal={false}
                    min={-1000000}
                    max={1000000}
                  />
                )}
              </Field>
            </div>
            <div className="btn-footer">
              <button
                className="btn btn-secondary"
                type="button"
                form="addPayment"
                onClick={() => form.reset()}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
                onKeyPress={e => e.charCode === 13 && handleSubmit(e)}
                disabled={pristine || submitting}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Form>
    </section>
  );
}

ManualPayment.propTypes = {
  initialValues: PropTypes.object.isRequired,
  getPolicy: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default ManualPayment;
