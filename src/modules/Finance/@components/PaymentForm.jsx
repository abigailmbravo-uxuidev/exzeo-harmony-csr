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
  SectionLoader
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
    effectiveDate = '',
    policyHolders: { firstName, lastName } = {},
    policyHolderMailingAddress: { address1, city, state, zip } = {},
    summaryLedger: { balance = {}, status: billingStatus = {} } = {}
  } = policy;

  const hasPolicy = policy && Object.entries(policy).length > 0;

  const normalizePolicyNumber = policyNumber => {
    const bits = policyNumber.split('-');
    const len = bits.length;

    if (len > 3) return policyNumber;

    if (len > 2) {
      return bits[0].toLowerCase() === 'ttic' && bits[1].toLowerCase() === 'af3'
        ? `${policyNumber}-1`
        : bits[0].toLowerCase() === 'af3'
        ? `TTIC-${policyNumber}`
        : policyNumber;
    }

    if (len === 2) {
      const firstBit = bits[0].length;

      if (bits[0].toLowerCase() === 'af3') return `TTIC-${policyNumber}-1`;
      return firstBit === 6
        ? `TTIC-AF3-${bits[0]}-${bits[1]}`
        : firstBit === 7
        ? `12-${bits[0]}-${bits[1]}`
        : `${bits[0]}-${bits[1]}-01`;
    }

    if (len === 1) {
      if (['af3', 'ttic'].includes(bits[0].toLowerCase())) return policyNumber;
      return bits[0].length === 6
        ? `TTIC-AF3-${policyNumber}-1`
        : `12-${policyNumber}-01`;
    }

    return policyNumber;
  };

  const handlePolicySearch = async (policyNum, reset) => {
    if (!policyNum) return false;
    const policyNumber = normalizePolicyNumber(policyNum);
    setLoading(true);
    try {
      const search = await getPolicy(policyNumber);
      setPolicy(search);
      setErrorMessage();
    } catch (error) {
      reset();
      setPolicy({});
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async ({ amount }) => {
    const {
      values: { cashDate, batchNumber, cashType }
    } = batch;
    const {
      policyNumber,
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
        id: `${policyNumber}-${batchResults.length}`,
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
      <Form
        onSubmit={handlePayment}
        subscription={{ values: true, errors: true, invalid: true }}
      >
        {({ handleSubmit, form, errors }) => (
          <form
            id="payment-form"
            onSubmit={async event => {
              await handleSubmit(event);
              if (errors.amount && !errors.policyNumber) {
                return form.blur('policyNumber');
              }
              form.reset();
              setPolicy({});
            }}
          >
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
                      {() => {
                        handlePolicySearch(input.value, form.reset);
                      }}
                    </OnBlurListener>
                  </Fragment>
                )}
              </Field>
              <button
                className="btn btn-link clear-policy"
                disabled={!active}
                tabIndex="-1"
                type="button"
                onClick={() => {
                  form.reset();
                  setPolicy({});
                }}
              >
                <i className="fa fa-times" />
              </button>
              <div className="results">
                <div
                  className={`policy-card card ${billingStatus.displayText}`}
                >
                  {loading && <SectionLoader />}
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
                              tabIndex="-1"
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
                          &nbsp;|&nbsp;{address1},&nbsp;
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

PaymentForm.propTypes = {
  active: PropTypes.bool.isRequired,
  batch: PropTypes.object.isRequired,
  batchResults: PropTypes.array.isRequired,
  setBatchResults: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default PaymentForm;
