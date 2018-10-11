import React from 'react';

const AddressView = ({ agency, territoryManagers }) => {
  return (
    <div className="form-group flex-parent address">
      <div className="flex-child">
        <h4>Physical Address</h4>
        <label>Address</label>
        <div>
          {agency.physicalAddress.address1}
          {agency.physicalAddress.address2}
        </div>
        <label>City</label>
        <div>
          {agency.physicalAddress.city}
        </div>
        <label>State</label>
        <div>
          {agency.physicalAddress.state}
        </div>
        <label>Zip Code</label>
        <div>
          {agency.physicalAddress.zip}
        </div>
        <label>County</label>
        <div>
          {agency.physicalAddress.county}
        </div>
      </div>
      <div className="flex-child">
        <h4>Mailing Address</h4>
        <label>Address</label>
        <div>
          {agency.mailingAddress.address1}
          {agency.mailingAddress.address2}
        </div>
        <label>City</label>
        <div>
          {agency.mailingAddress.city}
        </div>
        <label>State</label>
        <div>
          {agency.mailingAddress.state}
        </div>
        <label>Zip Code</label>
        <div>
          {agency.mailingAddress.zip}
        </div>
        <label>Territory Manager</label>
        <div>{territoryManagers.filter(t => t._id === agency.territoryManagerId)[0].name}</div>
      </div>
    </div>
  );
};

export default AddressView;
