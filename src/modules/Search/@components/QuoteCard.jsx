import React from 'react';
import { date, format } from '@exzeo/core-ui';

function QuoteCard({ handleClick, quote }) {
  const firstName =
    quote.policyHolders[0] && quote.policyHolders[0].firstName
      ? quote.policyHolders[0].firstName
      : '';
  const lastName =
    quote.policyHolders[0] && quote.policyHolders[0].lastName
      ? quote.policyHolders[0].lastName
      : '';

  return (
    <div
      tabIndex="0"
      onKeyPress={e => e.charCode === 13 && handleClick(quote)}
      id={quote._id}
      data-test={quote.quoteNumber}
      onClick={handleClick}
      data-url={`/quote/${quote.quoteNumber}/coverage`}
      className="card"
    >
      <div className="icon-name">
        {/*<i className="card-icon fa fa-user-circle" />*/}
        <i className="card-icon fa fa-quote-left" />
        <h5 className="product">{quote.product}</h5>
      </div>
      <section>
        <div
          id={quote.quoteNumber + quote.property.physicalAddress.address1}
          className="details"
        >
          <span className="quote-no">
            <strong>{quote.companyCode}</strong>&nbsp;|&nbsp;
            {quote.quoteNumber}
          </span>
          <span className="started-on">
            <strong>Started On:</strong>&nbsp;
            {date.formatDate(quote.createdAt)}
          </span>
          <span className="premium">
            <strong>Premium:</strong>&nbsp;
            {(quote.rating && format.toCurrency(quote.rating.totalPremium)) ||
              '$ -'}
          </span>
          <span className="effective-date">
            <strong>Effective Date:</strong>&nbsp;
            {date.formatDate(quote.effectiveDate)}
          </span>
          <span className="quote-status">
            <strong>Quote Status:</strong>&nbsp;
            {quote.quoteState}
          </span>
        </div>
        <div className="title">
          {Array.isArray(quote.policyHolders) &&
            quote.policyHolders.length > 0 && (
              <h4>
                {`${firstName.replace(
                  /(^.{20}).*$/,
                  '$1...'
                )} ${lastName.replace(/(^.{20}).*$/, '$1...')}`}
                &nbsp;|&nbsp;
                <span className="propertyAddress">
                  {`${quote.property.physicalAddress.address1}`},&nbsp;
                  <span className="propertyCityStateZip">{`${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${quote.property.physicalAddress.zip}`}</span>
                </span>
              </h4>
            )}
        </div>
      </section>
      <footer>
        <i className="footer-icon fa fa-chevron-right" />
      </footer>
    </div>
  );
}

export default QuoteCard;
