import React from 'react';

export const EntityAddress = ({
  data,
  dataTest,
  className,
  label,
  render
}) => (
  <section data-test={dataTest} className={className}>
    <dl>
      <div>
        <dt>{label} {render && render()}</dt>
        {Object.keys(data).map(key => (
          <dd key={key}>{data[key]}</dd>
        ))}
      </div>
    </dl>
  </section>
);

export default EntityAddress;
