import React from 'react';

export const EntityPropertySourceNumber = ({
  className,
  sourceNumber
}) => (
  <section data-test="propertySourceNumber" className={className}>
    <dl>
      <div>
        <dt>Source Number</dt>
        <dd>{sourceNumber}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertySourceNumber;
