import React from 'react';
import { normalize } from '@exzeo/core-ui';

import ContactAddress from '../../../components/ContactAddress';

function AgentCard({ handleKeyPress, handleClick, agent }) {
  const licenseNumbers = agent.licenses.map(l => l.licenseNumber).join();
  return (
    <div
      className="agency agent contact card"
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      <div className="contact-title">
        <i className="fa fa-address-card margin bottom" />

        {agent.agentOfRecord && (
          <small>
            <i className="card-icon fa fa-bookmark" />
            <label>AOR</label>
          </small>
        )}
        {agent.licenses.some(l => l.appointed) && (
          <small>
            <i className="card-icon fa fa-certificate" />
            <label>Appointed</label>
          </small>
        )}
      </div>
      <div className="contact-details">
        <div className="card-name">
          <h4 id={licenseNumbers} data-test={licenseNumbers}>
            <span className="agent-code">{agent.agentCode}</span>&nbsp;|
            <span className="agent-name">
              {' '}
              {`${agent.firstName} ${agent.lastName}`}
            </span>
            &nbsp;|&nbsp;
            <span className="agent-license">{licenseNumbers}&nbsp;</span>
            <span
              className="btn btn-link btn-sm"
              onClick={handleClick}
              data-url={`/agency/${agent.agencyCode}/0/overview`}
            >
              <i className="fa fa-address-book" />
              Open Agency
            </span>
          </h4>

          <ContactAddress
            mailingAddress={agent.mailingAddress}
            status={agent.status}
          />

          <div className="additional-contacts">
            <ul>
              <li>
                <div className="contact-methods">
                  {agent.primaryPhoneNumber && (
                    <p className="phone">
                      <i className="fa fa-phone-square" />
                      <a href={`tel:${agent.primaryPhoneNumber}`}>
                        {normalize.phone(agent.primaryPhoneNumber)}
                      </a>
                    </p>
                  )}

                  {agent.secondaryPhoneNumber && (
                    <p className="phone">
                      <small>
                        2<sup>ND</sup>
                        <i className="fa fa-phone" />
                      </small>
                      <a href={`tel:${agent.secondaryPhoneNumber}`}>
                        {normalize.phone(agent.secondaryPhoneNumber)}
                      </a>
                    </p>
                  )}

                  {agent.faxNumber && (
                    <p className="fax">
                      <i className="fa fa-fax" />
                      <a href={`tel:${agent.faxNumber}`}>
                        {normalize.phone(agent.faxNumber)}
                      </a>
                    </p>
                  )}

                  {agent.emailAddress && (
                    <p>
                      <i className="fa fa-envelope" />
                      <a href={`mailto:${agent.emailAddress}`}>
                        {agent.emailAddress}
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
  );
}

export default AgentCard;
