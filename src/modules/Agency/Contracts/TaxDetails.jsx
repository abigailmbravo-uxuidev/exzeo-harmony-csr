import React from 'react';

export const TaxDetails = ({ agency }) => (
  <section>
    <h3>Details</h3>
    <div className="tax-details">
      <div className="tax-id">
        <label>Tax ID</label>
        <div>{agency.taxIdNumber}</div>
      </div>
      <div className="tax-classification">
        <label>Tax Classification</label>
        <div>{agency.taxClassification}</div>
      </div>
    </div>
  </section>
);

export default TaxDetails;
