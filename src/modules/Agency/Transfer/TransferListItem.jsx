import React from 'react'

const TransferListItem = ({ policy, clickHandler, isChecked, listClassName }) => {
  return (
    <li className={listClassName} onClick={clickHandler}>
        <span className="checkbox" >
        {isChecked ? <span className="fa fa-check-square" /> : <span className="fa fa-square" /> }    
        </span>
        <span className="policy-number">{policy.policyNumber}</span>
        <span className="company">{policy.companyCode}</span>
        <span className="state">{policy.state}</span>
        <span className="product">{policy.product}</span>
        <span className="property-address">{policy.propertyAddress}</span>
        <span className="primary-policy">{policy.policyHolder1}</span>
        <span className="effective-date">{policy.effectiveDate}</span>
        <span className="terms">{policy.terms}</span>
    </li>
  )
};

export default TransferListItem;
