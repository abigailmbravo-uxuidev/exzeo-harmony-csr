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
    const { policies, handleSubmit, toggleTransferModal } = this.props;
    return (
      <Fragment>
              <form id="TransferList" onSubmit={handleSubmit(toggleTransferModal)}>
            <ul>
                    <li> 
                        <span>
                        <Field
                        name='selectAll'
                        component="input"
                        type="checkbox"
                        normalize={value => value}
                        data-test='selectAll' />
                        </span>
                        <span>Policy Number</span>
                        <span>Company</span>
                        <span>State</span>
                        <span>Product</span>
                        <span>Prpoerty Address</span>
                        <span>Primary Policyholder</span>
                        <span>Effective Date</span>
                        <span>Terms</span>

                    </li>
                {policies.map(p => {return (
                    <li>
                        <Field
                        name={p.policyNumber}
                        component="input"
                        type="checkbox"
                        normalize={value => value}
                        data-test={p.policyNumber} />
                        <span>{p.policyNumber}</span>
                        <span>{p.companyCode}</span>
                        <span>{p.state}</span>
                        <span>{p.product}</span>
                        <span>{p.propertyAddress}</span>
                        <span>{p.policyHolder1}</span>
                        <span>{p.effectiveDate}</span>
                        <span></span>
                    </li>
                )})
                }
            </ul>
            <button type='button'>Clear Selections</button>
            <button type='submit'>Stage Selected For Transfer</button>
        </form>
      </Fragment>
    )
  }
}

export default reduxForm({
    form: 'TransferList',
  })(TransferList);
