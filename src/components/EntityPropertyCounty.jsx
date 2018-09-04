import React from 'react';

export const EntityPropertyCounty = ({
  dataTest,
  className,
  label,
  render,
  value
}) => (
  <section data-test={dataTest} className={className}>
    <dl>
      <div>
        <dt>{label} {render && render()}</dt>
        <dd>{value}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPropertyCounty;
