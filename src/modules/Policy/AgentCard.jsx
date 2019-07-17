import React from 'react';
import { normalize } from '@exzeo/core-ui';
import ContactAddress from '../../components/ContactAddress';

function AgentCard({ agent, policyNumber, policyHolders }) {
  return (
    <div className="agent contact card">
      <div className="contact-title">
        <i className="fa fa-address-card" />
        <label>Agent</label>
      </div>
      <div className="contact-details">
        <h4>
          <span className="agent-code">{agent.agentCode} </span>|{' '}
          <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span>
          {agent.licenses.map(l => (
            <React.Fragment key={l.licenseNumber}>
              {' '}
              | <span className="agent-license">{l.licenseNumber}</span>
            </React.Fragment>
          ))}
        </h4>
        <ContactAddress mailingAddress={agent.mailingAddress} />
        <div className="additional-contacts">
          <ul>
            <li>
              <div className="contact-methods">
                {agent.primaryPhoneNumber && (
                  <p className="primary-phone">
                    <i className="fa fa-phone-square" />
                    <a href={`tel:${agent.primaryPhoneNumber}`}>
                      {normalize.phone(agent.primaryPhoneNumber)}
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
                  <p className="email">
                    <i className="fa fa-envelope" />
                    <a
                      href={`mailto:${agent.emailAddress}?subject=${policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                    >
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
  );
}

export default AgentCard;
