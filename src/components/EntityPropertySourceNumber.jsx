import React from 'react';

export const EntityPropertySourceNumber = ({
  className,
  label,
  sourceNumber
}) => (
  <section data-test="propertySourceNumber" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>{sourceNumber}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertySourceNumber;
