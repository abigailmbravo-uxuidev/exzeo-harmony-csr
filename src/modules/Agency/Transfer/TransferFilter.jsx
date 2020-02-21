import React, { Component } from 'react';

import {
  Input,
  SelectTypeAhead,
  Button,
  Field,
  Form,
  noop
} from '@exzeo/core-ui';

import TransferWatcher from './TransferWatcher';

const FORM_NAME = 'TransferFilter';
export class TransferFilter extends Component {
  render() {
    const {
      policyNumberList,
      listAnswersAsKey,
      agentsList,
      getPoliciesForAgency,
      agencyCode
    } = this.props;
    return (
      <Form onSubmit={noop} subscription={{ submitting: true }}>
        {({ form }) => (
          <React.Fragment>
            <form id={FORM_NAME} className="search-inputs">
              <Field
                name="policyNumber"
                dataTest="policyNumber"
                label="Filter By Policy Number"
                component={Input}
                styleName=""
                answers={policyNumberList}
              />
              <Field
                name="state"
                dataTest="state"
                label="Filter By State"
                component={SelectTypeAhead}
                styleName=""
                showPlaceholder
                answers={listAnswersAsKey.US_states}
              />
              <Field
                name="product"
                dataTest="product"
                label="Filter By Product"
                component={SelectTypeAhead}
                styleName=""
                showPlaceholder
                answers={listAnswersAsKey.Products}
              />
              <Field
                name="agentCode"
                dataTest="agentCode"
                label="Filter By Agent"
                component={SelectTypeAhead}
                styleName=""
                answers={agentsList}
              />
              <Button
                className={Button.constants.classNames.secondary}
                size={Button.constants.sizes.small}
                customClass="multi-input"
                onClick={form.reset}
                dataTest="clear-fields"
              >
                Clear Filters
              </Button>
            </form>
            <TransferWatcher
              getPoliciesForAgency={getPoliciesForAgency}
              agencyCode={agencyCode}
            />
          </React.Fragment>
        )}
      </Form>
    );
  }
}

export default TransferFilter;
