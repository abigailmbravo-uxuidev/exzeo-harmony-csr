import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';

import {
  Input,
  MultiSelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

import TransferFilter from './TransferFilter';

export class TransferList extends Component {
  render() {
    const { policies, handleSubmit, toggleTransferModal, checkPolicy, checkAllPolicies, selectedPolicies } = this.props;
    return (
      <Fragment>
        <form id="TransferList" onSubmit={handleSubmit(toggleTransferModal)}>
          <ul className="data-grid">
            <li className="header">
              <span className="checkbox">
                <Field
                  name='selectAll'
                  component="input"
                  type="checkbox"
                  normalize={checkAllPolicies}
                  data-test='selectAll' />
              </span>
              <span className="policy-number">Policy Number</span>
              <span className="company">Company</span>
              <span className="state">State</span>
              <span className="product">Product</span>
              <span className="property-address">Prpoerty Address</span>
              <span className="primary-policy">Primary Policyholder</span>
              <span className="effective-date">Effective Date</span>
              <span className="terms">Terms</span>

            </li>
            {selectedPolicies.map(p => {
              return (
                <li className="data-row">
                  <span className="checkbox">
                    <Field
                      name={p}
                      component="input"
                      type="checkbox"
                      normalize={v => v}
                      data-test={p} />
                  </span>
                  <span className="policy-number">{p}</span>
                  {/* <span className="policy-number">{p.policyNumber}</span>
                  <span className="company">{p.companyCode}</span>
                  <span className="state">{p.state}</span>
                  <span className="product">{p.product}</span>
                  <span className="property-address">{p.propertyAddress}</span>
                  <span className="primary-policy">{p.policyHolder1}</span>
                  <span className="effective-date">{p.effectiveDate}</span>
                  <span className="terms"></span> */}
                </li>
              )
            })
            }
            {policies.map(p => {
              return (
                <li className="data-row">
                  <span className="checkbox">
                    <Field
                      name={p.policyNumber}
                      component="input"
                      type="checkbox"
                      normalize={checkPolicy}
                      data-test={p.policyNumber} />
                  </span>
                  <span className="policy-number">{p.policyNumber}</span>
                  <span className="company">{p.companyCode}</span>
                  <span className="state">{p.state}</span>
                  <span className="product">{p.product}</span>
                  <span className="property-address">{p.propertyAddress}</span>
                  <span className="primary-policy">{p.policyHolder1}</span>
                  <span className="effective-date">{p.effectiveDate}</span>
                  <span className="terms"></span>
                </li>
              )
            })
            }
          </ul>
          <div className="button-wrapper">
            <button type='button' className="btn btn-link"><i className="fa fa-rotate-left" />Clear Selections</button>
            <button type='submit' className="btn btn-link"><i className="fa fa-random" />Stage Selected For Transfer</button>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default reduxForm({
  form: 'TransferList',
})(TransferList);
