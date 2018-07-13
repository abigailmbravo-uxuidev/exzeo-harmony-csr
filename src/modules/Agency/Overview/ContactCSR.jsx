import React from 'react';
import normalizePhone from '../../../components/Form/normalizePhone';

export const ContactCSR = ({ agency }) => (
  <div className="contact-details">
    <h4>Customer Service Contact Information</h4>
    <div className="additional-contacts">
      <ul>
        <li>
          <div className="contact-methods">
            {agency.primaryPhoneNumber &&
              <p className="phone">
                <i className="fa fa-phone-square" />
                <a href={`tel:${agency.primaryPhoneNumber}`}>
                  {normalizePhone(agency.primaryPhoneNumber)}
                </a>
              </p>
            }
            {agency.secondaryPhoneNumber &&
              <p className="phone">
                <i className="fa fa-phone-square" />
                <a href={`tel:${agency.secondaryPhoneNumber}`}>
                  {normalizePhone(agency.secondaryPhoneNumber)}
                </a>
              </p>
            }
            {agency.faxNumber &&
              <p className="fax">
                <i className="fa fa-fax" />
                <a href={`tel:${agency.faxNumber}`}>
                  {normalizePhone(agency.faxNumber)}
                </a>
              </p>
            }
            {agency.customerServiceEmailAddress &&
              <p className="phone">
                <i className="fa fa-envelope" />
                <a href={`mailto:${agency.customerServiceEmailAddress}`}>
                  {agency.customerServiceEmailAddress}
                </a>
              </p>
            }
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default ContactCSR;
