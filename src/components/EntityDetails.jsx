import React from 'react';

export const EntityDetails = ({
  className,
  details: { product, entityNumber, status }
}) => (
  <section data-test="entityDetails" className={className}>
    <dl>
      <div>
        <dd>{product}</dd>
        <dd>{entityNumber}</dd>
        <dd data-test="detailStatus">{status}</dd>
      </div>
    </dl>
  </section>
);
export default EntityDetails;
