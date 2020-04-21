import React from 'react';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const MortgageeCard = ({ mortgagee, handleQueue }) => (
  <div className="card" data-test={`mortgagee-${mortgagee.order}`}>
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
            data-test={`${mortgagee._id}.makeBillTo`}
          />
        </div>
      )}
    </section>
    <section className="policy-details">
      <h4>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`/policy/${mortgagee.policyNumber}`}
        >
          {mortgagee.policyNumber}
        </a>
      </h4>
      <h5>{mortgagee.policyHolderName}</h5>
      <Address address={mortgagee.propertyAddress} className="address" />
    </section>
    <footer className="footer">
      <Field
        name={`${mortgagee._id}.loanNo`}
        dataTest={`${mortgagee._id}.loanNo`}
        label="Loan No"
        component={Input}
        styleName="loanNo"
      />

      <Button
        dataTest="queue"
        type="button"
        size={BUTTON_SIZE.small}
        className={BUTTON_CLASS.primary}
        onClick={handleQueue}
      >
        QUEUE
      </Button>
    </footer>
  </div>
);

MortgageeCard.propTypes = {};

MortgageeCard.defaultProps = {};

export default MortgageeCard;
