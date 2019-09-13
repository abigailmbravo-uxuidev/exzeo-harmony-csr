import React from 'react';
import moment from 'moment';
import { STANDARD_DATE_FORMAT } from '../../../constants/dates';

function PolicyCard({ handleKeyPress, handleClick, policy }) {
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
        <i className="card-icon fa fa-file-text" />
        <h5 className="product">{policy.product}</h5>
      </div>
      <section>
        <div id={policy.PolicyID} className="details">
          <span className="policy-no">
            <strong>{policy.companyCode}</strong>&nbsp;|&nbsp;
            {policy.policyNumber}
          </span>
          <span className="effective-date">
            <strong>Effective Date:</strong>&nbsp;
            {moment.utc(policy.effectiveDate).format(STANDARD_DATE_FORMAT)}
          </span>
          <span className="policy-status">
            <strong>Policy Status:</strong>&nbsp;
            {policy.status}
          </span>
        </div>
        <div className="title">
          {Array.isArray(policy.policyHolders) &&
            policy.policyHolders.length > 0 && (
              <h4>
                {`${policy.policyHolders[0].firstName} ${policy.policyHolders[0].lastName}`}
                &nbsp;|&nbsp;
                <span className="propertyAddress">
                  {`${policy.property.physicalAddress.address1}`}&nbsp;
                  <span className="propertyCityStateZip">
                    {`${policy.property.physicalAddress.city}, ${policy.property.physicalAddress.state} ${policy.property.physicalAddress.zip}`}
                  </span>
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

export default PolicyCard;
