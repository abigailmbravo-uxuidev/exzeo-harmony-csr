import React from 'react';

const TrustCommerceHiddenFields = ({ values }) => {
  return (
    <>
      <input type="hidden" name="token" value={values.token} />
      <input type="hidden" name="demo" value={values.demo} />
      <input type="hidden" name="returnurl" value={values.returnUrl} />
      <input type="hidden" name="action" value={values.action} />
    </>
  );
};

export default TrustCommerceHiddenFields;
