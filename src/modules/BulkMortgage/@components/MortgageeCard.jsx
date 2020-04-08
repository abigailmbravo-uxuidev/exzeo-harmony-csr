import React from 'react';
import classNames from 'classnames';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const MortgageeCard = ({ mortgagee, handleQueue }) => (
  <div
    className={classNames('card')}
    data-test={`mortgagee-${mortgagee.order}`}
  >
    <section className="view-col-8">
      <h4>Mortgagee {mortgagee.order + 1}</h4>
      <h5>{mortgagee.name1}</h5>
      <p className="address">
        {mortgagee.mailingAddress.address2
          ? `${mortgagee.mailingAddress.address1}, ${mortgagee.mailingAddress.address2}, ${mortgagee.mailingAddress.city}, ${mortgagee.mailingAddress.state} ${mortgagee.mailingAddress.zip}`
          : `${mortgagee.mailingAddress.address1}, ${mortgagee.mailingAddress.city}, ${mortgagee.mailingAddress.state} ${mortgagee.mailingAddress.zip}`}
      </p>
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
      <h4>{mortgagee.policynumber}</h4>
      <h5>{mortgagee.policyHolderName}</h5>
      <p className="address">
        {mortgagee.policyHolderMailingAddress.address2
          ? `${mortgagee.policyHolderMailingAddress.address1}, ${mortgagee.policyHolderMailingAddress.address2}, ${mortgagee.policyHolderMailingAddress.city}, ${mortgagee.policyHolderMailingAddress.state} ${mortgagee.policyHolderMailingAddress.zip}`
          : `${mortgagee.policyHolderMailingAddress.address1}, ${mortgagee.policyHolderMailingAddress.city}, ${mortgagee.policyHolderMailingAddress.state} ${mortgagee.policyHolderMailingAddress.zip}`}
      </p>
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
);

MortgageeCard.propTypes = {};

MortgageeCard.defaultProps = {};

export default MortgageeCard;
