import React from 'react';
import { normalize } from '@exzeo/core-ui';
import Button from '@exzeo/core-ui/lib/Button';

export const AgentsCard = ({
  agency,
  agent,
  agentIndex,
  handleEditAgent,
  handleRemoveAgent,
  handleSwitchAOR
}) => (
  <div className="agency agent contact card">
    <div className="contact-title">
      <i className="fa fa-address-card margin bottom" />
      {/* {agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small> : null }
      {agent.appointed ? <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small> : null } */}
    </div>
    <div className="contact-details">
      <div className="card-name">
        <div className="card-name-content">
          <h4><span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span></h4>
          <div className="contact-address">
            {agent.mailingAddress.address1},&nbsp;
            {agent.mailingAddress.address2}{agent.mailingAddress.address2 ? ', ' : ' '}
            {agent.mailingAddress.city},&nbsp;
            {agent.mailingAddress.state}&nbsp;
            {agent.mailingAddress.zip}
            {agent.status &&
              <span className="additional-data status"><label>STATUS:&nbsp;</label>{agent.status}</span>
            }
          </div>
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
        </div>
        <div className="card-actions">
          {String(agency.agentOfRecord) === String(agent.agentCode) &&
          <Button
            baseClass="link"
            size="small"
            onClick={() => handleSwitchAOR(agentIndex)}><i className="fa fa-times-circle" />Switch AOR
          </Button>}
          <Button
            baseClass="link"
            size="small"
            onClick={() => handleRemoveAgent(agentIndex)}><i className="fa fa-times-circle" />Remove
          </Button>
          <Button
            baseClass="link"
            size="small"
            onClick={() => handleEditAgent(agentIndex)}><i className="fa fa-pencil-square" />Edit
          </Button>
        </div>

      </div>
      <footer>
        <h5><span className="agency-code">{agency.agencyCode}</span> | <span className="agency">{agency.displayName}</span></h5>
        <div className="footer-actions">
          <Button
            baseClass="link"
            size="small"><i className="fa fa-download" />Agent Book
          </Button>
        </div>
      </footer>
    </div>
  </div>
);

export default AgentsCard;
