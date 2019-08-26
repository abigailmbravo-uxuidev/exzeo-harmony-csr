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

const BulkPayments = ({ errorHandler }) => {
  const [batchResults, setBatchResults] = useState([]);
  const [active, setActive] = useState(false);
  const [batch, setBatch] = useState({ valid: false, values: {} });
  const { cashTypes } = useFetchPaymentOptions();

  const initialValues = {
    batchNumber: date.currentDay('YYYYMMDD'),
    cashDate: date.toUTC().format('YYYY-MM-DD'),
    cashTypes
  };

  const handleActivity = () => setActive(true);

  return (
    <div className="content-wrapper finance">
      <div className="scroll view-grid">
        <Form
          initialValues={initialValues}
          onSubmit={handleActivity}
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
          <PolicyCard
            active={active}
            batch={batch}
            batchResults={batchResults}
            setBatchResults={setBatchResults}
            errorHandler={errorHandler}
          />
        </section>
        <section className="section-payment-list">
          <div className="form-group">
            <label>Cash Date</label>
            <span>{batch.values.cashDate}</span>
          </div>
          <div className="form-group">
            <label>Batch Number</label>
            <span>{batch.values.batchNumber}</span>
          </div>
          <div className="form-group">
            <label>Cash Type</label>
            <span>{batch.values.cashType}</span>
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
            {batchResults.map(result => (
              <div className="table-row" key={result.policyNumber}>
                <span className="policy-number">{result.policyNumber}</span>
                <span className="policyholder">{result.policyHolder}</span>
                <span className="amount">{result.amount}</span>
              </div>
            ))}
            <div className="table-footer">
              <span className="footer-label">[X] entires totaling</span>
              <span className="amount">$2.00</span>
            </div>
          </div>
          <div className="btn-wrapper download">
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => setActive(false)}
              disabled={!active}
            >
              Download
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BulkPayments;
