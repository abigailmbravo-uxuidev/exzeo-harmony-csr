import React from 'react';

const DetailView = ({ agency }) => {
  return (
    <div className="form-group flex-parent details">
      <div className="flex-child">
        <label>Agency ID</label>
        <div>
          {agency.agencyCode}
        </div>
      </div>
      <div className="flex-child">
        <label>Agency Name</label>
        <div>
          {agency.displayName}
        </div>
      </div>
      <div className="flex-child">
        <label>Entity Name</label>
        <div>{agency.legalName}</div>
      </div>
      <div className="flex-child">
        <label>Status</label>
        <div>{agency.status}</div>
      </div>
      <div className="flex-child">
        <label>TPAID</label>
        <div>{agency.tpaid}</div>
      </div>
      <div className="flex-child">
        <label>OK to Pay</label>
        <div>{agency.okToPay ? 'Yes' : 'No'}</div>
      </div>
      <div className="flex-child">
        <label>Web Address</label>
        <div>
          <a href={agency.websiteUrl} target="_blank">
            {agency.websiteUrl}
          </a>
        </div>
      </div>
      <div className="flex-child">
        <label>Tax ID</label>
        <div>{agency.taxIdNumber}</div>
      </div>
      <div className="flex-child">
        <label>Tax Classification</label>
        <div>{agency.taxClassification}</div>
      </div>
      <div className="flex-child">
        <label>EO Expiration Date</label>
        <div>{agency.eoExpirationDate}</div>
      </div>
      <div className="flex-child">
        <label>Branch Name</label>
        <div>{agency.branchName}</div>
      </div>
    </div>
  );
};

export default DetailView;
