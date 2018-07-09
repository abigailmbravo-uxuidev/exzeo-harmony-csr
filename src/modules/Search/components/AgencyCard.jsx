import React from 'react';
import { normalizePhone } from '@exzeo/core-ui/lib/InputLifecycle';
import AgencyContactAddress from "../../../components/AgencyContactAddress";

function AgencyCard({
  handleKeyPress,
  handleClick,
  agency,
}) {
  return (
    <div className="card-wrapper" onKeyPress={handleKeyPress} tabIndex="0">
      <span className="fa fa-chevron-circle-right" id={`agency-code-${agency.agencyCode}`} onClick={handleClick}/>
      <div className="agency contact card">
        <div className="contact-title">
          <i className="fa fa-address-book"/>
          <label>Agency</label>
        </div>
        <div className="contact-details">
          <div className="card-name">
            <h4 onClick={handleClick} className="agency"><span className="agency-code">{agency.agencyCode}</span> | <span className="agency-display-name">{agency.displayName}</span> | <span className="agency-legal-name">{agency.legalName}</span> | <span className="agency-license">{agency.licenseNumber}</span></h4>

            <AgencyContactAddress
              mailingAddress={agency.mailingAddress}
              status={agency.status}
            >
              <span className="additional-data tier"><label>TIER:&nbsp;</label>{agency.tier >= 0 ? agency.tier : ''}</span>
              {agency.websiteUrl &&
                <span className="additional-data website">
                  <label>WEBSITE:&nbsp;</label>
                  <a href={`${agency.websiteUrl}`} target="_blank">{agency.websiteUrl}</a>
                </span>
              }

            </AgencyContactAddress>

            <div className="additional-contacts">
              <ul>
                <li>
                  <div>
                    <h5>{agency.contactFirstName} {agency.contactLastName}</h5>
                  </div>
                  <div className="contact-methods">
                    {agency.primaryPhoneNumber &&
                      <p className="phone">
                        <i className="fa fa-phone-square"/>
                        <a href={`tel:${agency.primaryPhoneNumber}`}>{normalizePhone(agency.primaryPhoneNumber)}</a>
                      </p>
                    }

                    {agency.secondaryPhoneNumber &&
                      <p className="phone">
                        <small>2<sup>ND</sup><i className="fa fa-phone"/></small>
                        <a href={`tel:${agency.secondaryPhoneNumber}`}>{normalizePhone(agency.secondaryPhoneNumber)}</a>
                      </p>
                    }

                    {agency.faxNumber &&
                      <p className="fax">
                        <i className="fa fa-fax"/>
                        <a href={`tel:${agency.faxNumber}`}>{normalizePhone(agency.faxNumber)}</a>
                      </p>
                    }

                    {agency.contactEmailAddress &&
                      <p>
                        <i className="fa fa-envelope"/>
                        <a href={`mailto:${agency.contactEmailAddress}`}>{agency.contactEmailAddress}</a>
                      </p>
                    }

                    {agency.customerServiceEmailAddress &&
                      <p className="phone">
                        <span className="contact-divider">|</span>
                        <small>CSR <i className="fa fa-envelope"/></small>
                        <a href={`mailto:${agency.customerServiceEmailAddress}`}>{agency.customerServiceEmailAddress}</a>
                      </p>
                    }
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
