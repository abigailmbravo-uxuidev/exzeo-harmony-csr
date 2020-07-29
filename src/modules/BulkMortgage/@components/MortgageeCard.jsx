import React from 'react';
import { Button, Field, Input } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const MortgageeCard = ({ result, handleQueue }) => (
  <div className="card" data-test={`mortgagee-${result.identifier}`}>
    <section className="mortgagee-detail">
      {!result.noMortgagee && (
        <React.Fragment>
          <h4>Mortgagee {result.order + 1}</h4>
          <h5>{`${result.name1} ${result.name2 || ''}`}</h5>
          <Address address={result.mailingAddress} className="address" />
        </React.Fragment>
      )}
      {result.noMortgagee && (
        <React.Fragment>
          <h4>No Mortgagee</h4>
          <h5>&nbsp;</h5>
        </React.Fragment>
      )}
      <div className="billto-loan-wrapper">
        {result.currentBillTo && (
          <div className="bill-to">
            <label>Current Bill To:</label> Yes
          </div>
        )}
        {!result.currentBillTo && (
          <div className="bill-to">
            <label htmlFor={`${result.identifier}.newBillTo`}>
              Make Bill To
            </label>
            <Field
              name={`${result.identifier}.newBillTo`}
              component="input"
              type="checkbox"
              data-test={`${result.identifier}.newBillTo`}
            />
          </div>
        )}
        <Field
          name={`${result.identifier}.referenceNumber`}
          dataTest={`${result.identifier}.referenceNumber`}
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
