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
        {contract.licenseNumber}
        <span className="additional-contract-info license-effective-date">
          <label>License Effective Date:&nbsp;</label>
          {moment(contract.licenseEffectiveDate).format('MM/DD/YYYY')}
        </span>
        {contract.contract ? (
          <span className="additional-contract-info contract">
            <label>Contract:&nbsp;</label>
            {contract.contract}
          </span>
        ) : null}
        {contract.addendum ? (
          <span className="additional-contract-info addendum">
            <label>Addendum:&nbsp;</label>
            {contract.addendum}
          </span>
        ) : null}
        {contract.eoExpirationDate ? (
          <span className="additional-contract-info eo-exp-date">
            <label>EO Exp. Date:&nbsp;</label>
            {moment(contract.eoExpirationDate).format('MM/DD/YYYY')}
          </span>
        ) : null}
      </div>

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
