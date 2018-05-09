import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

import {
  getAnswers,
  getQuestionName
} from './index';

const { Currency, Input, Select, Radio } = Inputs;
const { validation, format, parse } = lifecycle;

const baseYesNoAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const Coverage = props => (
  <section name="coverage" id="coverage">
    <h3>Coverage</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            name="dwellingAmount"
            label={`Dwelling (A) ($ ${String(props.initialValues.dwellingMin).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} - $ ${String(props.initialValues.dwellingMax).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')})`}
            component={Currency}
            disabled
          />
          <Field
            name="dwellingAmountNew"
            component={Currency}
            validate={[validation.isRequired, validation.isDwellingRange]}
            parse={parse.toNumber}
            normalize={props.normalizeDwellingAmount}
            min={props.initialValues.dwellingMin}
            max={props.initialValues.dwellingMax}
            noDecimal
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="otherStructuresAmount"
            label="Other Structures (B)"
            component={Currency}
            styleName="coverage-b"
            disabled
          />
          <Field
            name="otherStructuresAmountNew"
            component={Currency}
            validate={validation.isRequired}
            styleName="coverage-b"
            disabled
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="otherStructures"
            label="Other Structures %"
            component={Input}
            format={format.toPercent}
            disabled
          />
          <Field
            name="otherStructuresNew"
            component={Select}
            answers={getAnswers('otherStructuresAmount', props.questions)}
            parse={parse.toNumber}
            validate={validation.isRequired}
            normalize={(v, pv, av) =>
                props.normalizeDependencies(v, av, 'otherStructuresAmountNew', 'dwellingAmountNew')
              }
            styleName="coverage-b-percentage"
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="personalPropertyAmount"
            label="Personal Property (C)"
            component={Currency}
            styleName="coverage-c"
            disabled
          />
          <Field
            name="personalPropertyAmountNew"
            component={Currency}
            validate={validation.isRequired}
            styleName="coverage-c"
            disabled
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="personalProperty"
            label="Personal Property %"
            component={Input}
            format={format.toPercent}
            disabled
          />
          <Field
            name="personalPropertyNew"
            component={Select}
            answers={getAnswers('personalPropertyAmount', props.questions)}
            parse={parse.toNumber}
            validate={validation.isRequired}
            normalize={(v, pv, av) =>
                props.normalizePersonalPropertyDependencies(v, av, 'personalPropertyAmountNew', 'dwellingAmountNew')
              }
            styleName="coverage-c-percentage"
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="lossOfUse"
            label="Loss of Use (D)"
            component={Currency}
            disabled
          />
          <Field
            name="lossOfUseNew"
            component={Currency}
            validate={validation.isRequired}
            disabled
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="personalLiability"
            label="Personal Liability (E)"
            component={Currency}
            disabled
          />
          <Field
            name="personalLiabilityNew"
            component={Select}
            answers={getAnswers('personalLiability', props.questions)}
            parse={parse.toNumber}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="medicalPayments"
            label="Medical Payments (F)"
            component={Currency}
            disabled
          />
          <Field
            name="medicalPaymentsNew"
            component={Currency}
            validate={validation.isRequired}
            disabled
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="moldProperty"
            label="Mold Property"
            component={Currency}
            disabled
          />

          <Field
            name="moldPropertyNew"
            component={Select}
            answers={getAnswers('moldProperty', props.questions)}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="moldLiability"
            label="Mold Liability"
            component={Currency}
            disabled
          />
          <Field
            name="moldLiabilityNew"
            component={Select}
            answers={getAnswers('moldLiability', props.questions)}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="allOtherPerils"
            label="AOP Deductible"
            component={Currency}
            disabled
          />
          <Field
            name="allOtherPerilsNew"
            component={Select}
            answers={getAnswers('allOtherPerils', props.questions)}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="hurricane"
            label="Hurricane Deductible"
            component={Input}
            format={format.toPercent}
            disabled
          />
          <Field
            name="hurricaneNew"
            component={Select}
            answers={getAnswers('hurricane', props.questions)}
            validate={validation.isRequired}
            normalize={(v, pv, av) =>
                props.normalizeDependencies(v, av, 'calculatedHurricane', 'dwellingAmountNew')
              }
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="sinkholePerilCoverage"
            label="Sinkhole Deductible"
            component={Input}
            disabled
          />
          <Field
            name="sinkholePerilCoverageNew"
            component={Select}
            answers={[
                { answer: false, label: 'Coverage Excluded' },
                { answer: true, label: `10% of ${getQuestionName('dwellingAmount', props.questions)}` }
              ]}
          />
        </div>
      </div>


      {/* Col2 */}


      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            name="personalPropertyReplacementCostCoverage"
            label="Personal Property Repl Cost"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <Field
              name="personalPropertyReplacementCostCoverageNew"
              component={Radio}
              answers={baseYesNoAnswers}
              styleName="billPlan"
              segmented
              disabled={props.personalPropertyNewVal === 0}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="ordinanceOrLaw"
            label="Ordinance or Law"
            component={Input}
            format={format.toPercent}
            disabled
          />
          <Field
            name="ordinanceOrLawNew"
            answers={getAnswers('ordinanceOrLaw', props.questions)}
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="propertyIncidentalOccupanciesMainDwelling"
            label="Incidental Occ Main"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <Field
              name="propertyIncidentalOccupanciesMainDwellingNew"
              component={Radio}
              answers={baseYesNoAnswers}
              styleName="billPlan"
              segmented
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="propertyIncidentalOccupanciesOtherStructures"
            label="Incidental Occ Other"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <Field
              name="propertyIncidentalOccupanciesOtherStructuresNew"
              component={Radio}
              answers={baseYesNoAnswers}
              styleName="billPlan"
              segmented
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="liabilityIncidentalOccupancies"
            label="Incidental Occ Liability"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <Field
              name="liabilityIncidentalOccupanciesNew"
              component={Radio}
              answers={baseYesNoAnswers}
              styleName="billPlan"
              segmented
              disabled
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="townhouseRowhouse"
            label="Townhouse / Rowhouse"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child">
            <Field
              name="townhouseRowhouseNew"
              component={Radio}
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="rented"
            label="Property Ever Rented"
            component={Input}
            disabled
          />
          <Field
            name="rentedNew"
            component={Select}
            answers={getAnswers('rented', props.underwritingQuestions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="monthsOccupied"
            label="Months Occupied"
            component={Input}
            disabled
          />
          <Field
            name="monthsOccupiedNew"
            component={Select}
            answers={getAnswers('monthsOccupied', props.underwritingQuestions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="noPriorInsurance"
            label="No Prior Insurance"
            component={Input}
            disabled
          />
          <div className="flex-child discounts-burglar-alarm">
            <Field
              name="noPriorInsuranceNew"
              component={Radio}
              answers={[
                  { answer: 'No', label: 'No' },
                  { answer: 'Yes', label: 'Yes' }
                ]}
              segmented
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="burglarAlarm"
            label="Burglar Alarm"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child discounts-burglar-alarm">
            <Field
              name="burglarAlarmNew"
              component={Radio}
              answers={baseYesNoAnswers}
              segmented
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="fireAlarm"
            label="Fire Alarm"
            component={Input}
            format={format.boolToYesNo}
            disabled
          />
          <div className="flex-child discounts-fire-alarm">
            <Field
              name="fireAlarmNew"
              component={Radio}
              answers={baseYesNoAnswers}
              segmented
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            name="sprinkler"
            label="Sprinkler"
            component={Input}
            disabled
          />
          <div className="flex-child discounts-sprinkler">
            <Field
              name="sprinklerNew"
              component={Radio}
              segmented
              answers={[
                  {
                    answer: 'N',
                    label: 'No'
                  }, {
                    answer: 'A',
                    label: 'A'
                  }, {
                    answer: 'B',
                    label: 'B'
                  }
                ]}
            />
          </div>
        </div>
      </div>
    </div>
  </section>

);

Coverage.propTypes = {};

Coverage.defaultProps = {};

export default Coverage;
