import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  date,
  Form,
  Field,
  Currency,
  Input,
  OnBlurListener,
  validation,
  Loader
} from '@exzeo/core-ui';

import { getPolicy, postPayment } from '../data';

const PaymentForm = ({
  active,
  batch,
  batchResults,
  setBatchResults,
  errorHandler
}) => {
  const [policy, setPolicy] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const {
    effectiveDate,
    policyHolders: { firstName, lastName } = {},
    policyHolderMailingAddress: { address1, city, state, zip } = {},
    summaryLedger: { balance = {}, status: billingStatus = {} } = {}
  } = policy;

  const hasPolicy = policy && Object.entries(policy).length > 0;

  const handlePolicySearch = async policyNumber => {
    setLoading(true);
    try {
      const search = await getPolicy(policyNumber);
      setPolicy(search);
      setErrorMessage();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async ({ amount, policyNumber }) => {
    const {
      values: { cashDate, batchNumber, cashType }
    } = batch;
    const {
      policyTerm,
      property = {},
      policyAccountCode,
      companyCode,
      state,
      product
    } = policy;

    setLoading(true);
    const payment = {
      date: date.formatToUTC(cashDate, property.timezone),
      batch: String(batchNumber),
      amount: Number(String(amount).replace(/[^\d.-]/g, '')),
      type: String(cashType),
      description: 'Payment Received',
      policyNumber: policyNumber,
      policyTerm: policyTerm,
      policyAccountCode: policyAccountCode,
      companyCode: companyCode,
      state: state,
      product: product
    };

    try {
      await postPayment(payment);
      const { policyHolders } = policy;
      const batchDetails = {
        policyNumber,

        amount,
        policyHolder: `${policyHolders[0].firstName} ${policyHolders[0].lastName}`
      };
      setBatchResults([...batchResults, batchDetails]);
    } catch (error) {
      return errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {loading && <Loader />}
      <Form
        onSubmit={handlePayment}
        subscription={{ submitting: true, pristine: true, values: true }}
      >
        {({ handleSubmit, form: { reset } }) => (
          <form id="payment-form">
            <div className="fade-in view-grid">
              <Field name="policyNumber" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <Fragment>
                    <Input
                      input={input}
                      meta={meta}
                      label="Policy Number"
                      styleName="input view-col-4"
                      placeholder="Enter Complete Policy Number"
                      dataTest="policyNumber"
                      disabled={!active}
                    />
                    <OnBlurListener name="policyNumber">
                      {() => handlePolicySearch(input.value)}
                    </OnBlurListener>
                    <button
                      className="btn btn-link clear-policy"
                      disabled={!active}
                      tabindex="-1"
                      type="button"
                      onClick={() => {
                        reset();
                        setPolicy({});
                      }}
                    >
                      <i className="fa fa-times" />
                    </button>
                  </Fragment>
                )}
              </Field>

              <div className="results">
                <div
                  className={`policy-card card ${billingStatus.displayText}`}
                >
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}
                  {hasPolicy && (
                    <Fragment>
                      <div className="icon-name card-header">
                        <i className="icon fa fa-file-text" />
                        <h5>{policy.product}</h5>
                      </div>
                      <div className="card-block">
                        <div className="policy-details">
                          <div>
                            <strong>{policy.companyCode}</strong>&nbsp;|&nbsp;
                            {policy.policyNumber}
                            <a
                              className="btn btn-link btn-xs"
                              href={`/policy/${policy.policyNumber}/coverage`}
                              target="_blank"
                            >
                              <i className="fa fa-external-link-square" />
                              Open Policy
                            </a>
                          </div>

                          <div className="balance-due">
                            <label>Balance Due:</label>&nbsp;
                            {balance.$numberDecimal}
                          </div>
                        </div>
                        <div className="policyholder">
                          <strong>
                            {policy.policyHolders[0].firstName}&nbsp;
                            {policy.policyHolders[0].lastName}
                          </strong>
                          &nbsp; |&nbsp;{address1},&nbsp;
                          <span>
                            {city},&nbsp;{state}&nbsp;{zip}
                          </span>
                        </div>
                        <div className="status">
                          <div className="effective-date">
                            <label>Effective Date:</label>&nbsp;
                            {date.formattedDate(
                              policy.effectiveDate,
                              'MM/DD/YYYY'
                            )}
                          </div>
                          <div className="policy-status">
                            <label>Policy Status:</label>&nbsp;
                            {policy.status}
                          </div>
                          <div className="billing-status">
                            <label>Billing Status:</label>&nbsp;
                            {billingStatus.displayText}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                  <div className="card-footer">
                    <Field name="amount" validate={validation.isRequired}>
                      {({ input, meta }) => (
                        <Currency
                          input={input}
                          meta={meta}
                          label="Amount"
                          noDecimal={false}
                          styleName="input"
                          dataTest="amount"
                          disabled={!active}
                        />
                      )}
                    </Field>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={handleSubmit}
                      form="payment-form"
                    >
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </Fragment>
  );
};

export default PaymentForm;
