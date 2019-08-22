import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Loader,
  Field,
  Date,
  Input,
  Currency,
  Select,
  date,
  validation
} from '@exzeo/core-ui';

import PolicyCard from './PolicyCard';

const BulkPayments = () => {
  const initialValues = {
    batchNumber: date.currentDay('YYYYMMDD'),
    cashDate: date.toUTC().format('YYYY-MM-DD')
  };

  const handleActivity = () => {};

  const handlePayment = async values => {
    const payment = {};
  };

  const cashTypes = [];
  const policy = {
    policyNumber: '12-1019322-01',
    company: 'TTIC',
    effectiveDate: '2019-09-01T05:00:00.000Z',
    status: 'Policy Issued',
    property: {
      physicalAddress: {}
    },
    policyHolderMailingAddress: {
      _id: '5d5ec15c796944001291ba01',
      careOf: '',
      address1: '2609 TEST ADDRESS',
      city: 'PENSACOLA',
      state: 'FL',
      zip: '00014',
      country: {
        _id: '5d5ec147f397660012f78bc8',
        code: 'USA',
        displayText: 'United States of America'
      }
    },
    policyHolders: [
      {
        electronicDelivery: false,
        _id: '5d5ebfd1f397660012f78856',
        order: 0,
        entityType: 'Person',
        firstName: 'Batman',
        lastName: 'Robin CSR001',
        primaryPhoneNumber: '7271231234',
        emailAddress: 'exzeoqa2@exzeo.com'
      }
    ],
    summaryLedger: {
      status: { displayText: 'Payment Invoice Issued' },
      balance: { $numberDecimal: '893.00' }
    }
  };

  return (
    <div className="content-wrapper finance">
      <div className="scroll">
        <Form
          initialValues={initialValues}
          onSubmit={handlePayment}
          subscription={{ submitting: true, pristine: true, values: true }}
        >
          {({ handleSubmit, reset, submitting, pristine }) => (
            <div className="fade-in view-grid">
              <h3 className="title">Bulk Payments</h3>
              <section className="section-payment">
                <Field name="cashDate" validate={validation.isRequired}>
                  {({ input, meta }) => (
                    <Date
                      input={input}
                      meta={meta}
                      label="Cash Date"
                      styleName="input view-col-2"
                      dataTest="cashDate"
                    />
                  )}
                </Field>
                <Field
                  name="batchNumber"
                  validate={validation.isDateMatchMin10('cashDate', 'YYYYMMDD')}
                >
                  {({ input, meta }) => (
                    <Input
                      input={input}
                      meta={meta}
                      label="Batch Number"
                      styleName="input view-col-3"
                      dataTest="batchNumber"
                    />
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
                    />
                  )}
                </Field>
                <div className="btn-wrapper view-col-2">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    form="addPayment"
                    onClick={handleActivity}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleActivity}
                    disabled={pristine || submitting}
                  >
                    Stop
                  </button>
                </div>
              </section>
              <section className="section-policy">
                <div className="policy-input">
                  <Field name="policyNumber" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Fragment>
                        <Input
                          input={input}
                          meta={meta}
                          label="Policy Number"
                          styleName="input"
                          dataTest="policyNumber"
                        />
                      </Fragment>
                    )}
                  </Field>
                </div>
                <PolicyCard policy={policy} />
                <Field name="amount" validate={validation.isRequired}>
                  {({ input, meta }) => (
                    <Input
                      input={input}
                      meta={meta}
                      label="Amount"
                      styleName="input"
                      dataTest="amount"
                    />
                  )}
                </Field>
              </section>
              <section className="section-current-values">
                <div>
                  <div>
                    <span>Cash Date</span> <span>Batch Number</span>Cash Type
                    <span>Payment Description</span>
                  </div>
                  <div>
                    <span>12/12/2020</span> <span>20201212-01</span>Paper
                    Deposit
                    <span>Payment Received</span>
                  </div>
                </div>
              </section>
              <section className="section-payment-list">
                <div>
                  <div>
                    <span>Polcy Number</span> <span>Policyholder</span>
                    <span>Amount</span>
                  </div>
                  <div>
                    <span>12-00000001-01</span> <span>Lane Myer</span>
                    <span>$2.00</span>
                  </div>
                </div>
              </section>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default BulkPayments;
