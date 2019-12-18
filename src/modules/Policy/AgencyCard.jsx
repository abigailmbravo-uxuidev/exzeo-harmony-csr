import React from 'react';
import { normalize } from '@exzeo/core-ui';
import ContactAddress from '../../components/ContactAddress';
import { formatUrl } from '../../utilities/format';

function AgencyCard({ agency, policyNumber, policyHolders }) {
  if (!agency && !agency.agencyCode)
    return <div className="agency contact card">Agency not found.</div>;

  return (
    <div className="agency contact card">
      <div className="contact-title">
        <i className="fa fa-address-book" />
        <label>Agency</label>
      </div>
      <div className="contact-details">
        <h4 className="agency">
          <span className="agency-code">{agency.agencyCode} </span>|{' '}
          <span className="agency-display-name">{agency.displayName} </span>|{' '}
          <span className="agency-legal-name">{agency.legalName}</span>
          {agency.licenses.map(l => (
            <React.Fragment key={l.licenseNumber}>
              {' '}
              | <span className="agency-license">{l.licenseNumber}</span>
            </React.Fragment>
          ))}
        </h4>
        <ContactAddress
          mailingAddress={agency.mailingAddress}
          status={agency.status}
        >
          <span className="additional-data tier">
            <label>TIER:&nbsp;</label>
            {agency.tier >= 0 ? agency.tier : ''}
          </span>
          {agency.websiteUrl ? (
            <span className="additional-data website">
              <label>WEBSITE:&nbsp;</label>
              <a
                href={formatUrl(agency.websiteUrl)}
                rel="noopener noreferrer"
                target="_blank"
              >
                {agency.websiteUrl}
              </a>
            </span>
          ) : null}
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
                  <p className="primary-phone">
                    <i className="fa fa-phone-square" />
                    <a href={`tel:${agency.primaryPhoneNumber}`}>
                      {normalize.phone(agency.primaryPhoneNumber)}
                    </a>
                  </p>
                )}
                {agency.secondaryPhoneNumber && (
                  <p className="secondary-phone">
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
                {agency.contact.emailAddress && policyHolders[0] ? (
                  <p>
                    <i className="fa fa-envelope" />
                    <a
                      href={`mailto:${agency.contact.emailAddress}?subject=${policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                    >
                      {agency.contact.emailAddress}
                    </a>
                  </p>
                ) : null}
                {agency.customerServiceEmailAddress && (
                  <p className="phone csr-phone">
                    <span className="contact-divider">|</span>
                    <small>
                      CSR <i className="fa fa-envelope" />
                    </small>
                    <a
                      href={`mailto:${agency.customerServiceEmailAddress}?subject=${policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
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
  );
}

export default AgencyCard;
