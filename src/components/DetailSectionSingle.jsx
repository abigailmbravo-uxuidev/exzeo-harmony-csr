import React from 'react';

const DetailSectionSingle = ({
  className,
  dataTest,
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

export default DetailSectionSingle;
