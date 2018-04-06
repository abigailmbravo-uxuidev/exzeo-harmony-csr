import React from 'react';
import normalizePhone from '../Form/normalizePhone';

const AgentSearchCard = ({
  agentKeyEnter, agentSelection, agent, index
}) => (
  <div className="agency agent contact card" key={index} onKeyPress={agentKeyEnter} tabIndex="0">
    <div className="contact-title">
      <i className="fa fa-address-card margin bottom" />
      {agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small> : null }
      {agent.appointed ? <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small> : null }
    </div>
    <div className="contact-details">
      <div className="card-name">
        <h4 onClick={agentSelection}><span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span></h4>
        <div className="contact-address">
          {agent.mailingAddress.address1},&nbsp;
          {agent.mailingAddress.address2}{agent.mailingAddress.address2 ? ', ' : ' ' }
          {agent.mailingAddress.city},&nbsp;
          {agent.mailingAddress.state}&nbsp;
          {agent.mailingAddress.zip}
          {agent.status ? <span className="additional-data status"><label>STATUS:&nbsp;</label>{agent.status}</span> : null}
        </div>
        <div className="additional-contacts">
          <ul>
            <li>
              <div className="contact-methods">
                {agent.primaryPhoneNumber ?
                  <p className="phone">
                    <i className="fa fa-phone-square" />
                    <a href={`tel:${agent.primaryPhoneNumber}`}>{normalizePhone(agent.primaryPhoneNumber)}</a>
                  </p> : null }
                {agent.secondaryPhoneNumber ?
                  <p className="phone">
                    <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                    <a href={`tel:${agent.secondaryPhoneNumber}`}>{normalizePhone(agent.secondaryPhoneNumber)}</a>
                  </p> : null }
                {agent.faxNumber ?
                  <p className="fax">
                    <i className="fa fa-fax" />
                    <a href={`tel:${agent.faxNumber}`}>{normalizePhone(agent.faxNumber)}</a>
                  </p> : null }
                {agent.emailAddress ?
                  <p>
                    <i className="fa fa-envelope" />
                    <a href={`mailto:${agent.emailAddress}`}>{agent.emailAddress}</a>
                  </p> : null }
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default AgentSearchCard;
