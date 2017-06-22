import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, propTypes, change } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';
import normalizePhone from '../Form/normalizePhone';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import SelectField from '../Form/inputs/SelectField';
import CurrencyField from '../Form/inputs/CurrencyField';

const handleGetQuoteData = (state) => {
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
};

const calculatePercentage = (oldFigure, newFigure) => {
  let percentChange = 0;
  if ((oldFigure !== 0) && (newFigure !== 0)) {
    percentChange = (oldFigure / newFigure) * 100;
  }
  return percentChange;
};

const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);
  const values = {};

  console.log(quoteData, 'state.form');

  // values.agencyCode = '20000'; // _.get(quoteData, 'agencyCode');
  // values.agentCode = '60000'; // _.get(quoteData, 'agentCode');
  // values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');
  // values.dwellingMin = _.get(quoteData, 'coverageLimits.dwelling.minAmount');
  // values.dwellingMax = _.get(quoteData, 'coverageLimits.dwelling.maxAmount');
  // values.liabilityIncidentalOccupancies = false;

  const dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
  const otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
  const personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(quoteData, 'deductibles.hurricane.amount');

// Coverage Top Left
  values.dwellingAmount = _.get(quoteData, 'coverageLimits.dwelling.amount');
  values.otherStructuresAmount = otherStructures;
  values.otherStructures = String(calculatePercentage(otherStructures, dwelling));
  values.personalPropertyAmount = String(personalProperty);
  values.personalProperty = String(calculatePercentage(personalProperty, dwelling));
  // TODO: Additional Living Expenses
  values.lossOfUse = _.get(quoteData, 'coverageLimits.lossOfUse.amount');
  values.personalLiability = _.get(quoteData, 'coverageLimits.personalLiability.amount');
  values.medicalPayments = _.get(quoteData, 'coverageLimits.medicalPayments.amount');
  values.moldProperty = _.get(quoteData, 'coverageLimits.moldProperty.amount');
  values.moldLiability = _.get(quoteData, 'coverageLimits.moldLiability.amount');
  values.allOtherPerils = _.get(quoteData, 'deductibles.allOtherPerils.amount');
  values.hurricane = hurricane;
  values.calculatedHurricane = _.get(quoteData, 'deductibles.hurricane.calculatedAmount');
  values.sinkholePerilCoverage = _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer');

// Coverage Top Right
  values.personalPropertyReplacementCostCoverage = _.get(quoteData, 'coverageOptions.personalPropertyReplacementCost.answer');
  values.ordinanceOrLaw = _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount');
  values.propertyIncidentalOccupanciesMainDwelling = false;
  values.propertyIncidentalOccupanciesOtherStructures = false;
  // TODO: WIND EXCLUDED
  // TODO: PROPERTY EVER RENTED
  // TODO: SEASONALLY OCCUPIED
  // TODO: NO PRIOR INSURANCE
  values.burglarAlarm = _.get(quoteData, 'property.burglarAlarm');
  values.fireAlarm = _.get(quoteData, 'property.fireAlarm');
  values.sprinkler = _.get(quoteData, 'property.sprinkler');
  values.billToType = _.get(quoteData, 'billToType');
  values.billPlan = _.get(quoteData, 'billPlan');

// Coverage Mid Left
  values.roofCovering = _.get(quoteData, 'property.windMitigation.roofCovering');
  values.roofDeckAttachment = _.get(quoteData, 'property.windMitigation.roofDeckAttachment');
  values.roofToWallConnection = _.get(quoteData, 'property.windMitigation.roofToWallConnection');
  values.roofGeometry = _.get(quoteData, 'property.windMitigation.roofGeometry');
  values.secondaryWaterResistance = _.get(quoteData, 'property.windMitigation.secondaryWaterResistance');
  values.openingProtection = _.get(quoteData, 'property.windMitigation.openingProtection');

// Coverage Mid Right
  values.floridaBuildingCodeWindSpeed = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeed');
  values.floridaBuildingCodeWindSpeedDesign = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
  values.terrain = _.get(quoteData, 'property.windMitigation.terrain');
  values.internalPressureDesign = _.get(quoteData, 'property.windMitigation.internalPressureDesign');
  values.windBorneDebrisRegion = _.get(quoteData, 'property.windMitigation.windBorneDebrisRegion');
  // MISSING WIND MIT FACTOR

