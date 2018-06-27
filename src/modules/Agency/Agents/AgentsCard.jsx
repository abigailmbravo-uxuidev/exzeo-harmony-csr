import React from 'react';
import { normalizePhone } from '@exzeo/core-ui/lib/InputLifecycle';

export const AgentsCard = ({
  agency, agent, agentIndex, toggleAgentModal, removeAgentModal
}) => (
  <div className="agency agent contact card" key={agentIndex}>
    <div className="contact-title">
      <i className="fa fa-address-card margin bottom" />
      {agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark" /><label>AOR</label></small> : null }
      {agent.appointed ? <small><i className="card-icon fa fa-certificate" /><label>Appointed</label></small> : null }
    </div>
    <div className="contact-details">
      <div className="card-name">
        <div className="card-name-content">
          <h4><span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{`${agent.firstName} ${agent.lastName}`}</span> | <span className="agent-license">{agent.licenseNumber}</span></h4>
          <div className="contact-address">
            {agent.mailingAddress.address1},&nbsp;
            {agent.mailingAddress.address2}{agent.mailingAddress.address2 ? ', ' : ' ' }
            {agent.mailingAddress.city},&nbsp;
            {agent.mailingAddress.state}&nbsp;
            {agent.mailingAddress.zip}
            {agent.status ? <span className="additional-data status"><label>STATUS:&nbsp;</label>{agent.status}</span> : null}
          </div>
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
        </div>
        <div className="card-actions">
          <button className="btn btn-link" onClick={() => removeAgentModal(agent, agency)}><i className="fa fa-times-circle" />Remove</button>
          <button className="btn btn-link" onClick={() => toggleAgentModal(agent, agency)}><i className="fa fa-pencil-square" />Edit</button>
        </div>

      </div>
      <footer>
        <h5><span className="agency-code">{agency.agencyCode}</span> | <span className="agency">{agency.displayName}</span></h5>
        <div className="footer-actions">
          <button className="btn btn-link"><i className="fa fa-download" />Agent Book</button>
        </div>
      </footer>
    </div>
  </div>);

export default AgentsCard;
