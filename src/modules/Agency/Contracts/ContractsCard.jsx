import React from 'react';
import moment from 'moment';

export const ContractsCard = ({ license, editContract, contractIndex }) => (
  <div className="contract card">
    <div className="contract-title">
      <i className="fa fa-file" />
      <label>Contract</label>
    </div>
    <div className="contract-details">
      <div className="contract-header">
        <h4 className="contract-csp">
          <strong>{license.companyCode}</strong> |{' '}
          <strong>{license.stateLicense}</strong> |{' '}
          <span>{license.product.map((product, index) => (license.product.length === (index + 1) ? <span key={product}>{product}</span> : <span key={product}>{product} &bull;</span>))}</span>
        </h4>
        <div className="contract-actions">
          <button
            className="btn btn-link btn-sm"
            onClick={editContract('Edit', contractIndex)}
          >
            <i className="fa fa-pencil-square" />Edit
          </button>
        </div>
      </div>
      <div className="contract-info">
        <span className="additional-contract-info license">
          <label>License</label>
          <div className="license-date-wrapper">
            <display>{license.licenseNumber}</display>
            <span className="license-effective-date">
              <label>Effective</label>
              <display>{moment(license.licenseEffectiveDate).format('MM/DD/YYYY')}</display>
            </span>
          </div>
        </span>
        {license.contract ? (
          <span className="additional-contract-info contract">
            <label>Contract</label>
            <display>{license.contract}</display>
          </span>
        ) : null}
        {license.addendum ? (
          <span className="additional-contract-info addendum">
            <label>Addendum</label>
            <display>{license.addendum}</display>
          </span>
        ) : null}
        {license.eoExpirationDate ? (
          <span className="additional-contract-info eo-exp-date">
            <label>EO Exp. Date:&nbsp;</label>
            {moment(license.eoExpirationDate).format('MM/DD/YYYY')}
          </span>
        ) : null}
      </div>
      <ul className="contract-agent-list">
        {/* list headers */}
        <li className="header">
          <span className="is-primary label">Primary</span>
          <span className="agent-id label">Agent ID</span>
          <span className="agent-name label">Name</span>
          <span className="license-array label">License(s)</span>
          <span className="appointed label">Appointed</span>
          <span className="aor label">AOR</span>
        </li>
        {license.agent.map((a) => {
          const { agentInfo: { firstName, lastName, ...agentInfo }, appointed, agentOfRecord } = a;
          const isPrimary = license.primaryAgent === a.agentCode;
          return (<li className="agent-detail">
            <span className="is-primary display">{ isPrimary ? <i className="fa fa-check" /> : null}</span>
            <span className="agent-id display">{a.agentCode}</span>
            <span className="agent-name display">{`${firstName} ${lastName}`}</span>
            <span className="license-array display">{agentInfo.license.map(l => l.licenseNumber)}</span>
            <span className="appointed display">{ appointed ? <i className="fa fa-check" /> : null}</span>
            <span className="aor display">{ agentOfRecord ? <i className="fa fa-check" /> : null}</span>
          </li>);
        })}
      </ul>
    </div>

  </div>);

export default ContractsCard;
