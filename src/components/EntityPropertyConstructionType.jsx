import React from 'react';

export const EntityPropertyConstructionType = ({
  className,
  label,
  constructionType
}) => (
  <section data-test="propertyConstructionType" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>{constructionType}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyConstructionType;
