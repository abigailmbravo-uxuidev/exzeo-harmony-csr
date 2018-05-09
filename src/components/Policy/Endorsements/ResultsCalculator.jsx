import React from 'react';
import moment from 'moment-timezone';
import DateField from '../../Form/inputs/DateField';
import DisplayField from '../../Form/inputs/DisplayField';

const ResultsCalculator = props => (
  <div className="endo-results-calc">
    <div className="flex-parent">
      <div className="form-group">
        <DateField
          validations={['date']}
          label="Endorsement Effective Date"
          name="endorsementDateNew"
          min={moment.utc(props.min).format('YYYY-MM-DD')}
          max={moment.utc(props.max).format('YYYY-MM-DD')}
          onChange={props.setCalculate}
        />
      </div>
      <DisplayField label="New End Amount" name="newEndorsementAmount" />

      <DisplayField label="New End Premium" name="newEndorsementPremium" />

      <DisplayField label="New Annual Premium" name="newAnnualPremium" />

      {props.children}
    </div>
  </div>
);

ResultsCalculator.propTypes = {};

ResultsCalculator.defaultProps = {};

export default ResultsCalculator;
