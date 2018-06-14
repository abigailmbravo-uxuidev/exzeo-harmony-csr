import React from 'react';
import { normalizePhone } from '@exzeo/core-ui/lib/InputLifecycle';

export const ContactCSR = ({ agency }) => (
  <div className="contact-details">
    <h4>Customer Service Contact Information</h4>
    <div className="additional-contacts">
      <ul>
        <li>
          <div className="contact-methods">
            {agency.primaryPhoneNumber ? (
              <p className="phone">
                <i className="fa fa-phone-square" />
                <a href={`tel:${agency.primaryPhoneNumber}`}>
                  {normalizePhone(agency.primaryPhoneNumber)}
                </a>
              </p>
              ) : null}
            {agency.secondaryPhoneNumber ? (
              <p className="phone">
                <i className="fa fa-phone-square" />
                <a href={`tel:${agency.secondaryPhoneNumber}`}>
                  {normalizePhone(agency.secondaryPhoneNumber)}
                </a>
              </p>
              ) : null}
            {agency.faxNumber ? (
              <p className="fax">
                <i className="fa fa-fax" />
                <a href={`tel:${agency.faxNumber}`}>
                  {normalizePhone(agency.faxNumber)}
                </a>
              </p>
              ) : null}
            {agency.customerServiceEmailAddress ? (
              <p className="phone">
                <i className="fa fa-envelope" />
                <a
                  href={`mailto:${
                      agency.customerServiceEmailAddress
                    }`}
                >
                  {agency.customerServiceEmailAddress}
                </a>
              </p>
              ) : null}
          </div>
        </li>
      </ul>
    </div>
  </div>);

export default ContactCSR;
