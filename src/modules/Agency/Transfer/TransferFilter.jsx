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

  resetFilter = async () => {
    const { reset } = this.props;
    await this.props.getPoliciesForAgency({});
    reset();
  }

  render() {
    const { policyNumberList, listAnswersAsKey, agentsList, reset } = this.props;
    return (
      <form id={FORM_NAME} className="search-inputs">
        <Field
          name="policyNumber"
          dataTest="policyNumber"
          label="Filter By Policy Number"
          component={Input}
          styleName=""
          answers={policyNumberList}
          normalize={this.handleFilterChange}
        />
        <Field
          name="state"
          dataTest="state"
          label="Filter By State"
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
          component={SelectTypeAhead}
          styleName=""
          showPlaceholder
          answers={listAnswersAsKey.Products}
          normalize={this.handleFilterChange}

        />
        <Field
          name="agentCode"
          dataTest="agentCode"
          label="Filter By Agent"
          component={SelectTypeAhead}
          styleName=""
          answers={agentsList}
          normalize={this.handleFilterChange}
        />
        <Button
          onClick={this.resetFilter}
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
  form: FORM_NAME,
  enableReinitialize: true
})(TransferFilter);