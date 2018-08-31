import React from 'react';

export const EntityPremium = ({
  className,
  currentPremium,
  label
}) => (
  <section data-test="premium" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>$ {currentPremium}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPremium;
