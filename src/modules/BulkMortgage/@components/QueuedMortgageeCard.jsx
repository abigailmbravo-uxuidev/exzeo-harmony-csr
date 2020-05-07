import React from 'react';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const QueuedMortgageeCard = ({ result, handleRemove }) => (
  <div
    tabIndex="0"
    className="card"
    data-test={`queued-mortgagee-${result._id}`}
  >
    <div className="icon-name">
      <i className="card-icon fa fa-file-text" />
      <h5 className="product">{result.product}</h5>
    </div>
    <section>
      <div className="details">
        <span className="policy-no">
          <strong>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`/policy/${result.policyNumber}`}
            >
              {result.companyCode} | {result.policyNumber}
            </a>
          </strong>
          &nbsp;|&nbsp;
          {result.policyHolderName}
        </span>
        <span className="loan-number">
          <strong>Loan Number:</strong>&nbsp;
          {result.loanNo}
        </span>
        <span className="make-billTo">
          <strong>Bill To:</strong>&nbsp;
          {result.makeBillTo || result.currentBillTo ? (
            <i className="fa fa-check-square" />
          ) : (
            <i className="fa fa-square-o" />
          )}
        </span>
        <Button
          dataTest="remove-queue"
          size={BUTTON_SIZE.small}
          className={BUTTON_CLASS.link}
          type="button"
          onClick={handleRemove}
        >
          <i className="fa fa-remove" />
          Remove
        </Button>
      </div>
      <div className="title">
        <h4>
          {result.name1} (Mortgagee {result.order + 1})&nbsp;|&nbsp;
          <span className="propertyAddress">
            <Address className="" address={result.mailingAddress} />
          </span>
        </h4>
      </div>
    </section>
  </div>
);

QueuedMortgageeCard.propTypes = {};

QueuedMortgageeCard.defaultProps = {};

export default QueuedMortgageeCard;
