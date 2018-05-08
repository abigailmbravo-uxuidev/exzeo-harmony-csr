import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

import TextField from '../../Form/inputs/TextField';
import RadioField from '../../Form/inputs/RadioField';
import SelectField from '../../Form/inputs/SelectField';
import {
  getAnswers,
  getQuestionName,
  setCalculate
} from './index';

const { Currency, Input, Select } = Inputs;
const {
  validation, format, parse, normalize
} = lifecycle;

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
            styleName="coverage-b"
            validate={validation.isRequired}
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
            styleName="coverage-b-percentage"
            parse={parse.toNumber}
            validate={validation.isRequired}
            normalize={(v, pv, av) =>
                props.normalizeDependencies(v, av, 'otherStructuresAmountNew', 'dwellingAmountNew')
              }
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
            styleName="coverage-c"
            validate={validation.isRequired}
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
            styleName="coverage-c-percentage"
            parse={parse.toNumber}
            validate={validation.isRequired}
            normalize={(v, pv, av) =>
                props.normalizePersonalPropertyDependencies(v, av, 'personalPropertyAmountNew', 'dwellingAmountNew')
              }
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="lossOfUse"
            component={Currency}
            label="Loss of Use (D)"
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
            normalize={props.normalizeSetCalculate}
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
            answers={getAnswers('moldProperty', props.questions)}
            component={Select}
            validate={validation.isRequired}
            normalize={props.normalizeSetCalculate}
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
            normalize={props.normalizeSetCalculate}
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
            normalize={props.normalizeSetCalculate}
          />
        </div>
        <div className="form-group-double-element">
          <TextField
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
                {
                  answer: false,
                  label: 'Coverage Excluded'
                }, {
                  answer: true,
                  label: `10% of ${getQuestionName('dwellingAmount', props.questions)}`
                }
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
          <TextField
            label="Personal Property Repl Cost"
            styleName=""
            name="personalPropertyReplacementCostCoverage"
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <RadioField
              disabled={String(props.fieldValues.personalPropertyNew) === '0'}
              name="personalPropertyReplacementCostCoverageNew"
              styleName="billPlan"
              label=""
              onChange={() => setCalculate(props, false)}
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Ordinance or Law"
            styleName=""
            name="ordinanceOrLaw"
            disabled
          />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="ordinanceOrLawNew"
            answers={getAnswers('ordinanceOrLaw', props.questions)}
            label=""
            component="select"
            styleName=""
            validations={['required']}
          />
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Incidental Occ Main"
            styleName=""
            name="propertyIncidentalOccupanciesMainDwelling"
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <RadioField
              onChange={() => setCalculate(props, false)}
              name="propertyIncidentalOccupanciesMainDwellingNew"
              styleName="billPlan"
              label=""
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Incidental Occ Other"
            styleName=""
            name="propertyIncidentalOccupanciesOtherStructures"
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <RadioField
              onChange={() => setCalculate(props, false)}
              name="propertyIncidentalOccupanciesOtherStructuresNew"
              styleName="billPlan"
              label=""
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Incidental Occ Liability"
            styleName=""
            name="liabilityIncidentalOccupancies"
            disabled
          />
          <div className="flex-child other-coverages-property-replacement-cost">
            <RadioField
              disabled
              onChange={() => setCalculate(props, false)}
              name="liabilityIncidentalOccupanciesNew"
              styleName="billPlan"
              label=""
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Townhouse / Rowhouse"
            styleName=""
            name="townhouseRowhouse"
            disabled
          />
          <div className="flex-child">
            <RadioField
              onChange={() => setCalculate(props, false)}
              name="townhouseRowhouseNew"
              styleName=""
              label=""
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Property Ever Rented"
            styleName=""
            name="rented"
            disabled
          />
          <SelectField
            label=""
            name="rentedNew"
            answers={getAnswers('rented', props.underwritingQuestions)}
            styleName=""
            onChange={() => setCalculate(props, false)}
          />
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Months Occupied"
            styleName=""
            name="monthsOccupied"
            disabled
          />
          <SelectField
            name="monthsOccupiedNew"
            answers={getAnswers('monthsOccupied', props.underwritingQuestions)}
            label=""
            styleName=""
            onChange={() => setCalculate(props, false)}
          />
        </div>
        <div className="form-group-double-element">
          <TextField
            label="No Prior Insurance"
            styleName=""
            name="noPriorInsurance"
            disabled
          />
          <div className="flex-child discounts-burglar-alarm">
            <RadioField
              name="noPriorInsuranceNew"
              styleName=""
              label=""
              onChange={() => setCalculate(props, false)}
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Burglar Alarm"
            styleName=""
            name="burglarAlarm"
            disabled
          />
          <div className="flex-child discounts-burglar-alarm">
            <RadioField
              name="burglarAlarmNew"
              styleName=""
              label=""
              onChange={() => setCalculate(props, false)}
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Fire Alarm"
            styleName=""
            name="fireAlarm"
            disabled
          />
          <div className="flex-child discounts-fire-alarm">
            <RadioField
              name="fireAlarmNew"
              styleName=""
              label=""
              onChange={() => setCalculate(props, false)}
              segmented
              answers={baseYesNoAnswers}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <TextField
            label="Sprinkler"
            styleName=""
            name="sprinkler"
            disabled
          />
          <div className="flex-child discounts-sprinkler">
            <RadioField
              name="sprinklerNew"
              label=""
              styleName=""
              onChange={() => setCalculate(props, false)}
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
