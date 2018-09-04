import React from 'react';

export const EntityDetails = ({
  className,
  dataTest,
  data,
  children
}) => (
  <section data-test={dataTest} className={className}>
    <dl>
      <div>
        {Object.keys(data).map(key => (
          <dd>{data[key]}</dd>
        ))}
        {children}
      </div>
    </dl>
  </section>
);
export default EntityDetails;
