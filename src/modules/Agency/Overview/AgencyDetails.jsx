import React from 'react';

export const AgencyDetails = ({ agency, editAgency }) => (
  <section>
    <h3>
      Details{' '}
      <button
        className="btn btn-link btn-sm"
        onClick={editAgency}
      >
        <i className="fa fa-pencil-square" />Edit
      </button>
    </h3>
    <div className="form-group flex-parent billing">
      <div className="flex-child">
        <label>Physical Address</label>
        <div>
          {agency.physicalAddress.address1}{' '}
          {agency.physicalAddress.address2}{' '}
        </div>
        <div>
          {agency.physicalAddress.city},{' '}
          {agency.physicalAddress.state}{' '}
          {agency.physicalAddress.zip}
        </div>
      </div>
      <div className="flex-child">
        <label>Mailing Address</label>
        <div>
          {agency.mailingAddress.address1}{' '}
          {agency.mailingAddress.address2}{' '}
        </div>
        <div>
          {agency.mailingAddress.city},{' '}
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
        <div>{agency.okToPay}</div>
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
  </section>);

export default AgencyDetails;
