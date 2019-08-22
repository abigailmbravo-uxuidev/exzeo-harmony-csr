import React from 'react';
import PropTypes from 'prop-types';

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
        <div className="icon-name">
          <i className="card-icon fa fa-file-text" />
        </div>
        <div className="policy-details">
          <div>
            {policy.company} | {policy.policyNumber}
            <a href="#" target="_blank">
              Open Policy
            </a>
          </div>
          <div>
            <span>Effective Date:</span> {policy.effectiveDate}
          </div>
          <div>
            <span>Balance Due:</span> {summaryLedger.balance.$numberDecimal}
          </div>
        </div>
        <div className="policyholder">
          {firstName} {lastName}| {address1} {city}, {state} {zip}
        </div>
        <div className="policy-status">
          <div>
            <span>Policy Status:</span> {policy.status}
          </div>
          <div>
            <span>Billing Status:</span> {summaryLedger.status.displayText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
