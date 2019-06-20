import React from 'react';
import { normalize } from '@exzeo/core-ui';

export const ContactView = ({ agency, agencyBranchData, emailType }) => {
  return (
    <React.Fragment>
      <div className="primaryPhoneNumber read" data-test="phone-1">
        <label>Phone 1</label>
        <div>
          <a href={`tel:${agencyBranchData.primaryPhoneNumber}`}>
            {normalize.phone(agencyBranchData.primaryPhoneNumber)}
          </a>
        </div>
      </div>
      <div className="secondaryPhoneNumber read" data-test="phone-2">
        <label>Phone 2</label>
        <div>
          <a href={`tel:${agencyBranchData.secondaryPhoneNumber}`}>
            {normalize.phone(agencyBranchData.secondaryPhoneNumber)}
          </a>
        </div>
      </div>
      <div className="faxNumber read" data-test="fax">
        <label>Fax</label>
        <div>
          <a href={`tel:${agencyBranchData.faxNumber}`}>
            {normalize.phone(agencyBranchData.faxNumber)}
          </a>
        </div>
      </div>
      <div className="customerServiceEmailAddress read" data-test="email">
        <label>{emailType} Email</label>
        <div>
          <a href={`mailto:${agency.customerServiceEmailAddress}`}>
            {agency.customerServiceEmailAddress}
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactView;
