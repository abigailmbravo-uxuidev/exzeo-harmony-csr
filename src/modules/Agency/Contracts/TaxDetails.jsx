import React from 'react';

export const TaxDetails = ({ agency }) => (
  <section>
    <h3>
      Details{' '}
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
