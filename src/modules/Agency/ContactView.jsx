import React from 'react';

const ContactView = ({ agency, emailType }) => {
  return (
    <React.Fragment>
      <div className="primaryPhoneNumber read">
        <label>Phone 1</label>
        <div>
          {agency.primaryPhoneNumber}
        </div>
      </div>
      <div className="secondaryPhoneNumber read">
        <label>Phone 2</label>
        <div>
          {agency.secondaryPhoneNumber}
        </div>
      </div>
      <div className="faxNumber read">
        <label>Fax</label>
        <div>
          {agency.faxNumber}
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
