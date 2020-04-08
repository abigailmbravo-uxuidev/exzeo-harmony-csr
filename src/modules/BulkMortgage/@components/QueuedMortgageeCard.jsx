import React from 'react';
import classNames from 'classnames';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const QueuedMortgageeCard = ({ mortgagee, handleRemove }) => (
  <div
    className={classNames('card')}
    data-test={`mortgagee-${mortgagee.order}`}
  >
    <section className="mortgagee-detail">
      <h4>Mortgagee {mortgagee.order + 1}</h4>
      <h5>{mortgagee.name1}</h5>
      <Address address={mortgagee.mailingAddress} className="address" />
      {mortgagee.currentBillTo === 'YES' && (
        <div className="bill-to">
          <label>Current Bill To:</label> {mortgagee.currentBillTo}
        </div>
      )}
      {mortgagee.currentBillTo !== 'YES' && (
        <div className="bill-to">
          <label htmlFor={`${mortgagee._id}.makeBillTo`}>Make Bill To</label>
          <Field
            name={`${mortgagee._id}.makeBillTo`}
            component="input"
            type="checkbox"
            data-test="makeBillTo"
          />
        </div>
      )}
    </section>
    <section className="policy-details">
      <h4>{mortgagee.policyNumber}</h4>
      <h5>{mortgagee.policyHolderName}</h5>
      <Address
        address={mortgagee.policyHolderMailingAddress}
        className="address"
      />
    </section>
    <footer className="footer">
      <Field
        name={`${mortgagee._id}.loanNo`}
        dataTest="loanNo"
        label="Loan No"
        component={Input}
        styleName="loanNo"
      />

      <Button
        type="button"
        size={BUTTON_SIZE.small}
        className={BUTTON_CLASS.link}
        onClick={handleRemove}
      >
        <i className="fa fa-refresh" />
        Remove
      </Button>
    </footer>
  </div>
);

QueuedMortgageeCard.propTypes = {};

QueuedMortgageeCard.defaultProps = {};

export default QueuedMortgageeCard;
