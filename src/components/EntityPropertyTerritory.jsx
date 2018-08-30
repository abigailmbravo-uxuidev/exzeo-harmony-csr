import React from 'react';

export const EntityPropertyTerritory = ({
  className,
  territory
}) => (
  <section data-test="propertyTerritory" className={className}>
    <dl>
      <div>
        <dt>Territory</dt>
        <dd>{territory}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyTerritory;