// Home/Location Bottom Left
  values.yearBuilt = _.get(quoteData, 'property.yearBuilt');
  values.constructionType = _.get(quoteData, 'property.constructionType');
  values.yearOfRoof = _.get(quoteData, 'property.yearOfRoof');
  values.protectionClass = _.get(quoteData, 'property.protectionClass');
  values.buildingCodeEffectivenessGrading = _.get(quoteData, 'property.buildingCodeEffectivenessGrading');
  values.familyUnits = _.get(quoteData, 'property.familyUnits');

// Home/Location Bottom Right
  values.distanceToTidalWater = _.get(quoteData, 'property.distanceToTidalWater');
  values.distanceToFireHydrant = _.get(quoteData, 'property.distanceToFireHydrant');
  values.distanceToFireStation = _.get(quoteData, 'property.distanceToFireStation');
  values.residenceType = _.get(quoteData, 'property.residenceType');
  values.squareFeet = _.get(quoteData, 'property.squareFeet');
  values.floodZone = _.get(quoteData, 'property.floodZone');

// Policyholder 1
  values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
  values.pH1phone = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');
  values.pH1secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[0].secondaryPhoneNumber') || '');

// Policyholder 2
  values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
  values.pH2phone = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
  values.pH2secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '');

// Mailing/Billing
  values.address1 = _.get(quoteData, 'property.physicalAddress.address1');
  values.address2 = _.get(quoteData, 'property.physicalAddress.address2');
  values.city = _.get(quoteData, 'property.physicalAddress.city');
  values.state = _.get(quoteData, 'property.physicalAddress.state');
  values.zip = _.get(quoteData, 'property.physicalAddress.zip');

  return values;
};

const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

// const claims = [
//   {
//     claimNumber: '17-1234567-01',
//     lossDate: '01/01/2000',
//     closedDate: '03/01/2000',
//     examiner: 'William Churchhill',
//     lossDescription: 'Desc: Noticed discoloration on floor.'
//   }, {
//     claimNumber: '17-6789012-01',
//     lossDate: '01/01/2002',
//     closedDate: '02/01/2002',
//     examiner: 'Bob McCann',
//     lossDescription: 'Desc: Noticed discoloration on wall.'
//   }
// ];


