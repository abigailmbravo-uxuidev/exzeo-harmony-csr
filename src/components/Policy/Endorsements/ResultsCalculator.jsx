import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const { Currency, Date } = Inputs;

const ResultsCalculator = props => (
  <div className="endo-results-calc">
    <div className="flex-parent">
      <div className="form-group endorsement-date-wrapper">
        <Field
          name="endorsementDate"
          label="Endorsement Effective Date"
          component={Date}
          validate={[validation.isDate, (value) => validation.isDateRange(value, props.min, props.max)]}
          onChange={props.setCalculate}
        />
      </div>
      <Field
        name="newEndorsementAmount"
        label="New End Amount"
        component={Currency}
        disabled
      />
      <Field
        name="newEndorsementPremium"
        label="New End Premium"
        component={Currency}
        disabled
      />
      <Field
        name="newAnnualPremium"
        label="New Annual Premium"
        component={Currency}
        disabled
      />

      {props.children}
    </div>
  </div>
);

ResultsCalculator.propTypes = {};

ResultsCalculator.defaultProps = {};

export default ResultsCalculator;
