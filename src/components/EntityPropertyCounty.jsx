import React from 'react';

export const EntityPropertyCounty = ({
  className,
  county
}) => (
  <section data-test="propertyCounty" className={className}>
    <dl>
      <div>
        <dt>Property County</dt>
        <dd>{county}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyCounty;
