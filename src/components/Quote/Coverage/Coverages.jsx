import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, SelectInteger, Currency, Radio } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers, getQuestionName } from '../../../utilities/forms';

const baseYesNoAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const sinkholePerilCoverageAnswers = questions => (
  [
    { answer: false, label: 'Coverage Excluded' },
    { answer: true, label: `10% of ${getQuestionName('dwellingAmount', questions)}` }
  ]
);

const Coverages = ({
  sectionId, sectionClass, questions,
  normalizeDwellingAmount,
  normalizeDwellingDependencies,
  normalizePersonalPropertyPercentage,
  normalizeSinkholeAmount,
  sinkholePerilCoverageValue,
  dwellingMinValue,
  dwellingMaxValue,
  otherStructuresValue,
  personalPropertyValue,
  personalPropertyAmountValue
}) => (
  <section id={sectionId} className={sectionClass}>
    <div className="coverages flex-child">
      <h3>Coverages</h3>
      <Field component="input" type="hidden" data-test="propertyIncidentalOccupanciesMainDwelling" name="propertyIncidentalOccupanciesMainDwelling" />
      <Field component="input" type="hidden" data-test="propertyIncidentalOccupanciesOtherStructures" name="propertyIncidentalOccupanciesOtherStructures" />
      <Field component="input" type="hidden" data-test="liabilityIncidentalOccupancies" name="liabilityIncidentalOccupancies" />
      <div className="flex-parent coverages-row-1">
        <Field
          dataTest="dwellingAmount"
          styleName="flex-child"
          name="dwellingAmount"
          label={`${getQuestionName('dwellingAmount', questions)} ($ ${String(dwellingMinValue).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - $ ${String(dwellingMaxValue).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})`}
          component={Currency}
          validate={[validation.isRequired, validation.isDwellingRange]}
          normalize={normalizeDwellingAmount}
        />
      </div>
      <div className="flex-parent coverages-row-2">
        <Field
          dataTest="otherStructuresAmount"
          name="otherStructuresAmount"
          label={getQuestionName('otherStructuresAmount', questions)}
          component={Currency}
          styleName="flex-child"
          validate={validation.isRequired}
          disabled={otherStructuresValue !== 'other'}
        />
        <Field
          dataTest="otherStructures"
          name="otherStructures"
          label="Percentage"
          component={Select}
          styleName="flex-child"
          answers={getAnswers('otherStructuresAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizeDwellingDependencies(v, pv, av, 'otherStructuresAmount')}
        />
      </div>
      <div className="flex-parent coverages-row-3">
        <Field
          dataTest="personalPropertyAmount"
          styleName="flex-child"
          name="personalPropertyAmount"
          label={getQuestionName('personalPropertyAmount', questions)}
          component={Currency}
          validate={validation.isRequired}
          disabled={personalPropertyValue !== 'other'}
        />
        <Field
          dataTest="personalProperty"
          styleName="flex-child"
          name="personalProperty"
          label="Percentage"
          component={Select}
          answers={getAnswers('personalPropertyAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizePersonalPropertyPercentage(v, pv, av, 'personalPropertyAmount')}
        />
      </div>
      <div className="flex-parent coverages-row-4">
        <Field
          dataTest="lossOfUse"
          name="lossOfUse"
          label="Loss of Use Limit"
          styleName="flex-child"
          component={Currency}
          validate={validation.isRequired}
          disabled
        />
      </div>
      <div className="flex-parent coverages-row-5">
        <Field
          dataTest="personalLiability"
          name="personalLiability"
          styleName="flex-child"
          label={getQuestionName('personalLiability', questions)}
          component={SelectInteger}
          answers={getAnswers('personalLiability', questions)}
          validate={validation.isRequired}
        />
      </div>
      <div className="flex-parent coverages-row-6">
        <Field
          dataTest="medicalPayments"
          name="medicalPayments"
          label="Medical Payments to Others Limit"
          styleName="flex-child"
          component={Currency}
          validate={validation.isRequired}
          disabled
        />
      </div>
    </div>
    <div className="other-coverages flex-child">
      <h3>Other Coverages</h3>
      <div className="flex-parent other-coverages-row-1">
        <Field
          dataTest="moldProperty"
          styleName="flex-child"
          name="moldProperty"
          label="Mold Property"
          component={SelectInteger}
          answers={getAnswers('moldProperty', questions)}
          validate={validation.isRequired}
        />
      </div>
      <div className="flex-parent other-coverages-row-2">
        <Field
          dataTest="moldLiability"
          styleName="flex-child"
          name="moldLiability"
          label="Mold Liability Limit"
          component={SelectInteger}
          answers={getAnswers('moldLiability', questions)}
          validate={validation.isRequired}
        />
      </div>
      <div className="flex-parent other-coverages-row-3">
        <Field
          dataTest="personalPropertyReplacementCostCoverage"
          styleName="flex-child"
          name="personalPropertyReplacementCostCoverage"
          label="Personal Property Repl Cost"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
          disabled={parseInt(personalPropertyAmountValue, 10) === 0}
        />
      </div>
      <div className="flex-parent other-coverages-row-4">
        <Field
          dataTest="ordinanceOrLaw"
          styleName="flex-child"
          name="ordinanceOrLaw"
          label="Ordinance or Law Coverage Limit"
          component={SelectInteger}
          answers={getAnswers('ordinanceOrLaw', questions)}
          validate={validation.isRequired}
        />
      </div>
    </div>
    <div className="deductibles flex-child">
      <h3>Deductibles</h3>
      <div className="flex-parent deductibles-row-3">
        <Field
          dataTest="allOtherPerils"
          styleName="flex-child"
          name="allOtherPerils"
          label="All Other Perils"
          component={SelectInteger}
          answers={getAnswers('allOtherPerils', questions)}
          validate={validation.isRequired}
        />
      </div>
      <div className="flex-parent deductibles-row-1">
        <Field
          dataTest="hurricane"
          name="hurricane"
          label="Hurricane Deductible"
          styleName="flex-child"
          component={SelectInteger}
          answers={getAnswers('hurricane', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizeDwellingDependencies(v, pv, av, 'calculatedHurricane')}
          showInitial
        />
      </div>
      <div className="flex-parent deductibles-row-2">
        <Field
          dataTest="calculatedHurricane"
          name="calculatedHurricane"
          label="Calculated Hurricane"
          component={Currency}
          styleName="flex-child"
          disabled
        />
      </div>
      <div className="flex-parent deductibles-row-4">
        <Field
          dataTest="sinkholePerilCoverage"
          name="sinkholePerilCoverage"
          label="Sinkhole"
          styleName="flex-child"
          component={Select}
          answers={sinkholePerilCoverageAnswers(questions)}
          normalize={normalizeSinkholeAmount}
        />
      </div>
      { String(sinkholePerilCoverageValue) === 'true' && <div className="flex-parent">
        <Field
          dataTest="calculatedSinkhole"
          name="calculatedSinkhole"
          label="Calculated Sinkhole"
          component={Currency}
          styleName="flex-child"
          disabled
        />
        </div>
      }
    </div>
    <div className="discounts flex-child">
      <h3>Discounts</h3>
      <div className="flex-parent discounts-row-1">
        <Field
          dataTest="burglarAlarm"
          styleName="flex-child"
          name="burglarAlarm"
          label="Burglar Alarm"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
        />
      </div>
      <div className="flex-parent discounts-row-2">
        <Field
          dataTest="fireAlarm"
          styleName="flex-child"
          name="fireAlarm"
          label="Fire Alarm"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
        />
      </div>
      <div className="flex-parent discounts-row-3">
        <Field
          dataTest="sprinkler"
          styleName="flex-child"
          name="sprinkler"
          label="Sprinkler"
          component={Radio}
          segmented
          answers={getAnswers('sprinkler', questions)}
        />
      </div>
    </div>
  </section>
);

Coverages.propTypes = {
  questions: PropTypes.object.isRequired,
  normalizeDwellingAmount: PropTypes.func.isRequired,
  normalizeDwellingDependencies: PropTypes.func.isRequired,
  normalizePersonalPropertyPercentage: PropTypes.func.isRequired,
  normalizeSinkholeAmount: PropTypes.func.isRequired
};

export default Coverages;
