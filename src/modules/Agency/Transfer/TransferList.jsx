import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  Input,
  MultiSelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

import TransferFilter from './TransferFilter';
import TransferListItem from './TransferListItem';

const filterPolicy = (policy, selectedArray) => {
  const policyNumber = policy.policyNumber;
  return !selectedArray.includes(s => s.policyNumber === policyNumber)
}

const TRANSFER_LIST_HEADER = {
  policyNumber: 'Policy Number',
  companyCode: 'Company', 
  state: 'State',
  product: 'Product',
  propertyAddress: 'Prpoerty Address',
  policyHolder1: 'Primary Policyholder',
  effectiveDate: 'Effective Date',
  terms: 'Terms'
}

export class TransferList extends Component {
  render() {
    const { policies, filteredPolicies, toggleTransferModal, checkPolicy, uncheckPolicy, checkAllPolicies, selectedPolicies, clearSelectedPolicies } = this.props;
    return (
        <div id="TransferList">
          <ul className="data-grid">
            <TransferListItem 
              listClassName="header"
              policy={TRANSFER_LIST_HEADER}
              clickHandler={checkAllPolicies}
              isChecked={policies.length === selectedPolicies.length} 
             />
            {selectedPolicies.map(p => {
              return (
                <TransferListItem 
                listClassName="data-row"
                policy={p}
                clickHandler={uncheckPolicy(p.policyNumber)}
                isChecked={true} 
               />
              )
            })
            }
            {filteredPolicies.map(p => {
              return (
                <TransferListItem 
                listClassName="data-row"
                policy={p}
                clickHandler={checkPolicy(p.policyNumber)}
                isChecked={false} 
               />
              )
            })
            }
          </ul>
          <div className="button-wrapper">
            <button type='button' onClick={clearSelectedPolicies} className="btn btn-link"><i className="fa fa-rotate-left" />Clear Selections</button>
            <button type='button' disabled={selectedPolicies.length === 0} onClick={toggleTransferModal} className="btn btn-link"><i className="fa fa-random" />Stage Selected For Transfer</button>
          </div>
        </div>
    )
  }
}

export default TransferList;
