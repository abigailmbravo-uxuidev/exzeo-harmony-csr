import React from 'react';

export const EntityPropertyTerritory = ({
  className,
  label,
  territory
}) => (
  <section data-test="propertyTerritory" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>{territory}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyTerritory;
