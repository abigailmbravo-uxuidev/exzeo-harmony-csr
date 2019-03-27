import React from 'react';

export const ContactCard = ({ contact, handleClick, isOfficer }) => (
  <div className="csr contact card">
    <div className="contact-title" data-test="contact-title">
      <i className="fa fa-address-card" />
      {isOfficer &&
      <small>
        <i className="fa fa-certificate" />
        <label>Officer</label>
      </small>

      }
    </div>
    <div className="contact-details">
      <div className="card-name" data-test="contact-name">
        <h4><strong>{`${contact.firstName} ${contact.lastName}`}</strong>{contact.title ? ` | ${contact.title}` : ''}</h4>
      </div>
      <div className="additional-contacts">
        <ul>
          <li>
            <div className="contact-methods" data-test="contact-methods">
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
        dataTest="edit-contact"
        onClick={handleClick}>
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>
);

export default ContactCard;
