import React from 'react';
import PropTypes from 'prop-types';

const ContactAddress = ({ mailingAddress, status, children }) => {
  return (
    <div className="contact-address">
      {mailingAddress.address1},&nbsp;
      {mailingAddress.address2}
      {mailingAddress.address2 ? ', ' : ''}
      {mailingAddress.city},&nbsp;
      {mailingAddress.state}&nbsp;
      {mailingAddress.zip}
      {status && (
        <span className="additional-data status">
          <label>STATUS:&nbsp;</label>
          {status}
        </span>
      )}
      {children}
    </div>
  );
};

ContactAddress.propTypes = {
  mallingAddress: PropTypes.shape({
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }),
  status: PropTypes.string
};

ContactAddress.defaultProps = {
  mailingAddress: {}
};

export default ContactAddress;
