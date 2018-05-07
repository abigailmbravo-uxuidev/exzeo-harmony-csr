import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';

import TextField from '../../Form/inputs/TextField';
import RadioField from '../../Form/inputs/RadioField';
import SelectField from '../../Form/inputs/SelectField';
import CurrencyField from '../../Form/inputs/CurrencyField';
import {
  getAnswers,
  getQuestionName,
  setCalculate,
  updateCalculatedSinkhole,
  updateDependencies,
  updatepersonalPropertyDependnecies
} from "./index";

const { Currency } = Inputs;
const { validation, format, parse, normalize } = lifecycle;

const Coverage = (props) => {
  return (
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
              format={format.toNumberLocaleString}
              parse={parse.toNumber}
              normalize={props.normalizeDwellingAmount}
              min={props.initialValues.dwellingMin}
              max={props.initialValues.dwellingMax}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              name="otherStructuresAmount"
              label="Other Structures (B)"
              styleName="coverage-b"
              disabled
            />
            <CurrencyField
              validations={['required']}
              label=""
              name="otherStructuresAmountNew"
              styleName="coverage-b"
              disabled
            />
          </div>
          <div className="form-group-double-element">
            <TextField
              label="Other Structures %"
              styleName=""
              name="otherStructures"
              disabled />
            <SelectField
              name="otherStructuresNew"
              answers={getAnswers('otherStructuresAmount', props.questions)}
              component="select"
              label=""
              styleName="coverage-b-percentage"
              onChange={event => updateDependencies(event, 'otherStructuresAmountNew', 'dwellingAmountNew', props)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Personal Property (C)"
              styleName="coverage-c"
              name="personalPropertyAmount"
              disabled
            />
            <CurrencyField
              validations={['required']}
              label=""
              styleName="coverage-c"
              name="personalPropertyAmountNew"
              disabled
            />
          </div>
          <div className="form-group-double-element">
            <TextField
              label="Personal Property %"
              styleName=""
              name="personalProperty"
              disabled
            />
            <SelectField
              name="personalPropertyNew"
              answers={getAnswers('personalPropertyAmount', props.questions)}
              component="select"
              label=""
              styleName="coverage-c-percentage"
              onChange={event => updatepersonalPropertyDependnecies(event, 'personalPropertyAmountNew', 'dwellingAmountNew', props)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Loss of Use (D)"
              styleName=""
              name="lossOfUse"
              disabled
            />

            <CurrencyField
              validations={['required']}
              styleName=""
              label=""
              name="lossOfUseNew"
              disabled
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Personal Liability (E)"
              styleName=""
              name="personalLiability"
              disabled
            />
            <SelectField
              onChange={() => setCalculate(props, false)}
              name="personalLiabilityNew"
              answers={getAnswers('personalLiability', props.questions)}
              component="select"
              label=""
              styleName=""
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Medical Payments (F)"
              styleName=""
              name="medicalPayments"
              disabled
            />
            <CurrencyField
              validations={['required']}
              name="medicalPaymentsNew"
              label=""
              styleName=""
              disabled
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Mold Property"
              styleName=""
              name="moldProperty"
              disabled
            />

            <SelectField
              name="moldPropertyNew"
              answers={getAnswers('moldProperty', props.questions)}
              component="select"
              label=""
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="Mold Liability"
              styleName=""
              name="moldLiability"
              disabled
            />
            <SelectField
              name="moldLiabilityNew"
              answers={getAnswers('moldLiability', props.questions)}
              component="select"
              styleName=""
              label=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <CurrencyField
              label="AOP Deductible"
              styleName=""
              name="allOtherPerils"
              disabled
            />
            <SelectField
              onChange={() => setCalculate(props, false)}
              name="allOtherPerilsNew"
              answers={getAnswers('allOtherPerils', props.questions)}
              component="select"
              styleName=""
              label=""
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField
              label="Hurricane Deductible"
              styleName=""
              name="hurricane"
              disabled
            />
            <SelectField
              label=""
              name="hurricaneNew"
              answers={getAnswers('hurricane', props.questions)}
              component="select"
              styleName=""
              onChange={event => updateDependencies(event, 'calculatedHurricane', 'dwellingAmountNew', props)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Sinkhole Deductible" styleName="" name="sinkholePerilCoverage" disabled />
            <SelectField
              label=""
              name="sinkholePerilCoverageNew"
              component="select"
              styleName=""
              onChange={() => updateCalculatedSinkhole(props)}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: 'No',
                    label: 'No'
                  }, {
                    answer: 'Yes',
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
                answers={[
                  {
                    answer: false,
                    label: 'No'
                  }, {
                    answer: true,
                    label: 'Yes'
                  }
                ]}
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
};

Coverage.propTypes = {};

Coverage.defaultProps = {};

export default Coverage;
