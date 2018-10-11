import React from 'react';

export const ContactCard = ({ contact, handleClick }) => (
  <div className="csr contact card">
    <div className="contact-title">
      <i className="fa fa-phone-square" />
      <label />
      <div className="contact-details">
        <h4><strong>{`${contact.firstName} ${contact.lastName}`} | Officer</strong></h4>
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
  </div>
);

export default ContactCard;
