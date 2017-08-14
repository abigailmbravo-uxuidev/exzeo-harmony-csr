import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, propTypes, change, Form } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizePhone from '../Form/normalizePhone';
import TextField from '../Form/inputs/TextField';
import RadioField from '../Form/inputs/RadioField';
import PhoneField from '../Form/inputs/PhoneField';
import SelectField from '../Form/inputs/SelectField';
import CurrencyField from '../Form/inputs/CurrencyField';
import Footer from '../Common/Footer';

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'getPolicyDocument' }) ? _.find(taskData.model.variables, { name: 'getPolicyDocument' }).value[0] : {};
  return policyData;
};

const calculatePercentage = (oldFigure, newFigure) => {
  let percentChange = 0;
  if ((oldFigure !== 0) && (newFigure !== 0)) {
    percentChange = (oldFigure / newFigure) * 100;
  }
  return percentChange;
};

const handleInitialize = (state) => {
  const policy = handleGetPolicy(state);
  const values = {};
  // values.agencyCode = '20000'; // _.get(policy, 'agencyCode');
  // values.agentCode = '60000'; // _.get(policy, 'agentCode');
  // values.effectiveDate = moment.utc(_.get(policy, 'effectiveDate')).format('YYYY-MM-DD');
  // values.dwellingMin = _.get(policy, 'coverageLimits.dwelling.minAmount');
  // values.dwellingMax = _.get(policy, 'coverageLimits.dwelling.maxAmount');
  // values.liabilityIncidentalOccupancies = false;

  const dwelling = _.get(policy, 'coverageLimits.dwelling.amount');
  const otherStructures = _.get(policy, 'coverageLimits.otherStructures.amount');
  const personalProperty = _.get(policy, 'coverageLimits.personalProperty.amount');
  const hurricane = _.get(policy, 'deductibles.hurricane.amount');

// Coverage Top Left
  values.dwellingAmount = _.get(policy, 'coverageLimits.dwelling.amount');
  values.dwellingAmountNew = values.dwellingAmount;
  values.otherStructuresAmount = otherStructures;
  values.otherStructures = String(calculatePercentage(otherStructures, dwelling));
  values.personalPropertyAmount = String(personalProperty);
  values.personalProperty = String(calculatePercentage(personalProperty, dwelling));
  values.lossOfUse = _.get(policy, 'coverageLimits.lossOfUse.amount');
  values.personalLiability = _.get(policy, 'coverageLimits.personalLiability.amount');
  values.medicalPayments = _.get(policy, 'coverageLimits.medicalPayments.amount');

  values.medicalPaymentsNew = _.get(policy, 'coverageLimits.medicalPayments.amount');

  values.moldProperty = _.get(policy, 'coverageLimits.moldProperty.amount');
  values.moldLiability = _.get(policy, 'coverageLimits.moldLiability.amount');
  values.allOtherPerils = _.get(policy, 'deductibles.allOtherPerils.amount');
  values.hurricane = hurricane;
  values.calculatedHurricane = _.get(policy, 'deductibles.hurricane.calculatedAmount');
  values.sinkholePerilCoverage = _.get(policy, 'coverageOptions.sinkholePerilCoverage.answer');

// Coverage Top Right
  values.personalPropertyReplacementCostCoverage = _.get(policy, 'coverageOptions.personalPropertyReplacementCost.answer');
  values.ordinanceOrLaw = _.get(policy, 'coverageLimits.ordinanceOrLaw.amount');
  values.propertyIncidentalOccupanciesMainDwelling = false;
  values.propertyIncidentalOccupanciesOtherStructures = false;

  values.liabilityIncidentalOccupancies = _.get(policy, 'coverageOptions.liabilityIncidentalOccupancies.answer');

  values.townhouseRowhouse = _.get(policy, 'property.townhouseRowhouse') ? 'Yes' : 'No';
  values.windExcluded = _.get(policy, 'rating.windMitigationDiscount') === 0 ? 'No' : 'Yes';
  values.propertyRented = _.get(policy, 'underwritingAnswers.rented.answer');
  values.seasonallyOccupied = _.get(policy, 'underwritingAnswers.monthsOccupied.answer');
  values.noPriorInsurance = _.get(policy, 'underwritingAnswers.noPriorInsuranceSurcharge.answer');
  values.burglarAlarm = _.get(policy, 'property.burglarAlarm');
  values.fireAlarm = _.get(policy, 'property.fireAlarm');
  values.sprinkler = _.get(policy, 'property.sprinkler');
  values.billToType = _.get(policy, 'billToType');
  values.billPlan = _.get(policy, 'billPlan');

// Coverage Mid Left
  values.roofCovering = _.get(policy, 'property.windMitigation.roofCovering');
  values.roofDeckAttachment = _.get(policy, 'property.windMitigation.roofDeckAttachment');
  values.roofToWallConnection = _.get(policy, 'property.windMitigation.roofToWallConnection');
  values.roofGeometry = _.get(policy, 'property.windMitigation.roofGeometry');
  values.secondaryWaterResistance = _.get(policy, 'property.windMitigation.secondaryWaterResistance');
  values.openingProtection = _.get(policy, 'property.windMitigation.openingProtection');

// Coverage Mid Right
  values.floridaBuildingCodeWindSpeed = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeed');
  values.floridaBuildingCodeWindSpeedDesign = _.get(policy, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
  values.terrain = _.get(policy, 'property.windMitigation.terrain');
  values.internalPressureDesign = _.get(policy, 'property.windMitigation.internalPressureDesign');
  values.windBorneDebrisRegion = _.get(policy, 'property.windMitigation.windBorneDebrisRegion');
  values.windMitFactor = _.get(policy, 'rating.windMitigationDiscount');

// Home/Location Bottom Left
  values.yearBuilt = _.get(policy, 'property.yearBuilt');
  values.constructionType = _.get(policy, 'property.constructionType');
  values.yearOfRoof = _.get(policy, 'property.yearOfRoof');
  values.protectionClass = _.get(policy, 'property.protectionClass');
  values.buildingCodeEffectivenessGrading = _.get(policy, 'property.buildingCodeEffectivenessGrading');
  values.familyUnits = _.get(policy, 'property.familyUnits');

// Home/Location Bottom Right
  values.distanceToTidalWater = _.get(policy, 'property.distanceToTidalWater');
  values.distanceToFireHydrant = _.get(policy, 'property.distanceToFireHydrant');
  values.distanceToFireStation = _.get(policy, 'property.distanceToFireStation');
  values.residenceType = _.get(policy, 'property.residenceType');
  values.squareFeet = _.get(policy, 'property.squareFeet');
  values.floodZone = _.get(policy, 'property.floodZone');

// Policyholder 1
  values.pH1email = _.get(policy, 'policyHolders[0].emailAddress');
  values.pH1FirstName = _.get(policy, 'policyHolders[0].firstName');
  values.pH1LastName = _.get(policy, 'policyHolders[0].lastName');
  values.pH1phone = normalizePhone(_.get(policy, 'policyHolders[0].primaryPhoneNumber') || '');
  values.pH1secondaryPhone = normalizePhone(_.get(policy, 'policyHolders[0].secondaryPhoneNumber') || '');

// Policyholder 2
  values.pH2email = _.get(policy, 'policyHolders[1].emailAddress');
  values.pH2FirstName = _.get(policy, 'policyHolders[1].firstName');
  values.pH2LastName = _.get(policy, 'policyHolders[1].lastName');
  values.pH2phone = normalizePhone(_.get(policy, 'policyHolders[1].primaryPhoneNumber') || '');
  values.pH2secondaryPhone = normalizePhone(_.get(policy, 'policyHolders[1].secondaryPhoneNumber') || '');

  // Mailing/Billing
  values.address1 = _.get(policy, 'policyHolderMailingAddress.address1');
  values.address2 = _.get(policy, 'policyHolderMailingAddress.address2');
  values.city = _.get(policy, 'policyHolderMailingAddress.city');
  values.state = _.get(policy, 'policyHolderMailingAddress.state');
  values.zip = _.get(policy, 'policyHolderMailingAddress.zip');

// Property
  values.propertyAddress1 = _.get(policy, 'property.physicalAddress.address1');
  values.propertyAddress2 = _.get(policy, 'property.physicalAddress.address2');
  values.propertyCity = _.get(policy, 'property.physicalAddress.city');
  values.propertyState = _.get(policy, 'property.physicalAddress.state');
  values.propertyZip = _.get(policy, 'property.physicalAddress.zip');

  values.uwExceptions = _.get(policy, 'underwritingExceptions');

  return values;
};

const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

const updateDependencies = (event, field, dependency, props) => {
  const { dispatch, fieldValues } = props;
  if (Number.isNaN(event.target.value)) return;

  const dependencyValue = String(fieldValues[dependency]).replace(/\D+/g, '');

  const fieldValue = setPercentageOfValue(Number(dependencyValue), Number(event.target.value));

  dispatch(change('Coverage', field, Number.isNaN(fieldValue) ? '' : String(fieldValue)));
};

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

export const calculate = () => {

};

export const save = () => {

};

export class Endorsements extends React.Component {

  componentWillMount = () => {
    if (this.props && this.props.policy && this.props.policy.policyNumber) {
      this.props.actions.cgActions.startWorkflow('endorsePolicyModel', { policyNumber: this.props.policy.policyNumber }).then(() => {
      });
    }
  }


  render() {
    const endorsements = [
    { date: '03/30/2017', amount: '-$ 85', type: '???' },
    { date: '02/20/2016', amount: '-$ 20', type: '???' },
    { date: '01/10/2015', amount: '-$ 35', type: '???' }
    ];

    const { initialValues, pristine, handleSubmit } = this.props;
    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <Form id="Endorsements" className={'content-wrapper'} onSubmit={handleSubmit(pristine ? save : calculate)} >

          <div className="route-content">
            <div className="endorsements">

              <div className="endo-jump-menu">

                <a href="#coverage" className="btn btn-primary btn-xs">Coverage</a>
                <a href="#home" className="btn btn-primary btn-xs">Home / Location</a>
                <a href="#policy" className="btn btn-primary btn-xs">Policyholders</a>
                <a href="#addresses" className="btn btn-primary btn-xs">Addresses</a>
                <Link className="btn btn-secondary btn-xs" to={'/policy/coverage'} >Cancel</Link>
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
                        <div className="form-group-double-element">
                        <CurrencyField
                            validations={['required']} label={'Dwelling (A)'} styleName={''} name={'dwellingAmount'}
                            min={initialValues.dwellingMin} max={initialValues.dwellingMax} disabled
                          />
                        <CurrencyField
                            validations={['required']} styleName={''} name={'dwellingAmountNew'}
                            min={initialValues.dwellingMin} label={''} max={initialValues.dwellingMax}
                          />
                      </div>
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} name="otherStructuresAmount" label={'Other Structures (B)'} styleName={'coverage-b'} disabled />
                        <CurrencyField validations={['required']} label={''} name="otherStructuresAmountNew" styleName={'coverage-b'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Other Structures %'} styleName={''} name={'otherStructures'} disabled />
                        <SelectField
                            name="otherStructuresNew" component="select" label={''} styleName={'coverage-b-percentage'} onChange={event => updateDependencies(event, 'otherStructuresAmount', 'dwellingAmount', this.props)} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'Personal Property (C)'} styleName={'coverage-c'} name="personalPropertyAmount" disabled />
                        <CurrencyField validations={['required']} label={''} styleName={'coverage-c'} name="personalPropertyAmountNew" />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Personal Property %'} styleName={''} name={'personalProperty'} disabled />
                        <SelectField
                            name="personalPropertyNew" component="select" label={''} styleName={'coverage-c-percentage'} onChange={event => updateDependencies(event, 'personalPropertyAmount', 'dwellingAmount', this.props)} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <CurrencyField label={'Loss of Use (D)'} styleName={''} name={'lossOfUse'} disabled />
                        <CurrencyField styleName={''} label={''} name={'lossOfUseNew'} disabled />
                      </div>
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'Personal Liability (E)'} styleName={''} name={'personalLiability'} disabled />
                        <SelectField
                            name="personalLiabilityNew" component="select" label={''} styleName={''} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'Medical Payments (F)'} styleName={''} name={'medicalPayments'} disabled />
                        <CurrencyField name={'medicalPaymentsNew'} label={''} styleName={''} disabled />
                      </div>
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'Mold Property'} styleName={''} name={'moldProperty'} disabled />
                        <SelectField
                            name="moldPropertyNew" component="select" label={''} styleName={''} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'Mold Liability'} styleName={''} name={'moldLiability'} disabled />
                        <SelectField
                            name="moldLiabilityNew" component="select" styleName={''} label={''} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <CurrencyField validations={['required']} label={'AOP Deductible'} styleName={''} name={'allOtherPerils'} disabled />
                        <SelectField
                            name="allOtherPerilsNew" component="select" styleName={''} label={''} onChange={function () {}} validations={['required']} answers={[
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
                          />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Hurricane Deductible'} styleName={''} name={'hurricane'} disabled />
                        <SelectField
                            label={''}
                            name="hurricaneNew" component="select" styleName={''} onChange={event => updateDependencies(event, 'calculatedHurricane', 'dwellingAmount', this.props)} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Sinkhole Deductible'} styleName={''} name={'sinkholePerilCoverage'} disabled />
                        <SelectField
                            name="sinkholePerilCoverageNew" label={''} component="select" styleName={''} onChange={function () {}} answers={[
                              {
                                answer: false,
                                label: 'Coverage Excluded'
                              }, {
                                answer: true,
                                label: '10% of Dwelling'
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
                        <TextField validations={['required']} label={'Personal Property Repl Cost'} styleName={''} name={'personalPropertyReplacementCostCoverage'} disabled />
                        <div className="flex-child other-coverages-property-replacement-cost">
                            <RadioField
                              name={'personalPropertyReplacementCostCoverageNew'} styleName={'billPlan'} label={''} onChange={function () {}} segmented answers={[
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
                        <TextField validations={['required']} label={'Ordinance or Law Coverage'} styleName={''} name={'ordinanceOrLaw'} disabled />
                        <SelectField
                            name="ordinanceOrLawNew" label={''} component="select" styleName={''} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Incidental Occ Main'} styleName={''} name={'propertyIncidentalOccupanciesMainDwelling'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'propertyIncidentalOccupanciesMainDwellingNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Incidental Occ Other'} styleName={''} name={'propertyIncidentalOccupanciesOtherStructures'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'propertyIncidentalOccupanciesOtherStructuresNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Incidental Occ Liability'} styleName={''} name={'liabilityIncidentalOccupancies'} disabled />
                        <CurrencyField name={'liabilityIncidentalOccupanciesNew'} label={''} styleName={''} disabled />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Townhouse / Rowhouse'} styleName={''} name={'townhouseRowhouse'} disabled />
                        <div className="flex-child">
                            <RadioField
                              name={'townhouseRowhouseNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <TextField validations={['required']} label={'Property Ever Rented'} styleName={''} name={'propertyRented'} disabled />
                        <SelectField
                            label={''}
                            name={'propertyRentedNew'} styleName={''} onChange={function () {}} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Seasonally Occupied'} styleName={''} name={'seasonallyOccupied'} disabled />
                        <SelectField
                            name={'seasonallyOccupiedNew'} label={''} styleName={''} onChange={function () {}} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Prior Insurance'} styleName={''} name={'noPriorInsurance'} disabled />
                        <SelectField
                            name={'noPriorInsuranceNew'} label={''} styleName={''} onChange={function () {}} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Burglar Alarm'} styleName={''} name={'burglarAlarm'} disabled />
                        <div className="flex-child discounts-burglar-alarm">
                            <RadioField
                              name={'burglarAlarmNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <TextField validations={['required']} label={'Fire Alarm'} styleName={''} name={'fireAlarm'} disabled />
                        <div className="flex-child discounts-fire-alarm">
                            <RadioField
                              name={'fireAlarmNew'} styleName={''} label={''} onChange={function () {}} segmented answers={[
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
                        <TextField validations={['required']} label={'Sprinkler'} styleName={''} name={'sprinkler'} disabled />
                        <div className="flex-child discounts-sprinkler">
                            <RadioField
                              name={'sprinklerNew'} label={''} styleName={''} onChange={function () {}} segmented answers={[
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
                  <section>
                    <div className="flex-parent">
                      {/* Col1 */}
                      <div className="flex-child col3">
                        <div className="form-group labels">
                        <label /><label>Current</label><label>New</label>
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Roof Covering'} styleName={''} name={'roofCovering'} disabled />
                        <SelectField
                            label={''}
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Roof Deck Attachment'} styleName={''} name={'roofDeckAttachment'} disabled />
                        <SelectField
                            label={''}
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Roof to Wall Attachment'} styleName={''} name={'roofToWallConnection'} disabled />
                        <SelectField
                            label={''}
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Roof Geometry'} styleName={''} name={'roofGeometry'} disabled />
                        <SelectField
                            label={''}
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Secondary Water Resistance (SWR)'} styleName={''} name={'secondaryWaterResistance'} disabled />
                        <div className="form-group-double-element">
                            <RadioField
                              label={''}
                              validations={['required']} name={'secondaryWaterResistanceNew'} styleName={''} onChange={function () {}} segmented answers={[
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
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Opening Protection'} styleName={''} name={'openingProtection'} disabled />
                        <SelectField
                            label={''}
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'FBC Wind Speed'} styleName={''} name={'floridaBuildingCodeWindSpeed'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'floridaBuildingCodeWindSpeedNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'FBC Wind Speed Design'} styleName={''} name={'floridaBuildingCodeWindSpeedDesign'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'floridaBuildingCodeWindSpeedDesignNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Terrain'} styleName={''} name={'terrain'} disabled />
                        <SelectField
                            name="terrainNew" component="select" label={''} styleName={'propertyTerrain'} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label="Internal Pressure Design" styleName={''} name={'internalPressureDesign'} disabled />
                        <SelectField
                            name="internalPressureDesignNew" component="select" label={''} styleName={''} onChange={function () {}} validations={['required']} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Wind Borne Debris Region (WBDR)'} styleName={''} name={'windBorneDebrisRegion'} disabled />
                        <div className="form-group-double-element">
                            <RadioField
                              label={''}
                              validations={['required']} name={'windBorneDebrisRegionNew'} styleName={''} onChange={function () {}} segmented answers={[
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
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Wind Mit Factor'} styleName={''} name={'windMitFactor'} disabled />
                        <TextField validations={['required']} styleName={''} label={''} name={'windMitFactorNew'} disabled />
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
                        <div className="form-group-double-element">
                        <TextField label={'Year Home Built'} styleName={''} name="yearBuilt" disabled />
                        <TextField styleName={''} label={''} name="yearBuiltNew" />
                      </div>
                        <div className="form-group-double-element">
                        <TextField label={'Construction'} styleName={''} name="constructionType" disabled />
                        <SelectField
                            component="select" styleName={''} label={''} name={'constructionTypeNew'}
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

                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Protection Class'} styleName={''} name={'protectionClass'} disabled />
                        <SelectField
                            name="protectionClassNew" component="select" label={''} styleName={''} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'BCEG'} styleName={''} name={'buildingCodeEffectivenessGrading'} disabled />
                        <SelectField
                            component="select" styleName={''} label={''} name={'buildingCodeEffectivenessGradingNew'} answers={[
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

                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Family Units'} styleName={''} name={'familyUnits'} disabled />
                        <SelectField
                            name="familyUnitsNew" component="select" label={''} styleName={''} onChange={function () {}} answers={[
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

                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Flood Zone'} styleName={''} name={'floodZone'} disabled />
                        <SelectField
                            name="floodZoneNew" component="select" label={''} styleName={''} onChange={function () {}} answers={[
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

                      {/* Col2 */}
                      <div className="flex-child col3">

                        <div className="form-group labels">
                        <label /><label>Current</label><label>New</label>
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Tidal Waters Dist.'} styleName={''} name={'distanceToTidalWater'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'distanceToTidalWaterNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Fire Hydrant Dist.'} styleName={''} name={'distanceToFireHydrant'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'distanceToFireHydrantNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Fire Station Dist.'} styleName={''} name={'distanceToFireStation'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'distanceToFireStationNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Residence Type'} styleName={''} name={'residenceType'} disabled />
                        <SelectField
                            name="residenceTypeNew" component="select" label={''} styleName={''} onChange={function () {}} answers={[
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
                        <div className="form-group-double-element">
                        <TextField validations={['required']} label={'Sq. Ft. of Home'} styleName={''} name={'squareFeet'} disabled />
                        <TextField validations={['required']} label={''} styleName={''} name={'squareFeetNew'} />
                      </div>
                        <div className="form-group-double-element">
                        <TextField label={'Year Roof Built'} styleName={''} name="yearOfRoof" disabled />
                        <TextField styleName={''} label={''} name="yearOfRoofNew" />
                      </div>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3>Previous Endorsements</h3>
                    <BootstrapTable data={endorsements}>
                      <TableHeaderColumn dataField="date" isKey>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="amount">Amount</TableHeaderColumn>
                      <TableHeaderColumn dataField="type">Type</TableHeaderColumn>
                    </BootstrapTable>
                  </section>
                  <a name="policy" />
                  <section>
                    <div className="flex-parent col2">
                      {/* Col1 */}
                      <div className="flex-child">
                        <h3>Primary Policyholder</h3>
                        <div className="flex-parent col2">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH1FirstName'} />
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH1LastName'} />
                      </div>
                        <div className="flex-parent col2">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH1phone'} />
                        <PhoneField validations={['required', 'phone']} label={'Secondary Phone'} styleName={''} name={'pH1secondaryPhone'} />
                      </div>
                        <div className="flex-parent">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH1email'} />
                      </div>
                      </div>
                      {/* Col2 */}
                      <div className="flex-child">
                        <h3>Secondary Policyholder</h3>
                        <div className="flex-parent col2">
                        <TextField validations={['required']} label={'First Name'} styleName={''} name={'pH2FirstName'} />
                        <TextField validations={['required']} label={'Last Name'} styleName={''} name={'pH2LastName'} />
                      </div>
                        <div className="flex-parent col2">
                        <PhoneField validations={['required', 'phone']} label={'Primary Phone'} styleName={''} name={'pH2phone'} />
                        <PhoneField validations={['required', 'phone']} label={'Secondary Phone'} styleName={''} name={'pH2secondaryPhone'} />
                      </div>
                        <div className="flex-parent">
                        <TextField validations={['required']} label={'Email Address'} styleName={''} name={'pH2email'} />
                      </div>
                      </div>
                    </div>
                  </section>
                  <a name="addresses" />
                  <section>
                    <h3>Mailing Address</h3>
                    <div className="flex-parent col2">
                      <div className="flex-child">
                        <TextField label={'Address 1'} styleName={''} name={'address1'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Address 2'} styleName={''} name={'address2'} />
                      </div>
                    </div>
                    <div className="flex-parent col211">
                      <div className="flex-child">
                        <TextField label={'City'} styleName={''} name={'city'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'State'} styleName={''} name={'state'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Zip'} styleName={''} name={'zip'} />
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3>Property Address</h3>
                    <div className="flex-parent col2">
                      <div className="flex-child">
                        <TextField label={'Address 1'} styleName={''} name={'propertyAddress1'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Address 2'} styleName={''} name={'propertyAddress2'} />
                      </div>
                    </div>
                    <div className="flex-parent col211">
                      <div className="flex-child">
                        <TextField label={'City'} styleName={''} name={'propertyCity'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'State'} styleName={''} name={'propertyState'} />
                      </div>
                      <div className="flex-child">
                        <TextField label={'Zip'} styleName={''} name={'propertyZip'} />
                      </div>
                    </div>
                  </section>
                  <a name="addInt" />

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
                    <input type="numeric" onChange={function () {}} value="" />
                  </div>
                  <div className="form-group">
                    <label>New End Premium</label>
                    <input type="numeric" onChange={function () {}} value="" />
                  </div>
                  <div className="form-group">
                    <label>New Annual Premium</label>
                    <input type="numeric" onChange={function () {}} value="" />
                  </div>
                  <div className="btn-footer">
                    <Link className="btn btn-secondary btn-sm" to={'/policy/coverage'} >Cancel</Link>
                    <button className="btn btn-primary btn-sm">Calculate</button>
                  </div>
                </div>
              </div>

            </div>
            <aside className="underwriting-validation">
              <h4 className="uw-validation-header">Underwriting Validation</h4>
            </aside>
          </div>
        </Form>

      </PolicyConnect>
    );
  }
}


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
  policy: handleGetPolicy(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Endorsements', enableReinitialize: true })(Endorsements));


  // const discountSurcharge = [
  //   {
  //     discountSurcharge: 'Wind Excluded',
  //     value: _.get(rating, 'windMitigationDiscount') === 0 ? 'No' : 'Yes'
  //   }, {
  //     discountSurcharge: 'Property Ever Rented',
  //     value: _.get(underwritingAnswers, 'rented.answer')
  //   }, {
  //     discountSurcharge: 'Seasonally Occupied',
  //     value: _.get(underwritingAnswers, 'monthsOccupied.answer')
  //   }, {
  //     discountSurcharge: 'No Prior Insurance',
  //     value: _.get(underwritingAnswers, 'noPriorInsuranceSurcharge.answer')
  //   }, {
  //     discountSurcharge: 'Burglar Alarm',
  //     value: _.get(property, 'burglarAlarm') ? 'Yes' : 'No'
  //   }, {
  //     discountSurcharge: 'Fire Alarm',
  //     value: _.get(property, 'fireAlarm') ? 'Yes' : 'No'
  //   }, {
  //     discountSurcharge: 'Sprinkler',
  //     value: _.get(property, 'sprinkler') === 'N' ? 'No' : 'Yes'
  //   }, {
  //     discountSurcharge: 'Wind Mit Factor',
  //     value: _.get(rating, 'windMitigationDiscount')
  //   }
  // ];

  // const coverageLimitsData = [
  //   {
  //     coverage: 'Dwelling',
  //     value: `$ ${_.get(coverageLimits, 'dwelling.amount')}`
  //   }, {
  //     coverage: 'Other Structures',
  //     value: `$ ${_.get(coverageLimits, 'otherStructures.amount')}`
  //   }, {
  //     coverage: 'Personal Property',
  //     value: `$ ${_.get(coverageLimits, 'personalProperty.amount')}`
  //   }, {
  //     coverage: 'Additional Living Expenses',
  //     value: `$ ${_.get(coverageLimits, 'lossOfUse.amount')}`
  //   }, {
  //     coverage: 'Personal Liability',
  //     value: `$ ${_.get(coverageLimits, 'personalLiability.amount')}`
  //   }, {
  //     coverage: 'Medical Payments',
  //     value: `$ ${_.get(coverageLimits, 'medicalPayments.amount')}`
  //   }
  // ];

  // const coverageOptionsData = [
  //   {
  //     coverage: 'Mold Property Limit',
  //     value: `$ ${_.get(coverageLimits, 'moldProperty.amount')}`
  //   }, {
  //     coverage: 'Mold Liability Limit',
  //     value: `$ ${_.get(coverageLimits, 'moldLiability.amount')}`
  //   }, {
  //     coverage: 'Personal Property Repl Cost',
  //     value: _.get(coverageOptions, 'personalPropertyReplacementCost.answer') ? 'Yes' : 'No'
  //   }, {
  //     coverage: 'Ordinance or Law Coverage',
  //     value: `${_.get(coverageLimits, 'ordinanceOrLaw.amount')}%`
  //   }, {
  //     coverage: 'Incidental Occ Main',
  //     value: _.get(coverageOptions, 'propertyIncidentalOccupanciesMainDwelling.answer') ? 'Yes' : 'No'
  //   }, {
  //     coverage: 'Incidental Occ Other',
  //     value: _.get(coverageOptions, 'propertyIncidentalOccupanciesOtherStructures.answer') ? 'Yes' : 'No'
  //   }
  // ];

  // const premium = [{
  //   premium: 'Current Premium',
  //   value: `$ ${_.get(rating, 'totalPremium')}`
  // }, {
  //   premium: 'Initial Premium',
  //   value: `$ ${_.get(rating, 'netPremium')}`
  // }];

  // const billing = [
  //   {
  //     coverage: 'Balance Due',
  //     value: `$ ${_.get(rating, 'totalPremium')}`
  //   }, {
  //     coverage: 'Next Payment',
  //     value: `$ ${_.get(rating, 'totalPremium')}`
  //   }, {
  //     coverage: 'Bill To',
  //     value: _.get(props.policy, 'billToType')
  //   }, {
  //     coverage: 'Bill Plan',
  //     value: _.get(props.policy, 'billPlan')
  //   }
  // ];

  // const deductibleData = [
  //   {
  //     displayText: 'All Other Perils',
  //     amount: `$ ${_.get(deductibles, 'allOtherPerils.amount')}`
  //   }, {
  //     displayText: 'Hurricane',
  //     amount: `${_.get(deductibles, 'hurricane.amount')}%`
  //   }, {
  //     displayText: 'Sinkhole',
  //     amount: `${_.get(deductibles, 'sinkhole.amount') ? `${_.get(deductibles, 'sinkhole.amount')}%` : 'No'}`
  //   }
  // ];
