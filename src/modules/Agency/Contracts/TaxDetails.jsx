import React from 'react';

export const TaxDetails = ({ agency, editAgency }) => (
  <section>
    <h3>
      Details{' '}
      <button
        className="btn btn-link btn-sm"
        onClick={editAgency}
      >
        <i className="fa fa-pencil-square" />Edit
      </button>
    </h3>
    <div className="form-group flex-parent billing">
      <div className="flex-child">
        <label>Tax ID</label>
        <div>{agency.taxIdNumber}</div>
      </div>
      <div className="flex-child">
        <label>Tax Calssification</label>
        <div>{agency.taxClassification}</div>
      </div>
    </div>
  </section>);

export default TaxDetails;
