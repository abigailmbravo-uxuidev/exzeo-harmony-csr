import React from 'react';
import { Field } from 'redux-form';
import { Currency, Date, validation } from '@exzeo/core-ui';

const ResultsCalculator = props => (
  <div className="endo-results-calc">
    <div className="flex-parent">
      <div className="form-group endorsement-date-wrapper">
        <Field
          name="endorsementDate"
          label="Endorsement Effective Date"
          component={Date}
          validate={[validation.isDate, props.validateEndorsementDate]}
          dataTest="endorsementDateNew"
        />
      </div>
      <Field
        name="newEndorsementAmount"
        label="New End Amount"
        component={Currency}
        disabled
        dataTest="newEndorsementAmount"
      />
      <Field
        name="newEndorsementPremium"
        label="New End Premium"
        component={Currency}
        disabled
        dataTest="newEndorsementPremium"
      />
      <Field
        name="newAnnualPremium"
        label="New Annual Premium"
        component={Currency}
        disabled
        dataTest="newAnnualPremium"
      />

      {props.children}
    </div>
  </div>
);

ResultsCalculator.propTypes = {};

ResultsCalculator.defaultProps = {};

export default ResultsCalculator;
