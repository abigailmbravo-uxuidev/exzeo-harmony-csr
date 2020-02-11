import React from 'react';
import PropTypes from 'prop-types';
import { normalize } from '@exzeo/core-ui';

export const ContactCard = ({
  name,
  phoneNumber,
  phoneNumberExtension,
  emailAddress,
  handleClick,
  policyNumber,
  policyHolders,
  icon = 'fa-user-circle'
}) => (
  <div className="agent contact card">
    <div className="contact-title">
      <i className={`fa ${icon}`} />
      <label className="tm">Territory Manager</label>
    </div>
    <div className="contact-details">
      <h4>{name}</h4>
      <div className="additional-contacts">
        <ul>
          <li>
            <div className="contact-methods">
              {phoneNumber && (
                <p className="primary-phone">
                  <i className="fa fa-phone-square" />
                  <a href={`tel:${phoneNumber}`}>
                    {normalize.phone(phoneNumber)}
                  </a>
                </p>
              )}
              {emailAddress && (
                <p className="email">
                  <i className="fa fa-envelope" />
                  <a
                    href={`mailto:${emailAddress}?subject=${policyNumber}%20${policyHolders.firstName}%20${policyHolders.lastName}`}
                  >
                    {emailAddress}
                  </a>
                </p>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  phoneNumberExtension: PropTypes.string,
  emailAddress: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  policyHolders: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  }),
  icon: PropTypes.string
};

export default ContactCard;
