import React from 'react';
import moment from 'moment';

const PolicySearchCard = ({
  policyKeyEnter, policySelection, policy, index
}) => (
  <div tabIndex="0" onKeyPress={policyKeyEnter} id={policy.PolicyID} className="card" key={index}>
    <div className="icon-name">
      <i className="card-icon fa fa-user-circle" />
      <div className="card-name">
        <h5 title={policy.policyHolders && policy.policyHolders.length > 0 ? `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}` : ''}>{policy.policyHolders[0] && `${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}</h5>
      </div>
    </div>
    <section>
      <ul id="policy-search-results" className="policy-search-results">
        <li className="header">
          <span className="policy-no">Policy No.</span>
          <span className="property-address">Property Address</span>
          <span className="quote-state">Policy Status</span>
          <span className="effctive-date">Effective Date</span>
        </li>
        <li>
          <a id={policy.PolicyID} onClick={policySelection} className={`${policy.policyNumber + policy.property.physicalAddress.address1} row`}>
            <span className="quote-no">{policy.policyNumber}</span>
            <span className="property-address">{
          `${policy.property.physicalAddress.address1}
              ${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state}
              ${policy.property.physicalAddress.zip}`
        }
            </span>
            <span className="quote-state">{policy.status}</span>
            <span className="effctive-date">{moment.utc(policy.effectiveDate).format('MM/DD/YYYY')}</span>
          </a>
        </li>
      </ul>
    </section>
  </div>
);

export default PolicySearchCard;
