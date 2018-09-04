import React from 'react';

export const EntityPolicyHolder = ({
  className,
  label,
  policyHolder: { displayName, primaryPhoneNumber }
}) => (
  <section data-test="policyHolderDetails" className={className}>
    <dl>
      <div>
        <dt>{label}</dt>
        <dd>{displayName}</dd>
        <dd>{primaryPhoneNumber}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPolicyHolder;
