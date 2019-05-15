import React from 'react';
import { Button } from '@exzeo/core-ui';

export const ContractCard = ({ contract, editContract, deleteContract, canDelete }) => (
  <div className="contract card">
    <div className="contract-title" data-test="contract-title">
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
      <div className="contract-info" data-test="contract-info">
        <span className="additional-contract-info contract">
          <label>Contract</label>
          <div className="contract-number-wrapper">
            <div>{contract.contractNumber}</div>
          </div>
        </span>
        {contract.addendum &&
        <span className="additional-contract-info contract">
          <label>Addendum</label>
          <div className="addendum-wrapper">
            <div>{contract.addendum}</div>
          </div>
        </span>
        }
      </div>
    </div>
    <div className="contract-actions">
      {canDelete &&
        <Button
          className={Button.constants.classNames.link}
          size={Button.constants.sizes.small}
          onClick={deleteContract}
          data-test="delete-contract">
          <i className="fa fa-trash" />Delete
        </Button>
      }
        <Button
          className={Button.constants.classNames.link}
          size={Button.constants.sizes.small}
          onClick={editContract}
          dataTest="delete-contract">
            <i className="fa fa-pencil-square" />Edit
        </Button>
    </div>
  </div>);

export default ContractCard;
