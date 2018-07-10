import React from 'react';
import moment from 'moment';

export const ContractsCard = ({ contract, editContract, contractIndex }) => (
  <div className="contract card">
    <div className="contract-title">
      <i className="fa fa-file" />
      <label>Contract</label>
    </div>
    <div className="contract-details">
      <h4 className="contract-csp">
        <strong>{contract.companyCode}</strong> |{' '}
        <strong>{contract.stateLicense}</strong> |{' '}
        <span>{contract.product.map((product, index) => (contract.product.length === (index + 1) ? <span>{product}</span> : <span>{product} &bull;</span>))}</span>
      </h4>
      <div className="contract-info">
        <span className="license">
          <label>License</label>
          <display>{contract.licenseNumber}</display>
        </span>
        <span className="additional-contract-info license-effective-date">
          <label>License Effective Date</label>
          <display>{moment(contract.licenseEffectiveDate).format('MM/DD/YYYY')}</display>
        </span>
        {contract.contract ? (
          <span className="additional-contract-info contract">
            <label>Contract</label>
            <display>{contract.contract}</display>
          </span>
        ) : null}
        {contract.addendum ? (
          <span className="additional-contract-info addendum">
            <label>Addendum</label>
            <display>{contract.addendum}</display>
          </span>
        ) : null}
        {contract.eoExpirationDate ? (
          <span className="additional-contract-info eo-exp-date">
            <label>EO Exp. Date:&nbsp;</label>
            {moment(contract.eoExpirationDate).format('MM/DD/YYYY')}
          </span>
        ) : null}
      </div>
      <ul className="contract-agent-list">
        {/*list headers*/}
        <li className="header">
          <span className="is-primary label">Primary</span>
          <span className="agent-id label">Agent ID</span>
          <span className="agent-name label">Name</span>
          <span className="license-array label">License(s)</span>
          <span className="appointed label">Appointed</span>
          <span className="aor label">AOR</span>
        </li>
        {/*Start loop of agents associated with this contract*/}
        {/*agent 1*/}
        <li className="agent-detail">
          <span className="is-primary display">[is primary true => <i className="fa fa-check"/> : null]</span>
          <span className="agent-id display">[agent id]]</span>
          <span className="agent-name display">[agent name]</span>
          <span className="license-array display">[array of agent licenses]</span>
          <span className="appointed display">[is appointed true => <i className="fa fa-check"/> : null]</span>
          <span className="aor display">[is aor true => <i className="fa fa-check"/> : null]</span>
        </li>
      </ul>
    </div>
    <div className="contract-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={editContract('Edit', contractIndex)}
      >
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>);

export default ContractsCard;
