import React from 'react';
import TransferListItem from './TransferListItem';
import { Button } from '@exzeo/core-ui/src';

const TRANSFER_LIST_HEADER = {
  policyNumber: 'Policy Number',
  companyCode: 'Company',
  state: 'State',
  product: 'Product',
  propertyAddress: 'Property Address',
  policyHolder1: 'Primary Policyholder',
  effectiveDate: 'Effective Date',
  terms: 'Terms'
};

export const TransferList = ({
  policies,
  openModal,
  checkPolicy,
  uncheckPolicy,
  checkAllPolicies,
  selectedPolicies,
  clearSelectedPolicies,
  fadePolicy
}) => {
  return (
    <div id="TransferList">
      <ul className="data-grid">
        <TransferListItem
          listClassName="header"
          dataTest="list_item_header"
          policy={TRANSFER_LIST_HEADER}
          clickHandler={checkAllPolicies}
          isChecked={policies.length === selectedPolicies.length}
        />
        {selectedPolicies.map(p => {
          return (
            <TransferListItem
              key={`${p.policyNumber}`}
              dataTest={`${p.policyNumber}_selected`}
              listClassName={
                fadePolicy === p.policyNumber ? 'data-row fade-out' : 'data-row'
              }
              policy={p}
              clickHandler={e => uncheckPolicy(p.policyNumber, e)}
              isChecked={true}
            />
          );
        })}
        {policies
          .filter(
            p => !selectedPolicies.some(s => s.policyNumber === p.policyNumber)
          )
          .map(p => {
            return (
              <TransferListItem
                key={`${p.policyNumber}`}
                dataTest={`${p.policyNumber}_filtered`}
                listClassName={
                  fadePolicy === p.policyNumber
                    ? 'data-row fade-out'
                    : 'data-row'
                }
                policy={p}
                clickHandler={e => checkPolicy(p.policyNumber, e)}
                isChecked={false}
              />
            );
          })}
      </ul>
      <div className="button-wrapper">
        <Button
          dataTest="clear-selection"
          type="button"
          onClick={clearSelectedPolicies}
          className={Button.constants.classNames.link}
        >
          <i className="fa fa-rotate-left" />
          Clear Selections
        </Button>
        <Button
          dataTest="stage-transfer"
          type="button"
          disabled={selectedPolicies.length === 0}
          onClick={openModal}
          className={Button.constants.classNames.link}
        >
          <i className="fa fa-random" />
          Stage Selected For Transfer
        </Button>
      </div>
    </div>
  );
};

export default TransferList;
