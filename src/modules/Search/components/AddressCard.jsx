import React from 'react';

function AddressCard({ handleKeyPress, handleClick, address, product }) {
  return (
    <li id={address.id} tabIndex="0" onKeyPress={handleKeyPress}>
      <a
        id={address.physicalAddress.address1}
        data-test={address.physicalAddress.address1}
        className={address.physicalAddress.address1}
        onClick={handleClick}
        data-url={`/quote/new/${address.physicalAddress.state}/${product}/${address.id}`}
      >
        <i className="card-icon fa fa-map-marker" />
        <section>
          <h4>{address.physicalAddress.address1}</h4>
          <p>
            {address.physicalAddress.city}, {address.physicalAddress.state}{' '}
            {address.physicalAddress.zip}
          </p>
        </section>
        <i className="fa fa-chevron-circle-right" />
      </a>
    </li>
  );
}

export default AddressCard;
