import React from 'react';

export const AddressView = ({ agencyBranchData, territoryManagers }) => {
  return (
    <React.Fragment>
      <div className="mailing-address" data-test="mailing-address">
        <h4>Mailing Address</h4>
        <div className="address form-group">
          <label>Address</label>
          <div>
            {agencyBranchData.mailingAddress.address1}
            {agencyBranchData.mailingAddress.address2
              ? `, ${agencyBranchData.mailingAddress.address2}`
              : ''}
            <br />
            {agencyBranchData.mailingAddress.city},{' '}
            {agencyBranchData.mailingAddress.state}{' '}
            {agencyBranchData.mailingAddress.zip}
          </div>
        </div>
      </div>
      <div className="physical-address" data-test="physical-address">
        <h4>Physical Address</h4>
        <div className="address flex-col">
          <label>Address</label>
          <div>
            {agencyBranchData.physicalAddress.address1}
            {agencyBranchData.physicalAddress.address2
              ? `, ${agencyBranchData.physicalAddress.address2}`
              : ''}
            <br />
            {agencyBranchData.physicalAddress.city},{' '}
            {agencyBranchData.physicalAddress.state}{' '}
            {agencyBranchData.physicalAddress.zip}
          </div>
        </div>
        <div className="county form-group" data-test="county">
          <label>County</label>
          <div>{agencyBranchData.physicalAddress.county}</div>
        </div>
        <div
          className="territoryManagerId flex-col"
          data-test="territory-manager"
        >
          <label>Territory Manager</label>
          <div>
            {territoryManagers.filter(
              t => t._id === agencyBranchData.territoryManagerId
            ).length > 0
              ? territoryManagers.filter(
                  t => t._id === agencyBranchData.territoryManagerId
                )[0].name
              : ''}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressView;
