import React from 'react';

export const EntityPropertyCounty = ({
  className,
  label,
  county
}) => (
  <section data-test="propertyCounty" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>{county}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyCounty;
