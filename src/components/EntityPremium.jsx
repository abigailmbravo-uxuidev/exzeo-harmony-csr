import React from 'react';

export const EntityPremium = ({
  className,
  currentPremium
}) => (
  <section data-test="premium" className={className}>
    <dl>
      <div>
        <dt>Current Premium</dt>
        <dd>$ {currentPremium}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPremium;
