import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
  Input,
  SelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

const FORM_NAME = 'TransferFilter';
export class TransferFilter extends Component {

  handleFilterChange = (value, previousValues, allValues) => {
    const { policyNumber, state, product, agentCode } = allValues;
    this.props.getPoliciesForAgency({ 
      policyNumber,
      state,
      product,
      agentCode
     });

    return value;
  }

  render() {
    const { policyNumberList, listAnswersAsKey, agentsList, reset } = this.props;
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
          component={SelectTypeAhead}
          styleName=""
          showPlaceholder
          answers={listAnswersAsKey.US_states}
          normalize={this.handleFilterChange}

        />
        <Field
          name="product"
          dataTest="product"
          label="Filter By Product"
          placeholder="Start Typing"
          component={SelectTypeAhead}
          styleName=""
          showPlaceholder
          answers={listAnswersAsKey.Products}
          normalize={this.handleFilterChange}

        />
        <Field
          name="agentCode"
          dataTest="agent"
          label="Filter By Agent"
          placeholder="Start Typing"
          component={SelectTypeAhead}
          styleName=""
          answers={agentsList}
          normalize={this.handleFilterChange}
        />
        <Button
          onClick={reset}
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