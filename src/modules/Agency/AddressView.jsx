import React from 'react';

const AddressView = ({ agency, territoryManagers }) => {
  return (
    <React.Fragment>
      <div className="physical-address">
        <h4>Physical Address</h4>
        <div className="address flex-col">
          <label>Address</label>
          {agency.physicalAddress.address1}
          {agency.physicalAddress.address2}
        </div>
        <div className="city-state-zip">
          <div className="city flex-col">
            <label>City</label>
            {agency.physicalAddress.city}
          </div>
          <div className="state flex-col">
            <label>State</label>
            {agency.physicalAddress.state}
          </div>
          <div className="zip flex-col">
            <label>Zip Code</label>
            {agency.physicalAddress.zip}
          </div>
        </div>
      </div>
      <div className="mailing-address">
        <h4>Mailing Address</h4>
        <div className="address flex-col">
          <label>Address</label>
          {agency.mailingAddress.address1}
          {agency.mailingAddress.address2}
        </div>
        <div className="city-state-zip">
          <div className="city flex-col">
            <label>City</label>
            {agency.mailingAddress.city}
          </div>
          <div className="state flex-col">
            <label>State</label>
            {agency.mailingAddress.state}
          </div>
          <div className="zip flex-col">
            <label>Zip Code</label>
            {agency.mailingAddress.zip}
          </div>
        </div>
        <div className="county-territory-manager">
          <div className="county flex-col">
            <label>County</label>
            {agency.physicalAddress.county}
          </div>
          <div className="territoryManagerId flex-col">
            <label>Territory Manager</label>
            <div>{territoryManagers.filter(t => t._id === agency.territoryManagerId)[0].name}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressView;
