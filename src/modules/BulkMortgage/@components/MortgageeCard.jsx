import React from 'react';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const MortgageeCard = ({ result, handleQueue }) => (
  <div className="card" data-test={`mortgagee-${result.order}`}>
    <section className="mortgagee-detail">
      <React.Fragment>
        <h4>Mortgagee {result.order + 1}</h4>
        <h5>{result.name1}</h5>
        <Address address={result.mailingAddress} className="address" />
      </React.Fragment>
      <div className="billto-loan-wrapper">
        {result.currentBillTo && (
          <div className="bill-to">
            <label>Current Bill To:</label> Yes
          </div>
        )}
        {!result.currentBillTo && (
          <div className="bill-to">
            <label htmlFor={`${result._id}.newBillTo`}>Make Bill To</label>
            <Field
              name={`${result._id}.newBillTo`}
              component="input"
              type="checkbox"
              data-test={`${result._id}.newBillTo`}
            />
          </div>
        )}
        <Field
          name={`${result._id}.loanNo`}
          dataTest={`${result._id}.loanNo`}
          label="Loan No:"
          component={Input}
          styleName="loanNo"
        />
      </div>
    </section>
    <section className="policy-details">
      <div className="icon-name">
        <i className="card-icon fa fa-file-text" />
        <h5 className="product">{result.product}</h5>
      </div>
      <div className="details">
        <h4 className="policy-number">
          {result.companyCode}&nbsp;|&nbsp;
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/policy/${result.policyNumber}`}
          >
            {result.policyNumber}
          </a>
        </h4>

        <h5>{result.policyHolderName}</h5>
        <Address address={result.propertyAddress} className="address" />
      </div>
    </section>
    <footer className="footer btn-footer">
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
