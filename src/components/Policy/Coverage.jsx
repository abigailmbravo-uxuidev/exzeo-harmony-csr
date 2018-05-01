import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { reduxForm, propTypes } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as questionsActions from '../../actions/questionsActions';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as policyStateActions from '../../actions/policyStateActions';
import PolicyConnect from '../../containers/Policy';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';

export const getPropertyAppraisialLink = (county, questions) => {
  const answers = _.get(_.find(questions, { name: 'propertyAppraisal' }), 'answers') || [];
  return _.find(answers, { label: county }) || {};
};

const handleInitialize = state => state.service.latestPolicy;

export class Coverage extends Component {
  async componentDidMount() {
    const { actions } = this.props;

    actions.questionsActions.getUIQuestions('propertyAppraisalCSR');
    const isNewTab = await localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      const policyNumber = await localStorage.getItem('policyNumber');
      actions.policyStateActions.updatePolicy(true, policyNumber);
      actions.serviceActions.getCancelOptions();
      actions.serviceActions.getSummaryLedger(policyNumber);
      localStorage.setItem('isNewTab', false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { actions, policy, summaryLedger } = nextProps;
    if (policy && policy.policyNumber && summaryLedger.currentPremium) {
      const paymentOptions = {
        effectiveDate: policy.effectiveDate,
        policyHolders: policy.policyHolders,
        additionalInterests: policy.additionalInterests,
        currentPremium: summaryLedger.currentPremium,
        fullyEarnedFees: policy.rating.worksheet.fees.empTrustFee + policy.rating.worksheet.fees.mgaPolicyFee
      };
      actions.serviceActions.getBillingOptionsForPolicy(paymentOptions);
    }
  }

  render() {
    const {
      coverageLimits,
      coverageOptions,
      deductibles,
      property,
      rating,
      underwritingAnswers
    } = this.props.policy;

    const {
      policy, questions, summaryLedger, paymentOptions
    } = this.props;

    const discountSurcharge = [
      {
        discountSurcharge: 'Townhouse/Rowhouse',
        value: _.get(property, 'townhouseRowhouse') === false ? 'No' : 'Yes'
      }, {
        discountSurcharge: 'Property Ever Rented',
        value: _.get(underwritingAnswers, 'rented.answer') === 'Yes' ? 'Yes' : 'No'
      }, {
        discountSurcharge: 'Seasonally Occupied',
        value: _.get(underwritingAnswers, 'monthsOccupied.answer') !== '10+' ? 'Yes' : 'No'
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
        value: _.get(property, 'sprinkler') === 'N' ? 'No' : _.get(property, 'sprinkler')
      }, {
        discountSurcharge: 'Wind Mit Factor',
        value: _.get(rating, 'worksheet.elements.windMitigationFactors.windMitigationDiscount') ? _.get(rating, 'worksheet.elements.windMitigationFactors.windMitigationDiscount') : '0'
      }
    ];

    const coverageLimitsData = [
      {
        coverage: 'Dwelling Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'dwelling.amount'))}`
      }, {
        coverage: 'Other Structures Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'otherStructures.amount'))}`
      }, {
        coverage: 'Personal Property Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'personalProperty.amount'))}`
      }, {
        coverage: 'Loss of Use Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'lossOfUse.amount'))}`
      }, {
        coverage: 'Personal Liability Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'personalLiability.amount'))}`
      }, {
        coverage: 'Medical Payments to Others Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'medicalPayments.amount'))}`
      }
    ];

    const coverageOptionsData = [
      {
        coverage: 'Mold Property Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'moldProperty.amount'))}`
      }, {
        coverage: 'Mold Liability Limit',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'moldLiability.amount'))}`
      }, {
        coverage: 'Personal Property Repl Cost',
        value: _.get(coverageOptions, 'personalPropertyReplacementCost.answer') ? 'Yes' : 'No'
      }, {
        coverage: 'Ordinance or Law Coverage Limit',
        value: `${_.get(coverageLimits, 'ordinanceOrLaw.amount')}%`
      }, {
        coverage: 'Incidental Occ Main',
        value: _.get(coverageOptions, 'propertyIncidentalOccupanciesMainDwelling.answer') ? 'Yes' : 'No'
      }, {
        coverage: 'Incidental Occ Other',
        value: _.get(coverageOptions, 'propertyIncidentalOccupanciesOtherStructures.answer') ? 'Yes' : 'No'
      },
      {
        coverage: 'Incidental Occ Liability',
        value: _.get(coverageOptions, 'liabilityIncidentalOccupancies.answer') ? 'Yes' : 'No'
      }
    ];

    const premium = [{
      premium: 'Current Premium',
      value: `$ ${normalizeNumbers(_.get(summaryLedger, 'currentPremium') || 0)}`
    }, {
      premium: 'Initial Premium',
      value: `$ ${normalizeNumbers(_.get(summaryLedger, 'initialPremium') || 0)}`
    },
    {
      premium: 'Balance Due',
      value: `$ ${normalizeNumbers(_.get(summaryLedger, 'balance.$numberDecimal') || 0)}`
    }];

    const billing = [
      {
        coverage: 'Next Payment',
        value: `$ ${normalizeNumbers(_.get(summaryLedger, 'noticeAmountDue.$numberDecimal') || 0)}`
      },
      {
        coverage: 'Payment Due',
        value: _.get(summaryLedger, 'invoiceDueDate') ? (moment(_.get(summaryLedger, 'invoiceDueDate'))).format('L') : '-'
      },
      {
        coverage: 'Bill To',
        value: `${_.get(_.find(_.get(paymentOptions, 'options'), option => option.billToId === _.get(policy, 'billToId')), 'displayText')}`
      }, {
        coverage: 'Bill Plan',
        value: _.get(policy, 'billPlan')
      }
    ];

    const deductibleData = [
      {
        displayText: 'All Other Perils',
        amount: `$ ${normalizeNumbers(_.get(deductibles, 'allOtherPerils.amount'))}`
      }, {
        displayText: 'Hurricane',
        amount: `${_.get(deductibles, 'hurricane.amount')}%`
      }, {
        displayText: 'Sinkhole',
        amount: _.get(deductibles, 'sinkhole.amount') ? `${_.get(deductibles, 'sinkhole.amount')}%` : 'No'
      }
    ];

    const propertyData = property || {};
    if (!this.props.policy.policyID) {
      return (<PolicyConnect />);
    }
    return (
      <PolicyConnect>
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section>
                <h3>Coverage and Premium</h3>
                <div className="coverage-premium">
                  <div className="responsive-tables">
                    <div className="table-view">
                      <BootstrapTable className="" data={coverageLimitsData} striped hover>
                        <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage Limits</TableHeaderColumn>
                        <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable className="" data={coverageOptionsData} striped hover>
                        <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage Limits</TableHeaderColumn>
                        <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable className="" data={discountSurcharge} striped hover>
                        <TableHeaderColumn isKey dataField="discountSurcharge" className="discountSurcharge" columnClassName="discountSurcharge">Discount/Surcharge</TableHeaderColumn>
                        <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                  <div className="responsive-tables">
                    <div className="table-view">
                      <BootstrapTable className="deductible" data={deductibleData} striped hover>
                        <TableHeaderColumn isKey dataField="displayText" className="coverage" columnClassName="coverage">Deductible</TableHeaderColumn>
                        <TableHeaderColumn dataField="amount" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable className="premium" data={premium} striped hover>
                        <TableHeaderColumn isKey dataField="premium" className="coverage" columnClassName="coverage">Premium</TableHeaderColumn>
                        <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable className="billing" data={billing} striped hover>
                        <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Billing</TableHeaderColumn>
                        <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign="right">Value</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <h3>Home and Location</h3>
                <div className="property-info">
                  <dl>
                    <div>
                      <dt className="yearHomeBuilt">Year Home Built</dt>
                      <dd className="yearHomeBuilt">{propertyData.yearBuilt}</dd>
                      <dt className="construction">Construction</dt>
                      <dd className="construction">{propertyData.constructionType}</dd>
                      <dt className="yearRoofBuilt">Year Roof Built</dt>
                      <dd className="yearRoofBuilt">{propertyData.yearOfRoof}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="protectionClass">Protection Class</dt>
                      <dd className="protectionClass">{propertyData.protectionClass}</dd>
                      <dt className="BCEG">BCEG</dt>
                      <dd className="BCEG">{propertyData.buildingCodeEffectivenessGrading}</dd>
                      <dt className="familyUnits">Family Units</dt>
                      <dd className="familyUnits">{propertyData.familyUnits}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="distToTidalWaters">Dist. to Tidal Waters</dt>
                      <dd className="distToTidalWaters">{normalizeNumbers(propertyData.distanceToTidalWater)} ft.</dd>
                      <dt className="distToFireHydrant">Dist. to Fire Hydrant</dt>
                      <dd className="distToFireHydrant">{propertyData.distanceToFireHydrant ? `${normalizeNumbers(propertyData.distanceToFireHydrant)} ft.` : '-'}</dd>
                      <dt className="distToFireStation">Dist. to Fire Station</dt>
                      <dd className="distToFireStation">{propertyData.distanceToFireStation} mi.</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="residenceType">Residence Type</dt>
                      <dd className="residenceType">{propertyData.residenceType}</dd>
                      <dt className="squareFootage">Square Footage</dt>
                      <dd className="squareFootage">{propertyData.squareFeet}</dd>
                      <dt className="floodZone">Flood Zone</dt>
                      <dd className="floodZone">{propertyData.floodZone}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="appraiser">Appraiser</dt>
                      <dd className="appraiser">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={getPropertyAppraisialLink(propertyData.physicalAddress.county, questions).answer}
                        >{getPropertyAppraisialLink(propertyData.physicalAddress.county, questions).label}</a>
                      </dd>
                      <dt className="territory">Territory</dt>
                      <dd className="territory">{_.get(rating, 'worksheet.elements.territoryFactors.name') || '-'}</dd>
                    </div>
                  </dl>
                </div>
              </section>
              <section>
                <h3>Wind Mitigation</h3>
                <div className="wind-mitigation">
                  <dl>
                    <div>
                      <dt className="roofCovering">Roof Covering</dt>
                      <dd className="roofCovering">{property.windMitigation.roofCovering}</dd>
                      <dt className="roofDeckAttachment">Roof Deck Attachment</dt>
                      <dd className="roofDeckAttachment">{property.windMitigation.roofDeckAttachment}</dd>
                      <dt className="roofToWallAttachment">Roof to Wall Attachment</dt>
                      <dd className="roofToWallAttachment">{property.windMitigation.roofToWallConnection}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="roofGeometry">Roof Geometry</dt>
                      <dd className="roofGeometry">{property.windMitigation.roofGeometry}</dd>
                      <dt className="SWR">Secondary Water Resistance (SWR)</dt>
                      <dd className="SWR">{property.windMitigation.secondaryWaterResistance}</dd>
                      <dt className="openingProtection">Opening Protection</dt>
                      <dd className="openingProtection">{property.windMitigation.openingProtection}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="windSpeed">FBC Wind Speed</dt>
                      <dd className="windSpeed">{property.windMitigation.floridaBuildingCodeWindSpeed}</dd>
                      <dt className="windSpeedDesign">FBC Wind Speed Design</dt>
                      <dd className="windSpeedDesign">{property.windMitigation.floridaBuildingCodeWindSpeedDesign}</dd>
                      <dt className="terrain">Terrain</dt>
                      <dd className="terrain">{property.windMitigation.terrain}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="internalPressureDesign">Internal Pressure Design</dt>
                      <dd className="internalPressureDesign">{property.windMitigation.internalPressureDesign}</dd>
                      <dt className="WBDR">Wind Borne Debris Region (WBDR)</dt>
                      <dd className="WBDR">{property.windMitigation.windBorneDebrisRegion}</dd>
                      <dt className="windMitFactor">Wind Mit Factor</dt>
                      <dd className="windMitFactor">{_.get(_.find(discountSurcharge, { discountSurcharge: 'Wind Mit Factor' }), 'value')}</dd>
                    </div>
                  </dl>
                </div>
              </section>
              {/* <section>
              <h2>Claims</h2>
              <div className="table-view claims">
                <BootstrapTable className="" data={claims} striped hover>
                  <TableHeaderColumn isKey dataField="claimNumber" className="claimNumber" columnClassName="claimNumber" dataSort>Claim No</TableHeaderColumn>
                  <TableHeaderColumn dataField="lossDate" className="lossDate" columnClassName="lossDate" dataSort>Date of Loss</TableHeaderColumn>
                  <TableHeaderColumn dataField="closedDate" className="closedDate" columnClassName="closedDate" dataSort>Closed Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="examiner" className="examiner" columnClassName="examiner" dataSort>Examiner</TableHeaderColumn>
                  <TableHeaderColumn dataField="lossDescription" className="lossDescription" columnClassName="lossDescription" dataSort>Loss Description</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </section> */}
            </div>
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </PolicyConnect>
    );
  }
}

/**
------------------------------------------------
Property type definitions
------------------------------------------------
*/
Coverage.propTypes = {
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
  paymentOptions: state.service.billingOptions,
  summaryLedger: state.service.getSummaryLedger || {},
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Coverage.values', {}),
  initialValues: handleInitialize(state),
  policy: state.service.latestPolicy || {},
  questions: state.questions

});

const mapDispatchToProps = dispatch => ({
  actions: {
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Coverage' })(Coverage));
