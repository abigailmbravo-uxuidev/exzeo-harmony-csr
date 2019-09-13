import React from 'react';

function AddressCard({ handleKeyPress, handleClick, address, product }) {
  return (
    <div
      tabIndex="0"
      onKeyPress={handleKeyPress}
      data-test={address.physicalAddress.address1}
      id={address.id}
      className={`card ${address.physicalAddress.address1}`}
      onClick={handleClick}
      data-url={`/quote/new/${address.physicalAddress.state}/${product}/${address.id}`}
    >
      <div id={address.physicalAddress.address1} className="icon-name">
        <i className="card-icon fa fa-map-marker" />
      </div>
      <section>
        <div className="title">
          <h4>
            {address.physicalAddress.address1}&nbsp;|&nbsp;
            <span className="propertyAddress">
              {address.physicalAddress.city},&nbsp;
              {address.physicalAddress.state}&nbsp;{address.physicalAddress.zip}
            </span>
          </h4>
        </div>
      </section>
      <footer>
        <i className="footer-icon fa fa-chevron-right" />
      </footer>
    </div>
  );
}

export default AddressCard;
