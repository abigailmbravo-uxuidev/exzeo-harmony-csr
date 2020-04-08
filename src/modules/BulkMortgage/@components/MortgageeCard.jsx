import React from 'react';
import classNames from 'classnames';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const MortgageeCard = ({ mortgagee, handleQueue }) => (
  <li data-test={`mortgagee-${mortgagee.order}`}>
    <div className={classNames('card')}>
      <section className="view-col-8">
        <h4>Mortgagee {mortgagee.order + 1}</h4>
        <h5>{mortgagee.name1}</h5>
        <Address address={mortgagee.mailingAddress} className="address" />
        <Field
          name={`${mortgagee._id}.loanNo`}
          dataTest="loanNo"
          label="Loan No"
          component={Input}
          styleName="loanNo"
        />
        <p>Current BillTo: {mortgagee.currentBillTo}</p>
        <Field
          name={`${mortgagee._id}.makeBillTo`}
          component="input"
          type="checkbox"
          data-test="makeBillTo"
        />
        <label htmlFor={`${mortgagee._id}.makeBillTo`}>Make Bill To</label>
      </section>
      <section className="view-col-4">
        <h4>{mortgagee.policyNumber}</h4>
        <h5>{mortgagee.policyHolderName}</h5>
        <Address
          address={mortgagee.policyHolderMailingAddress}
          className="address"
        />
        <Button
          type="button"
          size={BUTTON_SIZE.small}
          className={BUTTON_CLASS.primary}
          onClick={handleQueue}
        >
          QUEUE
        </Button>
      </section>
    </div>
  </li>
);

MortgageeCard.propTypes = {};

MortgageeCard.defaultProps = {};

export default MortgageeCard;
