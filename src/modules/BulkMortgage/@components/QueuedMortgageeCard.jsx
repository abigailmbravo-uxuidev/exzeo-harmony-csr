import React from 'react';
import classNames from 'classnames';
import { Button, normalize } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';
import ContactAddress from '../../../components/ContactAddress';
import { formatUrl } from '../../../utilities/format';
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';

const QueuedMortgageeCard = ({ mortgagee, handleRemove }) => (
  <div
    tabIndex="0"
    className="card"
    data-test={`queued-mortgagee-${mortgagee._id}`}
  >
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
        <span className="current-billTo">
          <strong>Current Bill To:</strong>&nbsp;
          {mortgagee.currentBillTo}
        </span>
        {mortgagee.makeBillTo && (
          <span className="make-billTo">
            <strong>Make Bill To:</strong>&nbsp;
            <i className="fa fa-check-square" />
          </span>
        )}
        <Button
          dataTest="remove-queue"
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
          {mortgagee.name1} (Mortgagee {mortgagee.order + 1}) &nbsp;|&nbsp;
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
