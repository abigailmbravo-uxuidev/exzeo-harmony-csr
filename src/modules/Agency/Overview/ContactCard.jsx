import React from 'react';
import ContactCSR from './ContactCSR';
import Contact from './Contact';
import ContactPrincipal from './ContactPrincipal';

export const ContactCard = ({ agency, type, editContact }) => (
  <div className="csr contact card">
    <div className="contact-title">
      <i className="fa fa-phone-square" />
      <label>{type}</label>
    </div>
    {type === 'CSR' && <ContactCSR agency={agency} />}
    {type === 'Contact' && <Contact agency={agency} />}
    {type === 'Principal' && <ContactPrincipal agency={agency} />}
    <div className="contact-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={editContact(type)}
      >
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>);

export default ContactCard;
