import React from 'react';

export const Contact = ({ agency }) => (
  <div className="contact-details">
    <h4>
      <strong>{`${agency.contactFirstName} ${
        agency.contactLastName
      }`}</strong>
    </h4>
    <div className="additional-contacts">
      <ul>
        <li>
          <div className="contact-methods">
            {agency.contactEmailAddress ? (
              <p>
                <i className="fa fa-envelope" />
                <a
                  href={`mailto:${agency.contactEmailAddress}`}
                >
                  {agency.contactEmailAddress}
                </a>
              </p>
            ) : null}
          </div>
        </li>
      </ul>
    </div>
  </div>);

export default Contact;
