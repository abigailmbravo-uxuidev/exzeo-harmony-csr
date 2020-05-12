import React from 'react';

const Address = ({ address, className }) => {
  return (
    <p className={className}>
      {address.address2
        ? `${address.address1}, ${address.address2}, ${address.city}, ${address.state} ${address.zip}`
        : `${address.address1}, ${address.city}, ${address.state} ${address.zip}`}
    </p>
  );
};

export default Address;
