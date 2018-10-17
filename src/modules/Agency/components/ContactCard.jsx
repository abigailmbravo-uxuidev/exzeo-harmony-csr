import React from 'react';

export const ContactCard = ({ contact, handleClick }) => (
  <div className="csr contact card">
    <div className="contact-title">
      <i className="fa fa-address-card" />
    </div>
    <div className="contact-details">
      <div className="card-name">
        <h4><strong>{`${contact.firstName} ${contact.lastName}`}</strong> | Officer</h4>
      </div>
      <div className="additional-contacts">
        <ul>
          <li>
            <div className="contact-methods">
              <p>
                <i className="fa fa-envelope" />
                <a href={`mailto:${contact.emailAddress}`}>
                  {contact.emailAddress}
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="contact-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={handleClick}>
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>
);

export default ContactCard;
