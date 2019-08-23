import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Field, Input, validation } from '@exzeo/core-ui';

const PolicyCard = ({ policy }) => {
  const {
    effectiveDate,
    policyHolders: { firstName, lastName } = {},
    policyHolderMailingAddress: { address1, city, state, zip } = {},
    summaryLedger: { balance = {}, status: billingStatus = {} } = {}
  } = policy;

  console.logFragment;
  return (
    <Form
      initialValues={{}}
      onSubmit={() => {}}
      subscription={{ submitting: true, pristine: true, values: true }}
    >
      {({ reset }) => (
        <form id="batch-form">
          <div className="fade-in view-grid">
            <div className="results">
              <div className="policy-card card">
                {policy && Object.entries(policy).length > 0 && (
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
                          JOHN DOEMMDIBUFBWEIFUBUWEFBUHWFBUWEFVUWVBU{firstName}{' '}
                          {lastName}
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
