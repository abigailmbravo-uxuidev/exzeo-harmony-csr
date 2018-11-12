import React from 'react';

export const ContractCard = ({ contract, editContract, contractIndex }) => (
  <div className="contract card">
    <div className="contract-title">
      <i className="fa fa-file-text" />
      <label>Contract</label>
    </div>
    <div className="contract-details">
      <div className="contract-header">
        <h4 className="contract-csp">
          <strong>{contract.companyCode}</strong> |&nbsp;
          <span>
          {contract.stateProducts.map((p, index) => (contract.stateProducts.length === (index + 1)
            ? <span key={p.product}>{p.state} &bull; {p.product}</span>
            : <span key={p.product}>{p.state} &bull; {p.product} | </span>))}
          </span>
        </h4>
      </div>
      <div className="contract-info">
        <span className="additional-contract-info contract">
          <label>Contract</label>
          <div className="contract-number-wrapper">
            <div>{contract.contractNumber}</div>
          </div>
        </span>
        {contract.addendum &&
          <span className="additional-contract-info contract">
            <label>Addendum</label>
            <div className="contract-number-wrapper">
              <div>{contract.addendum}</div>
            </div>
          </span>
        }
      </div>
    </div>
    <div className="contract-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={editContract}
      >
      <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>);

export default ContractCard;
