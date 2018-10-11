import React from 'react';

const ContactView = ({ agency, emailType }) => {
  return (
    <div className="form-group flex-parent contact">
      <div className="flex-child">
        <label>Phone 1</label>
        <div>
          {agency.primaryPhoneNumber}
        </div>
      </div>
      <div className="flex-child">
        <label>Phone 2</label>
        <div>
          {agency.secondaryPhoneNumber}
        </div>
      </div>
      <div className="flex-child">
        <label>Fax</label>
        <div>
          {agency.faxNumber}
        </div>
      </div>
      <div className="flex-child">
        <label>{emailType} Email</label>
        <div>
          {agency.customerServiceEmailAddress}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
