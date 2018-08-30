import React from 'react';

export const EntityPolicyHolder = ({
  className,
  policyHolder: { firstName, lastName, primaryPhoneNumber }
}) => (
  <section dataTest="entityPolicyHolder" className={className}>
    <dl>
      <div>
        <dt>Policyholder</dt>
        <dd>{`${firstName} ${lastName}`}</dd>
        <dd>{primaryPhoneNumber}</dd>
      </div>
    </dl>
  </section>
);
export default EntityPolicyHolder;
