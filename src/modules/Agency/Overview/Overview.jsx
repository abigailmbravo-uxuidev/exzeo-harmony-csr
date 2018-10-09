import React from 'react';

export const Overview = ({ agency, editAgency }) => {
  if (!agency || !agency.physicalAddress) return <span />;

  return (
    <React.Fragment>
      <section>
        <h3>
      Details
          <button
            className="btn btn-link btn-sm"
            onClick={editAgency}>
            <i className="fa fa-pencil-square" />Edit
          </button>
        </h3>
        <div className="form-group flex-parent billing">
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
      </section>
      <section>
        <h3>
      Address
          <button
            className="btn btn-link btn-sm"
            onClick={editAgency}>
            <i className="fa fa-pencil-square" />Edit
          </button>
        </h3>
        <div className="form-group flex-parent billing">
          <div className="flex-child">
            <label>Physical Address</label>
            <div>
              {agency.physicalAddress.address1}
              {agency.physicalAddress.address2}
            </div>
            <div>
              {agency.physicalAddress.city},
              {agency.physicalAddress.state}
              {agency.physicalAddress.zip}
            </div>
          </div>
          <div className="flex-child">
            <label>Mailing Address</label>
            <div>
              {agency.mailingAddress.address1}
              {agency.mailingAddress.address2}
            </div>
            <div>
              {agency.mailingAddress.city},
              {agency.mailingAddress.state} {agency.mailingAddress.zip}
            </div>
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
            <label>Tier</label>
            <div>{agency.tier}</div>
          </div>
          <div className="flex-child">
            <label>Web Address</label>
            <div>
              <a href={agency.websiteUrl} target="_blank">
                {agency.websiteUrl}
              </a>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
export default Overview;
