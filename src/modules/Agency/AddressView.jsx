import React from 'react';

const AddressView = ({ agencyBranchData, territoryManagers }) => {
  return (
    <React.Fragment>
      <div className="physical-address">
        <h4>Physical Address</h4>
        <div className="address flex-col">
          <label>Address</label>
          {agencyBranchData.physicalAddress.address1}
          {agencyBranchData.physicalAddress.address2}
        </div>
        <div className="city-state-zip">
          <div className="city flex-col">
            <label>City</label>
            {agencyBranchData.physicalAddress.city}
          </div>
          <div className="state flex-col">
            <label>State</label>
            {agencyBranchData.physicalAddress.state}
          </div>
          <div className="zip flex-col">
            <label>Zip Code</label>
            {agencyBranchData.physicalAddress.zip}
          </div>
        </div>
      </div>
      <div className="mailing-address">
        <h4>Mailing Address</h4>
        <div className="address flex-col">
          <label>Address</label>
          {agencyBranchData.mailingAddress.address1}
          {agencyBranchData.mailingAddress.address2}
        </div>
        <div className="city-state-zip">
          <div className="city flex-col">
            <label>City</label>
            {agencyBranchData.mailingAddress.city}
          </div>
          <div className="state flex-col">
            <label>State</label>
            {agencyBranchData.mailingAddress.state}
          </div>
          <div className="zip flex-col">
            <label>Zip Code</label>
            {agencyBranchData.mailingAddress.zip}
          </div>
        </div>
        <div className="county-territory-manager">
          <div className="county flex-col">
            <label>County</label>
            {agencyBranchData.physicalAddress.county}
          </div>
          <div className="territoryManagerId flex-col">
            <label>Territory Manager</label>
            <div>{territoryManagers.filter(t => t._id === agencyBranchData.territoryManagerId)[0].name}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressView;
