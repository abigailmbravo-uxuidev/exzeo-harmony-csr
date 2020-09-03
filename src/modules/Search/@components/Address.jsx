import React from 'react';

const Address = ({ address, label }) => {
  return (
    <>
      <span className="additional-data address">
        <label>{label}</label>
      </span>
      {address.address1},&nbsp;
      {address.address2}
      {address.address2 ? ', ' : ''}
      {address.city},&nbsp;
      {address.state}&nbsp;
      {address.zip}
    </>
  );
};

export default Address;
