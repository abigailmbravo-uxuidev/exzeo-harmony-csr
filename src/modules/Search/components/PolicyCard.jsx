import React from 'react';
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';

function PolicyCard({
  handleKeyPress,
  handleClick,
  policy
}) {
  return (
    <div
      tabIndex="0"
      onKeyPress={handleKeyPress}
      id={policy.PolicyID}
      onClick={handleClick}
      className="card"
      data-test={policy.policyNumber}
      data-url={`/policy/${policy.policyNumber}/coverage`}
    >
      <div className="icon-name">
        {/*<i className="card-icon fa fa-user-circle" />*/}
        <i className="card-icon fa fa-file-text" />
      </div>
      <section>
        <div className="card-name">
          {(Array.isArray(policy.policyHolders) && policy.policyHolders.length > 0) &&
            <h5 title={`${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}>
              {`${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}
            </h5>
          }
        </div>
        <ul id="policy-search-results" className="policy-search-results">
          <li className="header">
            <span className="policy-no">Policy No.</span>
            <span className="property-address">Property Address</span>
            <span className="policy-status">Policy Status</span>
            <span className="effective-date">Effective Date</span>
          </li>
          <li>
            <div
              id={policy.PolicyID}
              className='row'
            >
              <span className="quote-no">{policy.policyNumber}</span>
              <span className="property-address">
              {`${policy.property.physicalAddress.address1}
                ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
                ${policy.property.physicalAddress.zip}`}
              </span>
              <span className="policy-status">{policy.status}</span>
              <span className="effective-date">{moment.utc(policy.effectiveDate).format(STANDARD_DATE_FORMAT)}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default PolicyCard;
