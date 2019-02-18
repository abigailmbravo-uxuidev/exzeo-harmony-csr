import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

import {
  Input,
  MultiSelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

export class TransferFilter extends Component {
  render() {
    const { policyNumberList } = this.props;
    return (
        <div className="search-inputs">
          <Field
            name="policyNumber"
            dataTest="policyNumber"
            label="Filter By Policy Number"
            placeholder="Start Typing"
            component={MultiSelectTypeAhead}
            styleName=""
            answers={policyNumberList}
           />
            <Field
            name="state"
            dataTest="state"
            label="Filter By State"
            placeholder="Start Typing"
            component={MultiSelectTypeAhead}
            styleName=""
            answers={[]}
           />
            <Field
            name="product"
            dataTest="product"
            label="Filter By Product"
            placeholder="Start Typing"
            component={MultiSelectTypeAhead}
            styleName=""
            answers={[]}
           />
            <Field
            name="agent"
            dataTest="agent"
            label="Filter By Agent"
            placeholder="Start Typing"
            component={MultiSelectTypeAhead}
            styleName=""
            answers={[]}
           />
          <Button
            baseClass="secondary"
            customClass="multi-input"
            type="button"
            dataTest="clear-fields">Clear Filters
          </Button>
        </div>
    )
  }
}  

export default reduxForm({
  form: 'TransferFilter',
})(TransferFilter);