import React from 'react';
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';

function QuoteCard({ handleKeyPress, handleClick, quote }) {
  return (
    <div
      tabIndex="0"
      onKeyPress={handleKeyPress}
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
            {moment.utc(quote.createdAt).format(STANDARD_DATE_FORMAT)}
          </span>
          <span className="premium">
            <strong>Premium:</strong>&nbsp; ${' '}
            {quote.rating ? quote.rating.totalPremium : '-'}
          </span>
          <span className="effective-date">
            <strong>Effective Date:</strong>&nbsp;
            {moment.utc(quote.effectiveDate).format(STANDARD_DATE_FORMAT)}
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
                {`${quote.policyHolders[0].firstName.replace(
                  /(^.{20}).*$/,
                  '$1...'
                )} ${quote.policyHolders[0].lastName.replace(
                  /(^.{20}).*$/,
                  '$1...'
                )}`}
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
