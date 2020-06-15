import React from 'react';
import { Redirect } from 'react-router-dom';
import { parse } from 'query-string';

const ReceiptHandler = ({ location }) => {
  const merchantRequest = location.search.replace(/^\?/, '');
  const merchantReceipt = parse(merchantRequest);

  //'customfield1' represents 'policyNumber'
  if (merchantReceipt.customfield1) {
    return (
      <Redirect
        to={{
          pathname: `/policy/${merchantReceipt.customfield1}/billing`,
          state: {
            ...merchantReceipt,
            merchantRequest,
            policyNumber: merchantReceipt.customfield1
          }
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h3>Something went wrong...</h3>
    </div>
  );
};

export default ReceiptHandler;
