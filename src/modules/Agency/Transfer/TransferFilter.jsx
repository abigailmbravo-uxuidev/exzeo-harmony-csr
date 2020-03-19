import React from 'react';

import {
  Input,
  SelectTypeAhead,
  Button,
  Field,
  Form,
  noop
} from '@exzeo/core-ui';

import TransferWatcher from './TransferWatcher';
import { companyAnswers } from '../../Search/constants';

export const TransferFilter = ({
  policyNumberList,
  listAnswersAsKey,
  agentsList,
  getPoliciesForAgency,
  agencyCode,
  refresh
}) => {
  return (
    <Form onSubmit={noop} subscription={{ submitting: true }}>
      {({ form }) => (
        <React.Fragment>
          <form id="TransferFilter" className="search-inputs">
            <Field
              name="policyNumber"
              dataTest="policyNumber"
              label="Filter By Policy Number"
              component={Input}
              styleName=""
              answers={policyNumberList}
            />
            <Field
              name="companyCode"
              dataTest="companyCode"
              label="Filter By Company"
              component={SelectTypeAhead}
              styleName=""
              showPlaceholder
              answers={companyAnswers}
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
            refresh={refresh}
          />
        </React.Fragment>
      )}
    </Form>
  );
};

export default TransferFilter;
