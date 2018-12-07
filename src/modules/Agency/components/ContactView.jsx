import React from 'react';
import { normalize } from '@exzeo/core-ui';

export const ContactView = ({ agency, agencyBranchData, emailType }) => {
  return (
    <React.Fragment>
      <div className="primaryPhoneNumber read">
        <label>Phone 1</label>
        <div>
          <a href={`tel:${agencyBranchData.primaryPhoneNumber}`}>{normalize.phone(agencyBranchData.primaryPhoneNumber)}</a>
        </div>
      </div>
      <div className="secondaryPhoneNumber read">
        <label>Phone 2</label>
        <div>
          <a href={`tel:${agencyBranchData.secondaryPhoneNumber}`}>{normalize.phone(agencyBranchData.secondaryPhoneNumber)}</a>
        </div>
      </div>
      <div className="faxNumber read">
        <label>Fax</label>
        <div>
          <a href={`tel:${agencyBranchData.faxNumber}`}>{normalize.phone(agencyBranchData.faxNumber)}</a>
        </div>
      </div>
      <div className="customerServiceEmailAddress read">
        <label>{emailType} Email</label>
        <div>
          <a href={`mailto:${agency.customerServiceEmailAddress}`}>{agency.customerServiceEmailAddress}</a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactView;
