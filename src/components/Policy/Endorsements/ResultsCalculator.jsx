import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import moment from 'moment-timezone';
import DateField from '../../Form/inputs/DateField';

const { Currency } = Inputs;

const ResultsCalculator = props => (
  <div className="endo-results-calc">
    <div className="flex-parent">
      <div className="form-group">
        <DateField
          validations={['date']}
          label="Endorsement Effective Date"
          name="endorsementDate"
          min={moment.utc(props.min).format('YYYY-MM-DD')}
          max={moment.utc(props.max).format('YYYY-MM-DD')}
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
