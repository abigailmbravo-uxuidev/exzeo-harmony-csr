import React from 'react';
import { normalize } from '@exzeo/core-ui';

import AgencyContactAddress from '../../../components/AgencyContactAddress';

export const AgentOfRecordCard = ({ agent, handleSecondaryClick, handlePrimaryClick }) => (
  <div className="agency agent contact card" tabIndex="0">
    <div className="contact-title">
      <i className="fa fa-address-card margin bottom" />

      {agent.agentOfRecord &&
      <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small>
    }
      {agent.appointed &&
      <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small>
    }

    </div>
    <div className="contact-details">
      <div className="card-name">
        <h4 id={agent.licenseNumber} data-test={agent.licenseNumber}>
          <span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span>
        </h4>

        <AgencyContactAddress
          mailingAddress={agent.mailingAddress}
          status={agent.status} />

        <div className="additional-contacts">
          <ul>
            <li>
              <div className="contact-methods">
                {agent.primaryPhoneNumber &&
                <p className="phone">
                  <i className="fa fa-phone-square" />
                  <a href={`tel:${agent.primaryPhoneNumber}`}>{normalize.phone(agent.primaryPhoneNumber)}</a>
                </p>
              }

                {agent.secondaryPhoneNumber &&
                <p className="phone">
                  <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                  <a href={`tel:${agent.secondaryPhoneNumber}`}>{normalize.phone(agent.secondaryPhoneNumber)}</a>
                </p>
              }

                {agent.faxNumber &&
                <p className="fax">
                  <i className="fa fa-fax" />
                  <a href={`tel:${agent.faxNumber}`}>{normalize.phone(agent.faxNumber)}</a>
                </p>
              }

                {agent.emailAddress &&
                <p>
                  <i className="fa fa-envelope" />
                  <a href={`mailto:${agent.emailAddress}`}>{agent.emailAddress}</a>
                </p>
              }

              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="contact-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={handleSecondaryClick}>
        <i className="fa fa-pencil-square" />Switch
      </button>
      <button
        className="btn btn-link btn-sm"
        onClick={handlePrimaryClick}>
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>
);

export default AgentOfRecordCard;
