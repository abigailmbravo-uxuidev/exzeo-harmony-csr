import React from 'react';

export const ContactView = ({ agency, agencyBranchData, emailType }) => {
  return (
    <React.Fragment>
      <div className="primaryPhoneNumber read">
        <label>Phone 1</label>
        <div>
          {agencyBranchData.primaryPhoneNumber}
        </div>
      </div>
      <div className="secondaryPhoneNumber read">
        <label>Phone 2</label>
        <div>
          {agencyBranchData.secondaryPhoneNumber}
        </div>
      </div>
      <div className="faxNumber read">
        <label>Fax</label>
        <div>
          {agencyBranchData.faxNumber}
        </div>
      </div>
      <div className="customerServiceEmailAddress read">
        <label>{emailType} Email</label>
        <div>
          {agency.customerServiceEmailAddress}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactView;
