import React from 'react';
import moment from 'moment';

export const ContractsCard = ({ agency, editContract }) => (
  <div className="contract card">
    <div className="contract-title">
      <i className="fa fa-file" />
      <label>Contract</label>
    </div>
    <div className="contract-details">
      <h4 className="contract-csp">
        <strong>{agency.companyCode}</strong> |{' '}
        <strong>{agency.state}</strong> |{' '}
        <span>PRODUCT 1 &bull; PRODUCT 2 &bull; PRODUCT 3</span>
      </h4>
      <div className="contract-info">
        {agency.licenseNumber}
        <span className="additional-contract-info license-effective-date">
          <label>License Effective Date:&nbsp;</label>
          {moment(agency.licenseEffectiveDate).format('MM/DD/YYYY')}
        </span>
        {agency.contract ? (
          <span className="additional-contract-info contract">
            <label>Contract:&nbsp;</label>
            {agency.contract}
          </span>
        ) : null}
        {agency.addendum ? (
          <span className="additional-contract-info addendum">
            <label>Addendum:&nbsp;</label>
            {agency.addendum}
          </span>
        ) : null}
        {agency.eoExpirationDate ? (
          <span className="additional-contract-info eo-exp-date">
            <label>EO Exp. Date:&nbsp;</label>
            {moment(agency.eoExpirationDate).format('MM/DD/YYYY')}
          </span>
        ) : null}
      </div>
    </div>
    <div className="contract-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={editContract('Edit')}
      >
        <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>);

export default ContractsCard;
