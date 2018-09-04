import React from 'react';

export const EntityDetails = ({
  className,
  details: { product, entityNumber },
  children
}) => (
  <section data-test="entityDetails" className={className}>
    <dl>
      <div>
        <dd>{product}</dd>
        <dd>{entityNumber}</dd>
        {children}
      </div>
    </dl>
  </section>
);
export default EntityDetails;
