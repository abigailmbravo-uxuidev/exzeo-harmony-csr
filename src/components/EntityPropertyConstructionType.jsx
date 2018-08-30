import React from 'react';

export const EntityPropertyConstructionType = ({
  className,
  constructionType
}) => (
  <section data-test="propertyConstructionType" className={className}>
    <dl>
      <div>
        <dt>Construction Type</dt>
        <dd>{constructionType}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyConstructionType;
