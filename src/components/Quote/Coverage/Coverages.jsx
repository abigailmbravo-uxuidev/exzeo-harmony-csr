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
  initialValues,
  normalizeDwellingAmount,
  normalizeDwellingDependencies,
  normalizePersonalPropertyPercentage,
  normalizeSinkholeAmount
}) => (
  <section id={sectionId} className={sectionClass}>
    <div className="coverages flex-child">
      <h3>Coverages</h3>
      <div className="flex-parent coverages-row-1">
        <Field
          styleName="flex-child"
          name="dwellingAmount"
          label={`${getQuestionName('dwellingAmount', questions)} ($ ${String(initialValues.dwellingMin).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - $ ${String(initialValues.dwellingMax).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})`}
          component={Currency}
          validate={[validation.isRequired, validation.isDwellingRange]}
          normalize={normalizeDwellingAmount}
        />
      </div>
      <div className="flex-parent coverages-row-2">
        <Field
          name="otherStructuresAmount"
          label={getQuestionName('otherStructuresAmount', questions)}
          component={Currency}
          styleName="flex-child"
          validate={validation.isRequired}
          disabled={initialValues.otherStructures !== 'other'}
        />
        <Field
          name="otherStructures"
          label="Percentage"
          component={SelectInteger}
          styleName="flex-child"
          answers={getAnswers('otherStructuresAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizeDwellingDependencies(v, pv, av, 'otherStructuresAmount')}
        />
      </div>
      <div className="flex-parent coverages-row-3">
        <Field
          styleName="flex-child"
          name="personalPropertyAmount"
          label={getQuestionName('personalPropertyAmount', questions)}
          component={Currency}
          validate={validation.isRequired}
          disabled={initialValues.personalProperty !== 'other'}
        />
        <Field
          styleName="flex-child"
          name="personalProperty"
          label="Percentage"
          component={SelectInteger}
          answers={getAnswers('personalPropertyAmount', questions)}
          validate={validation.isRequired}
          normalize={(v, pv, av) => normalizePersonalPropertyPercentage(v, pv, av, 'personalPropertyAmount')}
        />
      </div>
      <div className="flex-parent coverages-row-4">
        <Field
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
          styleName="flex-child"
          name="personalPropertyReplacementCostCoverage"
          label="Personal Property Repl Cost"
          component={Radio}
          answers={baseYesNoAnswers}
          segmented
          disabled={parseInt(initialValues.personalPropertyAmount, 10) === 0}
        />
      </div>
      <div className="flex-parent other-coverages-row-4">
        <Field
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
          name="calculatedHurricane"
          label="Calculated Hurricane"
          component={Currency}
          styleName="flex-child"
          disabled
        />
      </div>
      <div className="flex-parent deductibles-row-4">
        <Field
          name="sinkholePerilCoverage"
          label="Sinkhole"
          styleName="flex-child"
          component={Select}
          answers={sinkholePerilCoverageAnswers(questions)}
          normalize={normalizeSinkholeAmount}
        />
      </div>
      { String(initialValues.sinkholePerilCoverage) === 'true' && <div className="flex-parent">
        <Field
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
  initialValues: PropTypes.object.isRequired,
  questions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  normalizeDwellingAmount: PropTypes.func.isRequired,
  normalizeDwellingDependencies: PropTypes.func.isRequired,
  normalizePersonalPropertyPercentage: PropTypes.func.isRequired,
  normalizeSinkholeAmount: PropTypes.func.isRequired
};

export default Coverages;