export const Endorsements = (props) => {
  const {
    coverageLimits,
    coverageOptions,
    deductibles,
    property,
    rating,
    underwritingAnswers
  } = props.policy;

  const discountSurcharge = [
    {
      discountSurcharge: 'Wind Excluded',
      value: _.get(rating, 'windMitigationDiscount') === 0 ? 'No' : 'Yes'
    }, {
      discountSurcharge: 'Property Ever Rented',
      value: _.get(underwritingAnswers, 'rented.answer')
    }, {
      discountSurcharge: 'Seasonally Occupied',
      value: _.get(underwritingAnswers, 'monthsOccupied.answer')
    }, {
      discountSurcharge: 'No Prior Insurance',
      value: _.get(underwritingAnswers, 'noPriorInsuranceSurcharge.answer')
    }, {
      discountSurcharge: 'Burglar Alarm',
      value: _.get(property, 'burglarAlarm') ? 'Yes' : 'No'
    }, {
      discountSurcharge: 'Fire Alarm',
      value: _.get(property, 'fireAlarm') ? 'Yes' : 'No'
    }, {
      discountSurcharge: 'Sprinkler',
      value: _.get(property, 'sprinkler') === 'N' ? 'No' : 'Yes'
    }, {
      discountSurcharge: 'Wind Mit Factor',
      value: _.get(rating, 'windMitigationDiscount')
    }
  ];

  const coverageLimitsData = [
    {
      coverage: 'Dwelling',
      value: `$ ${_.get(coverageLimits, 'dwelling.amount')}`
    }, {
      coverage: 'Other Structures',
      value: `$ ${_.get(coverageLimits, 'otherStructures.amount')}`
    }, {
      coverage: 'Personal Property',
      value: `$ ${_.get(coverageLimits, 'personalProperty.amount')}`
    }, {
      coverage: 'Additional Living Expenses',
      value: `$ ${_.get(coverageLimits, 'lossOfUse.amount')}`
    }, {
      coverage: 'Personal Liability',
      value: `$ ${_.get(coverageLimits, 'personalLiability.amount')}`
    }, {
      coverage: 'Medical Payments',
      value: `$ ${_.get(coverageLimits, 'medicalPayments.amount')}`
    }
  ];

  const coverageOptionsData = [
    {
      coverage: 'Mold Property Limit',
      value: `$ ${_.get(coverageLimits, 'moldProperty.amount')}`
    }, {
      coverage: 'Mold Liability Limit',
      value: `$ ${_.get(coverageLimits, 'moldLiability.amount')}`
    }, {
      coverage: 'Personal Property Repl Cost',
      value: _.get(coverageOptions, 'personalPropertyReplacementCost.answer') ? 'Yes' : 'No'
    }, {
      coverage: 'Ordinance or Law Coverage',
      value: `${_.get(coverageLimits, 'ordinanceOrLaw.amount')}%`
    }, {
      coverage: 'Incidental Occ Main',
      value: _.get(coverageOptions, 'propertyIncidentalOccupanciesMainDwelling.answer') ? 'Yes' : 'No'
    }, {
      coverage: 'Incidental Occ Other',
      value: _.get(coverageOptions, 'propertyIncidentalOccupanciesOtherStructures.answer') ? 'Yes' : 'No'
    }
  ];

  const premium = [{
    premium: 'Current Premium',
    value: `$ ${_.get(rating, 'totalPremium')}`
  }, {
    premium: 'Initial Premium',
    value: `$ ${_.get(rating, 'netPremium')}`
  }];

  const billing = [
    {
      coverage: 'Balance Due',
      value: `$ ${_.get(rating, 'totalPremium')}`
    }, {
      coverage: 'Next Payment',
      value: `$ ${_.get(rating, 'totalPremium')}`
    }, {
      coverage: 'Bill To',
      value: _.get(props.policy, 'billToType')
    }, {
      coverage: 'Bill Plan',
      value: _.get(props.policy, 'billPlan')
    }
  ];

  const deductibleData = [
    {
      displayText: 'All Other Perils',
      amount: `$ ${_.get(deductibles, 'allOtherPerils.amount')}`
    }, {
      displayText: 'Hurricane',
      amount: `${_.get(deductibles, 'hurricane.amount')}%`
    }, {
      displayText: 'Sinkhole',
      amount: `${_.get(deductibles, 'sinkhole.amount') ? `${_.get(deductibles, 'sinkhole.amount')}%` : 'No'}`
    }
  ];

  const endorsements = [
    { date: '03/30/2017', amount: '-$ 85', type: '???' },
    { date: '02/20/2016', amount: '-$ 20', type: '???' },
    { date: '01/10/2015', amount: '-$ 35', type: '???' }

  ];

  class PrevEndorsements extends React.Component {

    updateDependencies = (event, field, dependency) => {
      const { dispatch, fieldValues } = this.props;
      if (Number.isNaN(event.target.value)) return;

      const dependencyValue = String(fieldValues[dependency]).replace(/\D+/g, '');

      const fieldValue = setPercentageOfValue(Number(dependencyValue), Number(event.target.value));

      dispatch(change('Coverage', field, Number.isNaN(fieldValue) ? '' : String(fieldValue)));
    }

    render() {
      return (
        <BootstrapTable data={endorsements}>
          <TableHeaderColumn dataField="date" isKey>Date</TableHeaderColumn>
          <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
          <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
        </BootstrapTable>
      );
    }
}

  const propertyData = property || {};
  const { fieldValues, handleSubmit, initialValues, pristine, state } = props;
  return (
    <PolicyConnect>
      <ClearErrorConnect />
      <div className="route-content">
        <div className="endorsements">
          <div className="endo-jump-menu">

            <a href="#coverage" className="btn btn-primary btn-xs">Coverage</a>
            <a href="#home" className="btn btn-primary btn-xs">Home / Location</a>
            <a href="#policy" className="btn btn-primary btn-xs">Policyholders</a>
            <a href="#addresses" className="btn btn-primary btn-xs">Addresses</a>
            <a href="#addInt" className="btn btn-primary btn-xs">Additional Interests</a>
            <a className="btn btn-secondary btn-xs">Cancel</a>


          </div>
          <div className="scroll endorsements">
            <div className="form-group survey-wrapper" role="group">

              <a name="coverage" />
              <section>

                <h3>Coverage</h3>

                <div className="flex-parent">
                  {/* Col1 */}
                  <div className="flex-child col3">

                    <div className="form-group labels">
                      <label /><label>Current</label><label>New</label>
                    </div>
                    <div className="form-group">
                      <CurrencyField
                        validations={['required', 'range']} label={'Dwelling Amount (A)'} styleName={''} name={'dwellingAmount'}
                        min={initialValues.dwellingMin} max={initialValues.dwellingMax} disabled
                      />
                      <CurrencyField
                        validations={['required', 'range']} styleName={''} name={'dwellingAmountNew'}
                        min={initialValues.dwellingMin} max={initialValues.dwellingMax}
                      />
                    </div>
                    <div className="form-group">
                      <CurrencyField validations={['required']} name="otherStructuresAmount" label={'Other Structure (B)'} styleName={'coverage-b'} disabled />
                      <CurrencyField validations={['required']} name="otherStructuresAmountNew" styleName={'coverage-b'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Other Structures %'} styleName={''} name={'otherStructures'} disabled />
                      <SelectField
                        name="otherStructuresNew" component="select" styleName={'coverage-b-percentage'} onChange={event => this.updateDependencies(event, 'otherStructuresAmount', 'dwellingAmount')} validations={['required']} answers={[
                          {
                            answer: '0',
                            label: '0%'
                          }, {
                            answer: '2',
                            label: '2%'
                          }, {
                            answer: '5',
                            label: '5%'
                          },
                          {
                            answer: '10',
                            label: '10%'
                          }, {
                            answer: 'other',
                            label: 'Other'
                          }

                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <CurrencyField validations={['required']} label={'Personal Property (C)'} styleName={'coverage-c'} name="personalPropertyAmount" disabled />
                      <CurrencyField validations={['required']} styleName={'coverage-c'} name="personalPropertyAmountNew" />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Personal Property %'} styleName={''} name={'personalProperty'} disabled />
                      <SelectField
                        name="personalPropertyNew" component="select" styleName={'coverage-c-percentage'} onChange={event => this.updateDependencies(event, 'personalPropertyAmount', 'dwellingAmount')} validations={['required']} answers={[
                          {
                            answer: '0',
                            label: '0%'
                          }, {
                            answer: '25',
                            label: '25%'
                          }, {
                            answer: '35',
                            label: '35%'
                          }, {
                            answer: '50',
                            label: '50%'
                          }, {
                            answer: 'other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Additional Living Expenses</label>
                      <input type="numeric" value="25750" disabled />
                      <input type="numeric" value="25750" disabled />
                    </div>
                    <div className="form-group">
                      <CurrencyField label={'Loss of Use (D)'} styleName={''} name={'lossOfUse'} disabled />
                      <CurrencyField styleName={''} name={'lossOfUseNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Personal Liability (E)'} styleName={''} name={'personalLiability'} disabled />
                      <SelectField
                        name="personalLiabilityNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: '100000',
                            label: '$100,000'
                          }, {
                            answer: '300000',
                            label: '$300,000'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Medical Payments (F)'} styleName={''} name={'medicalPayments'} disabled />
                      <TextField
                        name="medicalPaymentsNew" styleName={''} input={{
                          name: 'medicalPaymentsNew',
                          value: '$2,000'
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Mold Property Limit'} styleName={''} name={'moldProperty'} disabled />
                      <SelectField
                        name="moldPropertyNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: '10000',
                            label: '$10,000'
                          }, {
                            answer: '25000',
                            label: '$25,000'
                          }, {
                            answer: '50000',
                            label: '$50,000'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Mold Liability Limit'} styleName={''} name={'moldLiability'} disabled />
                      <SelectField
                        name="moldLiabilityNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: '50000',
                            label: '$50,000'
                          }, {
                            answer: '100000',
                            label: '$100,000'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'AOP Deductible'} styleName={''} name={'allOtherPerils'} disabled />
                      <SelectField
                        name="allOtherPerilsNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: '500',
                            label: '$500'
                          }, {
                            answer: '1000',
                            label: '$1,000'
                          }, {
                            answer: '2500',
                            label: '$2,500'
                          }
                        ]}
                      />                                                                                              </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Hurricane Deductible'} styleName={''} name={'hurricane'} disabled />
                      <SelectField
                        name="hurricaneNew" component="select" styleName={''} onChange={event => this.updateDependencies(event, 'calculatedHurricane', 'dwellingAmount')} validations={['required']} answers={[
                          {
                            answer: '2',
                            label: '2% of Coverage A'
                          }, {
                            answer: '5',
                            label: '5% of Coverage A'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Sinkhole'} styleName={''} name={'sinkholePerilCoverage'} disabled />
                      <SelectField
                        name="sinkholePerilCoverageNew" component="select" styleName={''} onChange={function () {}} answers={[
                          {
                            answer: false,
                            label: 'Coverage Excluded'
                          }, {
                            answer: true,
                            label: 'Coverage Included'
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Personal Property Repl Cost'} styleName={''} name={'personalPropertyReplacementCostCoverage'} disabled />
                      <SelectField
                        name={'personalPropertyReplacementCostCoverageNew'} styleName={'billPlan'} onChange={function () {}} answers={[
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Ordinance or Law Coverage'} styleName={''} name={'ordinanceOrLaw'} disabled />
                      <SelectField
                        name="ordinanceOrLawNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: '25',
                            label: '25% of Coverage A (included)'
                          }, {
                            answer: '50',
                            label: '50% of Coverage A'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Incidental Occ Main'} styleName={''} name={'propertyIncidentalOccupanciesMainDwelling'} disabled />
                      <TextField validations={['required']} styleName={''} name={'propertyIncidentalOccupanciesMainDwellingNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Incidental Occ Other'} styleName={''} name={'propertyIncidentalOccupanciesOtherStructures'} disabled />
                      <TextField validations={['required']} styleName={''} name={'propertyIncidentalOccupanciesOtherStructuresNew'} />
                    </div>
                    <div className="form-group">
                      <label>Wind Excluded</label>
                      <input type="text" value="No" disabled />
                      <select>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Property Ever Rented</label>
                      <input type="text" value="No" disabled />
                      <select>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Seasonally Occupied</label>
                      <input type="text" value="No" disabled />
                      <select>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>No Prior Insurance</label>
                      <input type="text" value="No" disabled />
                      <select>
                        <option>No</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Burglar Alarm'} styleName={''} name={'burglarAlarm'} disabled />
                      <SelectField
                        name={'burglarAlarmNew'} styleName={''} onChange={function () {}} answers={[
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Fire Alarm'} styleName={''} name={'fireAlarm'} disabled />
                      <SelectField
                        name={'fireAlarmNew'} styleName={''} onChange={function () {}} answers={[
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Sprinkler'} styleName={''} name={'sprinkler'} disabled />
                      <SelectField
                        name={'sprinklerNew'} styleName={''} onChange={function () {}} answers={[
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Bill To'} styleName={''} name={'billTo'} disabled />
                      <TextField validations={['required']} styleName={''} name={'billToNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Bill Plan'} styleName={''} name={'billPlan'} disabled />
                      <SelectField
                        name="billPlanNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'ANNUAL',
                            label: 'Annual'
                          }, {
                            answer: 'SEMI-ANNUAL',
                            label: 'Semi-Annual'
                          },
                          {
                            answer: 'QUARTERLY',
                            label: 'Quarterly'
                          }
                        ]}
                      />
                    </div>

                  </div>

                </div>
              </section>

              <section>

                <div className="flex-parent">
                  {/* Col1 */}
                  <div className="flex-child col3">

                    <div className="form-group labels">
                      <label /><label>Current</label><label>New</label>
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Roof Covering'} styleName={''} name={'roofCovering'} disabled />
                      <SelectField
                        name="roofCoveringNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'Non-FBC',
                            label: 'Non-FBC'
                          }, {
                            answer: 'FBC',
                            label: 'FBC'
                          },
                          {
                            answer: 'Other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Roof Deck Attachment'} styleName={''} name={'roofDeckAttachment'} disabled />
                      <SelectField
                        name="roofDeckAttachmentNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'A'
                          },
                          {
                            answer: 'B'
                          },
                          {
                            answer: 'C'
                          },
                          {
                            answer: 'D'
                          },
                          {
                            answer: 'Concrete'
                          },
                          {
                            answer: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Roof to Wall Attachment'} styleName={''} name={'roofToWallConnection'} disabled />
                      <SelectField
                        name="roofToWallConnectionNew" component="select" styleName={'weakestRoofWallConnect'} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'Toe Nails'
                          },
                          {
                            answer: 'Clips'
                          },
                          {
                            answer: 'Single Wraps'
                          },
                          {
                            answer: 'Double Wraps'
                          },
                          {
                            answer: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Roof Geometry'} styleName={''} name={'roofGeometry'} disabled />
                      <SelectField
                        name="roofGeometryNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'Flat'
                          },
                          {
                            answer: 'Gable'
                          },
                          {
                            answer: 'Hip'
                          },
                          {
                            answer: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Secondary Water Resistance (SWR)'} styleName={''} name={'secondaryWaterResistance'} disabled />
                      <SelectField
                        validations={['required']} name={'secondaryWaterResistanceNew'} styleName={''} onChange={function () {}} answers={[
                          {
                            answer: 'Yes',
                            label: 'Yes'
                          }, {
                            answer: 'No',
                            label: 'No'
                          }, {
                            answer: 'Other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Opening Protection'} styleName={''} name={'openingProtection'} disabled />
                      <SelectField
                        name="openingProtectionNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'None'
                          },
                          {
                            answer: 'Basic'
                          },
                          {
                            answer: 'Hurricane'
                          },
                          {
                            answer: 'Other'
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'FBC Wind Speed'} styleName={''} name={'floridaBuildingCodeWindSpeed'} disabled />
                      <TextField validations={['required']} styleName={''} name={'floridaBuildingCodeWindSpeedNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'FBC Wind Speed Design'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} disabled />
                      <TextField validations={['required']} styleName={''} name={'floridaBuildingCodeWindSpeedDesignNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Terrain'} styleName={''} name={'propertyTerrain'} disabled />
                      <SelectField
                        name="terrainNew" component="select" styleName={'propertyTerrain'} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'B',
                            label: 'B'
                          }, {
                            answer: 'C',
                            label: 'C'
                          },
                          {
                            answer: 'HVHZ',
                            label: 'HVHZ'
                          },
                          {
                            answer: 'Other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label="Internal Pressure Design" styleName={''} name={'internalPressureDesign'} disabled />
                      <SelectField
                        name="internalPressureDesignNew" component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
                          {
                            answer: 'Enclosed',
                            label: 'Enclosed'
                          }, {
                            answer: 'Partial',
                            label: 'Partial'
                          },
                          {
                            answer: 'Other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Wind Borne Debris Region (WBDR)'} styleName={''} name={'windBorneDebrisRegion'} disabled />
                      <SelectField
                        validations={['required']} name={'windBorneDebrisRegionNew'} styleName={''} onChange={function () {}} answers={[
                          {
                            answer: 'Yes',
                            label: 'Yes'
                          }, {
                            answer: 'No',
                            label: 'No'
                          }, {
                            answer: 'Other',
                            label: 'Other'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Wind Mit Factor</label>
                      <input type="text" value="Yes" disabled />
                      <select>
                        <option>
                              Yes
                            </option>
                      </select>
                    </div>

                  </div>

                </div>
              </section>

              <a name="home" />
              <section>

                <h3>Home / Location</h3>

                <div className="flex-parent">
                  {/* Col1 */}
                  <div className="flex-child col3">

                    <div className="form-group labels">
                      <label /><label>Current</label><label>New</label>
                    </div>
                    <div className="form-group">
                      <TextField label={'Year Home Built'} styleName={''} name="yearBuilt" disabled />
                      <TextField styleName={''} name="yearBuiltNew" />
                    </div>
                    <div className="form-group">
                      <TextField label={'Construction'} styleName={''} name="constructionType" disabled />
                      <SelectField
                        component="select" styleName={''} name={'constructionTypeNew'}
                        answers={[
                          {
                            answer: 'FRAME',
                            label: 'Frame'
                          }, {
                            answer: 'PLASTIC SIDING',
                            label: 'Plastic Siding'
                          },
                          {
                            answer: 'ALUMINUM SIDING',
                            label: 'Aluminum Siding'
                          },
                          {
                            answer: 'MASONRY',
                            label: 'Masonry'
                          },
                          {
                            answer: 'MASONRY VENEER',
                            label: 'Masonry Veneer'
                          },
                          {
                            answer: 'SUPERIOR',
                            label: 'Superior'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField label={'Year Roof Built'} styleName={''} name="yearOfRoof" disabled />
                      <TextField styleName={''} name="yearOfRoofNew" />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Protection Class'} styleName={''} name={'protectionClass'} disabled />
                      <SelectField
                        name="protectionClassNew" component="select" styleName={''} answers={[
                          {
                            answer: '1',
                            label: '01'
                          }, {
                            answer: '2',
                            label: '02'
                          },
                          {
                            answer: '3',
                            label: '03'
                          },
                          {
                            answer: '4',
                            label: '04'
                          },
                          {
                            answer: '5',
                            label: '05'
                          },
                          {
                            answer: '6',
                            label: '06'
                          },
                          {
                            answer: '7',
                            label: '07'
                          },
                          {
                            answer: '8',
                            label: '08'
                          },
                          {
                            answer: '9',
                            label: '09'
                          },
                          {
                            answer: '10',
                            label: '10'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'BCEG'} styleName={''} name={'buildingCodeEffectivenessGrading'} disabled />
                      <SelectField
                        component="select" styleName={''} name={'buildingCodeEffectivenessGradingNew'} answers={[
                          {
                            answer: '1',
                            label: '01'
                          }, {
                            answer: '2',
                            label: '02'
                          },
                          {
                            answer: '3',
                            label: '03'
                          },
                          {
                            answer: '4',
                            label: '04'
                          },
                          {
                            answer: '5',
                            label: '05'
                          },
                          {
                            answer: '6',
                            label: '06'
                          },
                          {
                            answer: '7',
                            label: '07'
                          },
                          {
                            answer: '8',
                            label: '08'
                          },
                          {
                            answer: '9',
                            label: '09'
                          },
                          {
                            answer: '98',
                            label: '98'
                          },
                          {
                            answer: '99',
                            label: '99'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Family Units'} styleName={''} name={'familyUnits'} disabled />
                      <SelectField
                        name="familyUnitsNew" component="select" styleName={''} onChange={function () {}} answers={[
                          {
                            answer: '1-2',
                            label: '1-2'
                          }, {
                            answer: '3-4',
                            label: '3-4'
                          },
                          {
                            answer: '5-8',
                            label: '5-8'
                          }, {
                            answer: '9+',
                            label: '9+'
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
                    <div className="form-group">
                      <TextField validations={['required']} label={'Tidal Waters Dist.'} styleName={''} name={'distanceToTidalWater'} disabled />
                      <TextField validations={['required']} styleName={''} name={'distanceToTidalWaterNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Fire Hydrant Dist.'} styleName={''} name={'distanceToFireHydrant'} disabled />
                      <TextField validations={['required']} styleName={''} name={'distanceToFireHydrantNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Fire Station Dist.'} styleName={''} name={'distanceToFireStation'} disabled />
                      <TextField validations={['required']} styleName={''} name={'distanceToFireStationNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Residence Type'} styleName={''} name={'residenceType'} disabled />
                      <SelectField
                        name="residenceTypeNew" component="select" styleName={''} onChange={function () {}} answers={[
                          {
                            answer: 'Single Family',
                            label: 'Single Family'
                          }, {
                            answer: 'Apartment',
                            label: 'Apartment'
                          }
                        ]}
                      />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Sq. Ft. of Home'} styleName={''} name={'squareFeet'} disabled />
                      <TextField validations={['required']} styleName={''} name={'squareFeetNew'} />
                    </div>
                    <div className="form-group">
                      <TextField validations={['required']} label={'Flood Zone'} styleName={''} name={'floodZone'} disabled />
                      <SelectField
                        name="floodZoneNew" component="select" styleName={''} onChange={function () {}} answers={[
                          {
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
              </section>


              <section>

                <h3>Previous Endorsements</h3>

                <PrevEndorsements />


              </section>

              <a name="policy" />
              <section>

                <div className="flex-parent col2">
                  {/* Col1 */}
                  <div className="flex-child">
                    <h3>Primary Policyholder</h3>

                    <div className="flex-parent col2">
                      <div className="form-group">
                        <TextField validations={['required']} label={'First Name'} value={'First Name'} styleName={''} name={'pH1FirstName'} />
                      </div>
                      <div className="form-group">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} />
                      </div>
                    </div>

                    <div className="flex-parent col2">
                      <div className="form-group">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                      </div>
                      <div className="form-group">
                        <PhoneField validations={['required', 'phone']} label={'Secondary Phone'} styleName={''} name={'pH1secondaryPhone'} />
                      </div>
                    </div>

                    <div className="flex-parent">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH1email'} />
                      </div>
                    </div>

                  </div>

                  {/* Col2 */}
                  <div className="flex-child">
                    <h3>Secondary Policyholder</h3>

                    <div className="flex-parent col2">
                      <div className="form-group">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH2FirstName'} />
                        {console.log(fieldValues, 'fieldvalues')}
                      </div>
                      <div className="form-group">
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH2LastName'} />
                      </div>
                    </div>

                    <div className="flex-parent col2">
                      <div className="form-group">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH2phone'} />
                      </div>
                      <div className="form-group">
                        <PhoneField validations={['required', 'phone']} label={'Secondary Phone'} styleName={''} name={'pH2secondaryPhone'} />
                      </div>
                    </div>

                    <div className="flex-parent">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH2email'} />
                      </div>
                    </div>

                  </div>

                </div>

              </section>

              <a name="addresses" />
              <section>
                <h3>Mailing Address</h3>
                <div className="flex-parent col2">


                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Address 1'} styleName={''} name={'address1'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Address 2'} styleName={''} name={'address2'} />
                    </div>
                  </div>

                </div>


                <div className="flex-parent col211">


                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'City'} styleName={''} name={'city'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'State'} styleName={''} name={'state'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Zip'} styleName={''} name={'zip'} />
                    </div>
                  </div>

                </div>

              </section>


              <section>
                <h3>Property Address</h3>
                <div className="flex-parent col2">


                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Address 1'} styleName={''} name={'address1'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Address 2'} styleName={''} name={'address2'} />
                    </div>
                  </div>

                </div>


                <div className="flex-parent col211">


                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'City'} styleName={''} name={'city'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'State'} styleName={''} name={'state'} />
                    </div>
                  </div>

                  <div className="flex-child">
                    <div className="form-group">
                      <TextField label={'Zip'} styleName={''} name={'zip'} />
                    </div>
                  </div>

                </div>


              </section>

              <a name="addInt" />
              <section className="additionalInterests">
                <h3>Additional Interest</h3>

                <div className="button-group">
                  <button className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                  <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                  <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                  { /* <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => this.addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button> */ }
                  <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
                </div>

                <div className="results-wrapper"><ul className="results result-cards"><li><a><div className="card-icon"><i className="fa fa-circle Mortgagee" /><label>Mortgagee</label></div><section><h4>BANK OF AMERICA</h4><p className="address">123 Main Street, Suite A, Tampa, FL 33333</p></section>
                  <div className="ref-number"><label htmlFor="ref-number">Reference Number</label><span>76532487</span></div><i className="fa fa-pencil" /></a></li></ul></div>


              </section>


            </div>

          </div>
          <div className="endo-results-calc">


            <div className="flex-parent">
              <div className="form-group">
                <label>Type</label>
                <select>
                  <option>Please Select</option>
                </select>
              </div>
              <div className="form-group">
                <label>Effective Date</label>
                <input type="date" />
              </div>
            </div>


            <div className="flex-parent">

              <div className="form-group">
                <label>New End. Amount</label>
                <input type="numeric" value="52" />
              </div>
              <div className="form-group">
                <label>New End. Premium</label>
                <input type="numeric" value="3732" />
              </div>
              <div className="form-group">
                <label>New Annual Premium</label>
                <input type="numeric" value="4711" />
              </div>
              <div className="btn-footer">
                <button className="btn btn-secondary btn-sm">Cancel</button>
                <button className="btn btn-primary btn-sm">Calculate</button>
              </div>
            </div>


          </div>
        </div>

        <aside className="underwriting-validation">

          <h4 className="uw-validation-header">Underwriting Validation</h4>


        </aside>

      </div>


    </PolicyConnect>


  );
};

/**
------------------------------------------------
Property type definitions
------------------------------------------------
*/
Endorsements.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({ submitting: PropTypes.boolean })
  })
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Endorsements.values', {}),
  initialValues: handleInitialize(state),
  policy: handleGetQuoteData(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Endorsements' })(Endorsements));
