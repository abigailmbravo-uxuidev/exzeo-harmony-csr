import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Field,
  Date,
  Input,
  Select,
  FormSpy,
  OnChangeListener,
  date,
  composeValidators,
  validation
} from '@exzeo/core-ui';

import PaymentForm from './PaymentForm';
import PaymentList from './PaymentList';
import { useFetchPaymentOptions } from '../hooks';

const inputBatch = (batchNumber, cashDate) => {
  if (!cashDate) return '';
  const suffix = batchNumber.length > 8 ? batchNumber.substring(8) : '';
  const newBatch = date.formatDate(String(cashDate), 'YYYYMMDD');

  return `${newBatch}${suffix}`;
};

const BulkPayments = ({ errorHandler }) => {
  const [batchResults, setBatchResults] = useState([]);
  const [active, setActive] = useState(false);
  const [batch, setBatch] = useState({ valid: false, values: {} });
  const { cashTypes } = useFetchPaymentOptions(errorHandler);

  const paymentDescriptions = [
    { answer: 'Payment Received', label: 'Payment Received' },
    { answer: 'Payment Transfer', label: 'Payment Transfer' }
  ];

  const initialValues = {
    batchNumber: date.currentDay('YYYYMMDD'),
    cashDate: date.toUTC().format('YYYY-MM-DD'),
    description: paymentDescriptions[0].answer,
    cashTypes
  };

  return (
    <div className="content-wrapper finance">
      <div className="scroll view-grid">
        <Form
          initialValues={initialValues}
          onSubmit={() => setActive(true)}
          subscription={{ submitting: true, pristine: true, values: true }}
        >
          {({ form: { reset } }) => (
            <form id="batch-form">
              <div className="fade-in view-grid">
                <h3 className="title">Bulk Payments</h3>
                <section className="section-payment">
                  <FormSpy
                    subscription={{ valid: true, values: true }}
                    onChange={props => setBatch(props)}
                  />
                  <Field
                    name="cashDate"
                    validate={composeValidators([
                      validation.isRequired,
                      validation.isDateRange('1900-01-01', '9999-12-31')
                    ])}
                  >
                    {({ input, meta }) => (
                      <Date
                        input={input}
                        meta={meta}
                        label="Cash Date"
                        styleName="input view-col-2"
                        dataTest="cashDate"
                        disabled={active}
                      />
                    )}
                  </Field>
                  <Field
                    name="batchNumber"
                    validate={validation.isDateMatchMin10(
                      'cashDate',
                      'YYYYMMDD'
                    )}
                  >
                    {({ input, meta }) => (
                      <Fragment>
                        <Input
                          input={input}
                          meta={meta}
                          label="Batch Number"
                          styleName="input view-col-3"
                          dataTest="batchNumber"
                          disabled={active}
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
                  <Field name="cashType" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Select
                        input={input}
                        meta={meta}
                        label="Cash Type"
                        styleName="select view-col-2"
                        answers={cashTypes}
                        dataTest="cashType"
                        disabled={active}
                      />
                    )}
                  </Field>
                  <Field name="description" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Select
                        input={input}
                        meta={meta}
                        label="Payment Description"
                        styleName="select view-col-2"
                        answers={paymentDescriptions}
                        dataTest="paymentDescription"
                        disabled={active}
                      />
                    )}
                  </Field>
                  <div className="btn-wrapper view-col-2">
                    <button
                      data-test="startButton"
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setActive(true)}
                      disabled={!batch.valid || active}
                    >
                      Start
                    </button>
                    <button
                      data-test="stopButton"
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        setActive(false);
                        setBatchResults([]);
                        reset();
                      }}
                      disabled={!active}
                    >
                      Stop
                    </button>
                  </div>
                </section>
              </div>
            </form>
          )}
        </Form>
        <section className="section-policy">
          <PaymentForm
            active={active}
            batch={batch}
            batchResults={batchResults}
            setBatchResults={setBatchResults}
            errorHandler={errorHandler}
          />
        </section>
        <PaymentList batch={batch} batchResults={batchResults} />
      </div>
    </div>
  );
};

BulkPayments.propTypes = {
  errorHandler: PropTypes.func.isRequired
};

export default BulkPayments;
