import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import GroupedInputs from '@exzeo/core-ui/lib/InputGrouped';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import formUtils from '../../../utilities/forms';

const {
  Currency, SelectInteger, Select, Radio
} = GroupedInputs;
const { validation } = lifecycle;

const baseYesNoAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const sinkholePerilCoverageAnswers = questions => (
  [
    { answer: false, label: 'Coverage Excluded' },
    { answer: true, label: `10% of ${formUtils.getQuestionName('dwellingAmount', questions)}` }
  ]
);

const noPriorInsuranceSurchargeAnswers = [
  { answer: 'No', label: 'No' },
  { answer: 'Yes', label: 'Yes' }
];

const sprinklerAnswers = [
  { answer: 'N', label: 'No' },
  { answer: 'A', label: 'A' },
  { answer: 'B', label: 'B' }
];

const Coverage = ({
  initialValues,
  normalizeDwellingDependencies,
  normalizeDwellingAmount,
  normalizePersonalPropertyDependencies,
  normalizeIncidentalOccupancies,
  personalPropertyNewVal,
  questions,
  underwritingQuestions
}) => (
  <section name="coverage" id="coverage">
    <h3>Coverage</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col-2">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <Field
          name="coverageLimits.dwelling.amount"
          label={`Dwelling (A) ($ ${String(initialValues.dwellingMin).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - $ ${String(initialValues.dwellingMax).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})`}
          component={Currency}
          validate={[validation.isRequired, validation.isDwellingRange]}
          normalize={normalizeDwellingAmount}
        />
        <Field
          name="coverageLimits.otherStructures.amount"
          label="Other Structures (B)"
          component={Currency}
          styleName="coverage-b"
          validate={validation.isRequired}
          disabled
        />
        <Field
          name="coverageLimits.otherStructures.percentage"
          label="Other Structures %"
          component={SelectInteger}
          styleName="coverage-b-percentage"
          answers={formUtils.getAnswers('otherStructuresAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizeDwellingDependencies(v, av, 'coverageLimits.otherStructures.amount')}
        />
        <Field
          name="coverageLimits.personalProperty.amount"
          label="Personal Property (C)"
          component={Currency}
          styleName="coverage-c"
          validate={validation.isRequired}
          disabled
        />
        <Field
          name="coverageLimits.personalProperty.percentage"
          label="Personal Property %"
          component={SelectInteger}
          styleName="coverage-c-percentage"
          answers={formUtils.getAnswers('personalPropertyAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizePersonalPropertyDependencies(v, av, 'coverageLimits.personalProperty.amount')}
          showInitial
        />
        <Field
          name="coverageLimits.lossOfUse.amount"
          label="Loss of Use (D)"
          component={Currency}
          validate={validation.isRequired}
          disabled
        />
        <Field
          name="coverageLimits.personalLiability.amount"
          label="Personal Liability (E)"
          component={SelectInteger}
          answers={formUtils.getAnswers('personalLiability', questions)}
          validate={validation.isRequired}
        />
        <Field
          name="coverageLimits.medicalPayments.amount"
          label="Medical Payments (F)"
          component={Currency}
          validate={validation.isRequired}
          disabled
          showInitial
        />
        <Field
          name="coverageLimits.moldProperty.amount"
          label="Mold Property"
          component={SelectInteger}
          answers={formUtils.getAnswers('moldProperty', questions)}
          validate={validation.isRequired}
        />
        <Field
          name="coverageLimits.moldLiability.amount"
          label="Mold Liability"
          component={SelectInteger}
          answers={formUtils.getAnswers('moldLiability', questions)}
          validate={validation.isRequired}
        />
        <Field
          name="deductibles.allOtherPerils.amount"
          label="AOP Deductible"
          component={SelectInteger}
          answers={formUtils.getAnswers('allOtherPerils', questions)}
          validate={validation.isRequired}
        />
        <Field
          name="deductibles.hurricane.amount"
          label="Hurricane Deductible"
          component={SelectInteger}
          answers={formUtils.getAnswers('hurricane', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizeDwellingDependencies(v, av, 'deductibles.hurricane.calculatedAmount')}
          showInitial
        />
        <Field
          name="coverageOptions.sinkholePerilCoverage.answer"
          label="Sinkhole Deductible"
          component={Select}
          answers={sinkholePerilCoverageAnswers(questions)}
          showInitial
        />
      </div>
      {/* Col2 */}
      <div className="flex-child col-2">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <Field
          name="coverageOptions.personalPropertyReplacementCost.answer"
          label="Personal Property Repl Cost"
          component={Radio}
          answers={baseYesNoAnswers}
          styleName="billPlan"
          segmented
          disabled={personalPropertyNewVal === 0}
        />
        <Field
          name="coverageLimits.ordinanceOrLaw.amount"
          label="Ordinance or Law"
          answers={formUtils.getAnswers('ordinanceOrLaw', questions)}
          component={SelectInteger}
          validate={validation.isRequired}
        />
        <Field
          name="coverageOptions.propertyIncidentalOccupanciesMainDwelling.answer"
          label="Incidental Occ Main"
          component={Radio}
          answers={baseYesNoAnswers}
          normalize={normalizeIncidentalOccupancies}
          styleName="billPlan"
          segmented
        />
        <Field
          name="coverageOptions.propertyIncidentalOccupanciesOtherStructures.answer"
          label="Incidental Occ Other"
          component={Radio}
          answers={baseYesNoAnswers}
          normalize={normalizeIncidentalOccupancies}
          styleName="billPlan"
          segmented
        />
        <Field
          name="coverageOptions.liabilityIncidentalOccupancies.answer"
          label="Incidental Occ Liability"
          component={Radio}
          answers={baseYesNoAnswers}
          styleName="billPlan"
          segmented
          disabled
        />
        <Field
          name="property.townhouseRowhouse"
          label="Townhouse / Rowhouse"
          component={Radio}
          segmented
          answers={baseYesNoAnswers}
        />
        <Field
          name="underwritingAnswers.rented.answer"
          label="Property Ever Rented"
          component={Select}
          answers={formUtils.getAnswers('rented', underwritingQuestions)}
        />
        <Field
          name="underwritingAnswers.monthsOccupied.answer"
          label="Months Occupied"
          component={Select}
          answers={formUtils.getAnswers('monthsOccupied', underwritingQuestions)}
        />
        <Field
          name="underwritingAnswers.noPriorInsuranceSurcharge.answer"
          label="No Prior Insurance"
          component={Radio}
          answers={noPriorInsuranceSurchargeAnswers}
          segmented
        />
        <Field
          name="property.burglarAlarm"
          label="Burglar Alarm"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
        />
        <Field
          name="property.fireAlarm"

          label="Fire Alarm"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
        />
        <Field
          name="property.sprinkler"
          label="Sprinkler"
          component={Radio}
          segmented
          answers={sprinklerAnswers}
        />
      </div>
    </div>
  </section>

);

Coverage.propTypes = {
  initialValues: PropTypes.object,
  normalizeDwellingDependencies: PropTypes.func,
  normalizeDwellingAmount: PropTypes.func,
  normalizePersonalPropertyDependencies: PropTypes.func,
  personalPropertyNewVal: PropTypes.number,
  questions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  underwritingQuestions: PropTypes.array
};

Coverage.defaultProps = {};

export default Coverage;
