import React from 'react';

const AddressSearchCard = ({
  address, index, addressKeyEnter, addressSelection
}) => (
  <li id={address.id} key={index} tabIndex="0" onKeyPress={addressKeyEnter}>
    <a id={address.physicalAddress.address1} aria-label={address.physicalAddress.address1} className={address.physicalAddress.address1} value={address.physicalAddress.address1} onClick={addressSelection} >
      <i className="card-icon fa fa-map-marker" />
      <section>
        <h4>{address.physicalAddress.address1}</h4>
        <p>{address.physicalAddress.city}, {address.physicalAddress.state}
          {address.physicalAddress.zip}
        </p>
      </section>
      <i className="fa fa-chevron-circle-right" />
    </a>
  </li>
);

export default AddressSearchCard;
