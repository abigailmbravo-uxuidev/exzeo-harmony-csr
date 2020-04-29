import React from 'react';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const QueuedMortgageeCard = ({ mortgagee, handleRemove }) => (
  <div
    tabIndex="0"
    className="card"
    data-test={`queued-mortgagee-${mortgagee._id}`}
  >
    <div className="icon-name">
      <i className="card-icon fa fa-file-text" />
      <h5 className="product">{mortgagee.product}</h5>
    </div>
    <section>
      <div className="details">
        <span className="policy-no">
          <strong>{mortgagee.policyNumber}</strong>&nbsp;|&nbsp;
          {mortgagee.policyHolderName}
        </span>
        <span className="loan-number">
          <strong>Loan Number:</strong>&nbsp;
          {mortgagee.loanNo}
        </span>
        <span className="make-billTo">
          <strong>Bill To:</strong>&nbsp;
          {mortgagee.makeBillTo || mortgagee.currentBillTo ? (
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
          {mortgagee.name1} (Mortgagee {mortgagee.order + 1})&nbsp;|&nbsp;
          <span className="propertyAddress">
            <Address className="" address={mortgagee.mailingAddress} />
          </span>
        </h4>
      </div>
    </section>
  </div>
);

QueuedMortgageeCard.propTypes = {};

QueuedMortgageeCard.defaultProps = {};

export default QueuedMortgageeCard;
