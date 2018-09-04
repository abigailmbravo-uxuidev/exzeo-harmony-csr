import React from 'react';

export const EntityDetails = ({
  children,
  className,
  data,
  dataTest
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
