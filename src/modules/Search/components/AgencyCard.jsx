import React from 'react';
import { normalize } from '@exzeo/core-ui';

import ContactAddress from '../../../components/ContactAddress';
import { formatUrl } from '../../../utilities/format';

function AgencyCard({ handleKeyPress, handleClick, agency }) {
  return (
    <div className="card-wrapper" onKeyPress={handleKeyPress} tabIndex="0">
      <span
        className="fa fa-chevron-right"
        id={`agency-code-${agency.agencyCode}`}
        onClick={handleClick}
        data-url={`/agency/${agency.agencyCode}/0/overview`}
      />
      <div className="agency contact card">
        <div className="contact-title">
          <i className="fa fa-address-book" />
          <label>Agency</label>
        </div>
        <div className="contact-details">
          <div className="card-name">
            <h4
              onClick={handleClick}
              className="agency"
              data-test={agency.agencyCode}
            >
              <span className="agency-code">{agency.agencyCode}</span> |{' '}
              <span className="agency-display-name">{agency.displayName}</span>{' '}
              | <span className="agency-legal-name">{agency.legalName}</span> |{' '}
              <span className="agency-license">
                {agency.licenses.map(l => l.licenseNumber).join()}
              </span>
            </h4>

            <ContactAddress
              mailingAddress={agency.mailingAddress}
              status={agency.status}
            >
              {agency.websiteUrl && (
                <span className="additional-data website">
                  <label>WEBSITE:&nbsp;</label>
                  <a href={formatUrl(agency.websiteUrl)} target="_blank">
                    {agency.websiteUrl}
                  </a>
                </span>
              )}
            </ContactAddress>

            <div className="additional-contacts">
              <ul>
                <li>
                  <div>
                    <h5>
                      {agency.contact.firstName} {agency.contact.lastName}
                    </h5>
                  </div>
                  <div className="contact-methods">
                    {agency.primaryPhoneNumber && (
                      <p className="phone">
                        <i className="fa fa-phone-square" />
                        <a href={`tel:${agency.primaryPhoneNumber}`}>
                          {normalize.phone(agency.primaryPhoneNumber)}
                        </a>
                      </p>
                    )}

                    {agency.secondaryPhoneNumber && (
                      <p className="phone">
                        <small>
                          2<sup>ND</sup>
                          <i className="fa fa-phone" />
                        </small>
                        <a href={`tel:${agency.secondaryPhoneNumber}`}>
                          {normalize.phone(agency.secondaryPhoneNumber)}
                        </a>
                      </p>
                    )}

                    {agency.faxNumber && (
                      <p className="fax">
                        <i className="fa fa-fax" />
                        <a href={`tel:${agency.faxNumber}`}>
                          {normalize.phone(agency.faxNumber)}
                        </a>
                      </p>
                    )}

                    {agency.contactEmailAddress && (
                      <p>
                        <i className="fa fa-envelope" />
                        <a href={`mailto:${agency.contactEmailAddress}`}>
                          {agency.contactEmailAddress}
                        </a>
                      </p>
                    )}

                    {agency.customerServiceEmailAddress && (
                      <p className="phone">
                        <span className="contact-divider">|</span>
                        <small>
                          CSR <i className="fa fa-envelope" />
                        </small>
                        <a
                          href={`mailto:${agency.customerServiceEmailAddress}`}
                        >
                          {agency.customerServiceEmailAddress}
                        </a>
                      </p>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AgencyCard;
