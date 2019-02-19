import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';

import {
  Input,
  SelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

export class TransferFilter extends Component {
  render() {
    const { policyNumberList, listAnswersAsKey, agentsList } = this.props;
    return (
        <div className="search-inputs">
          <Field
            name="policyNumber"
            dataTest="policyNumber"
            label="Filter By Policy Number"
            placeholder="Start Typing"
            component={SelectTypeAhead}
            styleName=""
            answers={policyNumberList}
           />
            <Field
            name="state"
            dataTest="state"
            label="Filter By State"
            placeholder="Start Typing"
            component={SelectTypeAhead}
            styleName=""
            answers={listAnswersAsKey.US_states}
           />
            <Field
            name="product"
            dataTest="product"
            label="Filter By Product"
            placeholder="Start Typing"
            component={SelectTypeAhead}
            styleName=""
            answers={listAnswersAsKey.Products}
           />
            <Field
            name="agent"
            dataTest="agent"
            label="Filter By Agent"
            placeholder="Start Typing"
            component={SelectTypeAhead}
            styleName=""
            answers={agentsList}
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