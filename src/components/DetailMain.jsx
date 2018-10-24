import React from 'react';

const DetailMain = ({
  children,
  className,
  data,
  dataTest
}) => (
  <section data-test={dataTest} className={className}>
    <dl>
      <div>
        {Object.keys(data).map(key => (
          <dd key={key}>{data[key]}</dd>
        ))}
        {children}
      </div>
    </dl>
  </section>
);

export default DetailMain;
