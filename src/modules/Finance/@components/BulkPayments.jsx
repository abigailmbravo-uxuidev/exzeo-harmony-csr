import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Loader,
  Field,
  Date,
  Input,
  Currency,
  Select,
  FormSpy,
  OnChangeListener,
  date,
  validation
} from '@exzeo/core-ui';

import PolicyCard from './PolicyCard';
import { useFetchPaymentOptions } from '../hooks';

function inputBatch(batchNumber, cashDate) {
  const suffix = batchNumber.length > 8 ? batchNumber.substring(8) : '';
  const newBatch = date.formatDate(String(cashDate), 'YYYYMMDD');

  return `${newBatch}${suffix}`;
}

const BulkPayments = () => {
  const [active, setActive] = useState(false);
  const [batch, setBatch] = useState({});
  const { cashTypes } = useFetchPaymentOptions();

  const initialValues = {
    batchNumber: date.currentDay('YYYYMMDD'),
    cashDate: date.toUTC().format('YYYY-MM-DD'),
    cashTypes
  };

  const handleActivity = () => {
    console.log('activity');
    setActive(true);
  };

  const handlePayment = async values => {
    console.log('submit');
    const payment = {};
  };

  return (
    <div className="content-wrapper finance">
      <div className="scroll view-grid">
        <Form
          initialValues={initialValues}
          onSubmit={handlePayment}
          subscription={{ submitting: true, pristine: true, values: true }}
        >
          {({ reset }) => (
            <form id="batch-form">
              <div className="fade-in view-grid">
                <h3 className="title">Bulk Payments</h3>
                <section className="section-payment">
                  <FormSpy
                    subscription={{ valid: true, values: true }}
                    onChange={props => setBatch(props)}
                  />
                  <Field name="cashDate" validate={validation.isRequired}>
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
                  <div className="btn-wrapper view-col-2">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setActive(true)}
                      disabled={!batch.valid || active}
                    >
                      Start
                    </button>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setActive(false)}
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
          <PolicyCard active={active} batch={batch} />
        </section>
        <section className="section-payment-list">
          <div className="form-group">
            <label>Cash Date</label>
            <span>12/12/2020</span>
          </div>
          <div className="form-group">
            <label>Batch Number</label>
            <span>20201212-01</span>
          </div>
          <div className="form-group">
            <label>Cash Type</label>
            <span>Paper Deposit</span>
          </div>
          <div className="form-group">
            <label>Payment Description</label>
            <span>Payment Received</span>
          </div>
          <div className="payment-table">
            <div className="table-header">
              <span className="policy-number">Polcy Number</span>
              <span className="policyholder">Policyholder</span>
              <span className="amount">Amount</span>
            </div>
            <div className="table-row">
              <span className="policy-number">12-00000001-01</span>
              <span className="policyholder">Lane Myer</span>
              <span className="amount">$2.00</span>
            </div>
            <div className="table-footer">
              <span className="footer-label">[X] entires totaling</span>
              <span className="amount">$2.00</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BulkPayments;
