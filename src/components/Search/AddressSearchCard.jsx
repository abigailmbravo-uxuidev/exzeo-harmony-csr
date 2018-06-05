import React from 'react';

function AddressSearchCard({
  handleKeyPress,
  handleClick,
  address,
}) {
  return (
    <li id={address.id} tabIndex="0" onKeyPress={handleKeyPress}>
      <a id={address.physicalAddress.address1} aria-label={address.physicalAddress.address1} className={address.physicalAddress.address1} value={address.physicalAddress.address1} onClick={handleClick} >
        <i className="card-icon fa fa-map-marker" />
        <section>
          <h4>{address.physicalAddress.address1}</h4>
          <p>{address.physicalAddress.city}, {address.physicalAddress.state} {address.physicalAddress.zip}
          </p>
        </section>
        <i className="fa fa-chevron-circle-right" />
      </a>
    </li>
  );
}

export default AddressSearchCard;
