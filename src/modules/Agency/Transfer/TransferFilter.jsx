import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
  Input,
  MultiSelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

const FORM_NAME = 'TransferFilter';
export class TransferFilter extends Component {

  handleFilterChange = (value, previousValues, allValues) => {
    const { policyNumber } = allValues;
    console.log(allValues);
    // if(policyNumber){
    // this.props.getPoliciesForAgency({ policyNumber });
    // }
    return value;
  }

  render() {
    const { policyNumberList, listAnswersAsKey, agentsList } = this.props;
    return (
      <form id={FORM_NAME} className="search-inputs">
        <Field
          name="policyNumber"
          dataTest="policyNumber"
          label="Filter By Policy Number"
          placeholder="Start Typing"
          component={Input}
          styleName=""
          answers={policyNumberList}
          normalize={this.handleFilterChange}
        />
        <Field
          name="state"
          dataTest="state"
          label="Filter By State"
          placeholder="Start Typing"
          component={MultiSelectTypeAhead}
          styleName=""
          answers={listAnswersAsKey.US_states}
        />
        <Field
          name="product"
          dataTest="product"
          label="Filter By Product"
          placeholder="Start Typing"
          component={MultiSelectTypeAhead}
          styleName=""
          answers={listAnswersAsKey.Products}
        />
        <Field
          name="agentCode"
          dataTest="agent"
          label="Filter By Agent"
          placeholder="Start Typing"
          component={MultiSelectTypeAhead}
          styleName=""
          answers={agentsList}
        />
        <Button
          baseClass="secondary"
          customClass="multi-input btn-sm"
          type="button"
          dataTest="clear-fields">Clear Filters
          </Button>
      </form>
    )
  }
}

export default reduxForm({
  form: FORM_NAME
})(TransferFilter);