import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, Input, OnBlurListener, validation } from '@exzeo/core-ui';

import { getPolicy } from '../data';

const PolicyCard = ({ active, batch: { valid, values } }) => {
  const [policy, setPolicy] = useState({});
  const {
    effectiveDate,
    policyHolders: { firstName, lastName } = {},
    policyHolderMailingAddress: { address1, city, state, zip } = {},
    summaryLedger: { balance = {}, status: billingStatus = {} } = {}
  } = policy;

  const hasPolicy = policy && Object.entries(policy).length > 0;
  const handlePolicySearch = async policyNumber => {
    const search = await getPolicy(policyNumber);
    setPolicy(search);
  };
  return (
    <Form
      initialValues={{}}
      onSubmit={handlePolicySearch}
      subscription={{ values: true }}
    >
      {({ reset }) => (
        <form id="payment-form">
          <div className="fade-in view-grid">
            <Field
              name="policyNumber"
              onBlur={props => console.log('proppa: ', props)}
            >
              {({ input, meta }) => (
                <Fragment>
                  <Input
                    input={input}
                    meta={meta}
                    label="Policy Number"
                    styleName="input view-col-4"
                    dataTest="policyNumber"
                    disabled={!active}
                  />
                  <OnBlurListener name="policyNumber">
                    {() => handlePolicySearch(input.value)}
                  </OnBlurListener>
                </Fragment>
              )}
            </Field>
            <div className="results">
              <div className="policy-card card">
                {hasPolicy && (
                  <Fragment>
                    <div className="icon-name card-header">
                      <i className="icon fa fa-file-text" />
                      <h5>HO3</h5>
                    </div>
                    <div className="card-block">
                      <div className="policy-details">
                        <div>
                          <strong>{policy.company}</strong> |{' '}
                          {policy.policyNumber}
                          <a
                            className="btn btn-link btn-xs"
                            href="#"
                            target="_blank"
                          >
                            <i className="fa fa-external-link-square" />
                            Open Policy
                          </a>
                        </div>
                        <div className="effective-date">
                          <label>Effective Date:</label> {policy.effectiveDate}
                        </div>
                        <div className="balance-due">
                          <label>Balance Due:</label> {balance.$numberDecimal}
                        </div>
                      </div>
                      <div className="policyholder">
                        <strong>
                          {firstName} {lastName}
                        </strong>{' '}
                        | {address1},{' '}
                        <span>
                          {city}, {state} {zip}
                        </span>
                      </div>
                      <div className="policy-status">
                        <div>
                          <label>Policy Status:</label> {policy.status}
                        </div>
                        <div>
                          <label>Billing Status:</label>{' '}
                          {billingStatus.displayText}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
                <div className="card-footer">
                  <Field name="amount" validate={validation.isRequired}>
                    {({ input, meta }) => (
                      <Input
                        input={input}
                        meta={meta}
                        label="Amount"
                        styleName="input"
                        dataTest="amount"
                        disabled={!active}
                      />
                    )}
                  </Field>
                  <button className="btn btn-primary" type="button" form="">
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Form>
  );
};

export default PolicyCard;
