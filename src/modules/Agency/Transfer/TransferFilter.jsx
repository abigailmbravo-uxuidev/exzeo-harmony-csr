import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import {
  Input,
  SelectTypeAhead,
  Button,
} from '@exzeo/core-ui';

import { getPoliciesForAgency } from '../../../state/actions/policy.actions';

const FORM_NAME = 'TransferFilter';
export class TransferFilter extends Component {

  handleFilterChange = () => {
    const { formValues } = this.props;
    console.log(formValues)
   // this.props.getPoliciesForAgency(...formValues);
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
            component={SelectTypeAhead}
            styleName=""
            answers={policyNumberList}
            onChange={this.handleFilterChange}
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
            name="agentCode"
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
        </form>
    )
  }
}  

const selector = formValueSelector(FORM_NAME);
const mapStateToProps = (state) => ({
  formValues:  selector(state, 'policyNumber', 'agentCode', 'product', 'state')
});

export default connect(mapStateToProps, {
  getPoliciesForAgency
})(reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(TransferFilter));