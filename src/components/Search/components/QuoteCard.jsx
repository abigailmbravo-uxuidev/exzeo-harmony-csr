import React from 'react';
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from '../constants';

function QuoteCard({
  handleKeyPress,
  handleClick,
  quote
}) {
  return (
    <div tabIndex="0" onKeyPress={handleKeyPress} id={quote._id} className="card">
      <div className="icon-name">
        <i className="card-icon fa fa-user-circle" />
        <div className="card-name">
          <h5
            title={quote.policyHolders && quote.policyHolders.length > 0
              ? `${quote.policyHolders[0].firstName} ${quote.policyHolders[0].lastName}`
              : ''}
          >{quote.policyHolders[0] && `${quote.policyHolders[0].firstName.replace(/(^.{20}).*$/, '$1...')}`}<br />
            {quote.policyHolders[0] && `${quote.policyHolders[0].lastName.replace(/(^.{20}).*$/, '$1...')}`}
          </h5>
        </div>
      </div>
      <section>
        <ul id="quote-search-results" className="quote-search-results">
          <li className="header">
            <span className="quote-no">Quote No.</span>
            <span className="property-address">Property Address</span>
            <span className="quote-state">Quote Status</span>
            <span className="effective-date">Effective Date</span>
            <span className="started-on">Started On</span>
            <span className="premium">Premium</span>
          </li>
          <li>
            <a id={quote.quoteNumber + quote.property.physicalAddress.address1} className={`${quote.quoteNumber + quote.property.physicalAddress.address1} row`} aria-label={quote.quoteNumber + quote.property.physicalAddress.address1} value={quote.quoteNumber + quote.property.physicalAddress.address1} onClick={handleClick} >
              <span className="quote-no">{quote.quoteNumber}</span>
              <span className="property-address">{`${quote.property.physicalAddress.address1} ${quote.property.physicalAddress.city}, ${quote.property.physicalAddress.state} ${quote.property.physicalAddress.zip}`}</span>
              <span className="quote-state">{quote.quoteState}</span>
              <span className="effective-date">{moment.utc(quote.effectiveDate).format(STANDARD_DATE_FORMAT)}</span>
              <span className="started-on">{moment.utc(quote.createdAt).format(STANDARD_DATE_FORMAT)}</span>
              <span className="premium">$ {
                quote.rating
                  ? quote.rating.totalPremium
                  : '-'
              }
              </span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default QuoteCard;
