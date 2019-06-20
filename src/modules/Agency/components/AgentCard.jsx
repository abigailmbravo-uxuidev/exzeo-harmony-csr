import React from 'react';
import { normalize } from '@exzeo/core-ui';

import ContactAddress from '../../../components/ContactAddress';

export const AgentCard = ({
  agent,
  handleSecondaryClick,
  handlePrimaryClick
}) => (
  <div
    className="agency agent contact card"
    tabIndex="0"
    data-test="agent-of-record"
  >
    <div className="contact-title" data-test="contact-title">
      <i className="fa fa-address-card margin bottom" />

      {agent.agentOfRecord && (
        <small>
          <i className="card-icon fa fa-bookmark" />
          <label>AOR</label>
        </small>
      )}
      {agent.appointed && (
        <small>
          <i className="card-icon fa fa-certificate" />
          <label>Appointed</label>
        </small>
      )}
    </div>
    <div className="contact-details">
      <div className="card-name">
        <h4 id={agent.licenseNumber} data-test={agent.licenseNumber}>
          <span className="agent-code">{agent.agentCode}</span> |{' '}
          <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span>{' '}
          | <span className="agent-license">{agent.licenseNumber}</span>
        </h4>

        <ContactAddress
          mailingAddress={agent.mailingAddress}
          status={agent.status}
        />

        <div className="additional-contacts" data-test="additional-contacts">
          <ul>
            <li>
              <div className="contact-methods">
                {agent.primaryPhoneNumber && (
                  <p className="phone" data-test="phone">
                    <i className="fa fa-phone-square" />
                    <a
                      href={`tel:${agent.primaryPhoneNumber}${
                        agent.primaryPhoneNumberExtension
                          ? `+${agent.primaryPhoneNumberExtension}`
                          : ''
                      }`}
                    >
                      {normalize.phone(agent.primaryPhoneNumber)}
                      {agent.primaryPhoneNumberExtension
                        ? ` ext. ${agent.primaryPhoneNumberExtension}`
                        : ''}
                    </a>
                  </p>
                )}

                {agent.secondaryPhoneNumber && (
                  <p className="phone" data-test="secondary-phone">
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
                  <p className="fax" data-test="fax">
                    <i className="fa fa-fax" />
                    <a href={`tel:${agent.faxNumber}`}>
                      {normalize.phone(agent.faxNumber)}
                    </a>
                  </p>
                )}

                {agent.emailAddress && (
                  <p data-test="email">
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
    <div className="contact-actions" data-test="contact-actions">
      <button
        data-test="switch-aor-agent"
        className="btn btn-link btn-sm"
        onClick={handleSecondaryClick(agent)}
      >
        <i className="fa fa-exchange" />
        Switch AOR
      </button>
      <button
        data-test="edit-agent"
        className="btn btn-link btn-sm"
        onClick={handlePrimaryClick}
      >
        <i className="fa fa-pencil-square" />
        Edit
      </button>
    </div>
  </div>
);

export default AgentCard;
