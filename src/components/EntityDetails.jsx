import React from 'react';

export const EntityDetails = ({
  className,
  details: { product, entityNumber, status },
  handleStatusClick,
  showButton
}) => (
  <section data-test="entityDetails" className={className}>
    <dl>
      <div>
        <dd>{product}</dd>
        <dd>{entityNumber}</dd>
        <dd className="quote-status">{showButton ?
          <button className="btn btn-link" onClick={handleStatusClick}>{status}</button> : status}
        </dd>
      </div>
    </dl>
  </section>
);
export default EntityDetails;
