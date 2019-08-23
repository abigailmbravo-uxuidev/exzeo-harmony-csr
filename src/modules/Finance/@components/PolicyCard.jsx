import React from 'react';
import PropTypes from 'prop-types';
import { Field, Input, validation } from '@exzeo/core-ui';

const PolicyCard = ({ policy }) => {
  const {
    effectiveDate,
    policyHolders: { firstName, lastName },
    policyHolderMailingAddress: { address1, city, state, zip },
    summaryLedger
  } = policy;

  return (
    <div className="results">
      <div className="policy-card card">
        <div className="icon-name card-header">
          <i className="icon fa fa-file-text" />
          <h5>HO3</h5>
        </div>
        <div className="card-block">
          <div className="policy-details">
            <div>
              <strong>{policy.company}</strong> | {policy.policyNumber}
              <a className="btn btn-link btn-xs" href="#" target="_blank">
                <i className="fa fa-external-link-square" />
                Open Policy
              </a>
            </div>
            <div className="effective-date">
              <label>Effective Date:</label> {policy.effectiveDate}
            </div>
            <div className="balance-due">
              <label>Balance Due:</label> {summaryLedger.balance.$numberDecimal}
            </div>
          </div>
          <div className="policyholder">
            <strong>
              JOHN DOEMMDIBUFBWEIFUBUWEFBUHWFBUWEFVUWVBU{firstName} {lastName}
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
              <label>Billing Status:</label> {summaryLedger.status.displayText}
            </div>
          </div>
        </div>
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
  );
};

export default PolicyCard;
