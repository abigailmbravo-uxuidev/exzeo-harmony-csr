import React from 'react';
import { normalizePhone } from '@exzeo/core-ui/lib/InputLifecycle';
import AgencyContactAddress from "../../../components/AgencyContactAddress";

function AgentCard({
  handleKeyPress,
  handleClick,
  agent,
}) {
  return (
    <div className="agency agent contact card" onKeyPress={handleKeyPress} tabIndex="0">
      <div className="contact-title">
        <i className="fa fa-address-card margin bottom"/>

        {agent.agentOfRecord &&
          <small><i className="card-icon fa fa-bookmark"/><label>AOR</label></small>
        }
        {agent.appointed &&
          <small><i className="card-icon fa fa-certificate"/><label>Appointed</label></small>
        }

      </div>
      <div className="contact-details">
        <div className="card-name">
          <h4 id={agent.licenseNumber} data-test={agent.licenseNumber} onClick={handleClick}>
            <span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span>
          </h4>

          <AgencyContactAddress
            mailingAddress={agent.mailingAddress}
            status={agent.status}
          />

          <div className="additional-contacts">
            <ul>
              <li>
                <div className="contact-methods">
                  {agent.primaryPhoneNumber &&
                  <p className="phone">
                    <i className="fa fa-phone-square"/>
                    <a href={`tel:${agent.primaryPhoneNumber}`}>{normalizePhone(agent.primaryPhoneNumber)}</a>
                  </p>
                  }

                  {agent.secondaryPhoneNumber &&
                  <p className="phone">
                    <small>2<sup>ND</sup><i className="fa fa-phone"/></small>
                    <a href={`tel:${agent.secondaryPhoneNumber}`}>{normalizePhone(agent.secondaryPhoneNumber)}</a>
                  </p>
                  }

                  {agent.faxNumber &&
                  <p className="fax">
                    <i className="fa fa-fax"/>
                    <a href={`tel:${agent.faxNumber}`}>{normalizePhone(agent.faxNumber)}</a>
                  </p>
                  }

                  {agent.emailAddress &&
                  <p>
                    <i className="fa fa-envelope"/>
                    <a href={`mailto:${agent.emailAddress}`}>{agent.emailAddress}</a>
                  </p>
                  }

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