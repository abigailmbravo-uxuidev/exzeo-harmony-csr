import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _get from 'lodash/get';
import _find from 'lodash/find';
import moment from 'moment';
import { Loader } from '@exzeo/core-ui';

import { getUIQuestions } from '../../state/actions/questions.actions';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';

export const getPropertyAppraisalLink = (county, questions) => {
  const question = questions.propertyAppraisal || {};
  const answers = question.answers || [];
  return _find(answers, { label: county }) || {};
};

export class Coverage extends Component {
  componentDidMount() {
    this.props.getUIQuestions('propertyAppraisalCSR');
  }

  render() {
    const {
      summaryLedger,
      questions,
      paymentOptions,
      policy,
      policy: {
        coverageLimits,
        coverageOptions,
        deductibles,
        property,
        rating,
        underwritingAnswers
      }
    } = this.props;

    const monthsOccupied = underwritingAnswers
      ? underwritingAnswers.monthsOccupied.answer
      : null;

    const discountSurcharge = [
      {
        discountSurcharge: 'Townhouse/Rowhouse',
        value: _get(property, 'townhouseRowhouse') === false ? 'No' : 'Yes'
      },
      {
        discountSurcharge: 'Property Ever Rented',
        value:
          _get(underwritingAnswers, 'rented.answer') === 'Yes' ? 'Yes' : 'No'
      },
      {
        discountSurcharge: 'Seasonally Occupied',
        value:
          monthsOccupied === '10+' || monthsOccupied === '7-9' ? 'No' : 'Yes'
      },
      {
        discountSurcharge: 'No Prior Insurance',
        value: _get(underwritingAnswers, 'noPriorInsuranceSurcharge.answer')
      },
      {
        discountSurcharge: 'Burglar Alarm',
        value: _get(property, 'burglarAlarm') ? 'Yes' : 'No'
      },
      {
        discountSurcharge: 'Fire Alarm',
        value: _get(property, 'fireAlarm') ? 'Yes' : 'No'
      },
      {
        discountSurcharge: 'Sprinkler',
        value:
          _get(property, 'sprinkler') === 'N'
            ? 'No'
            : _get(property, 'sprinkler')
      },
      {
        discountSurcharge: 'Wind Mit Factor',
        value: _get(
          rating,
          'worksheet.elements.windMitigationFactors.windMitigationDiscount'
        )
          ? _get(
              rating,
              'worksheet.elements.windMitigationFactors.windMitigationDiscount'
            )
          : '0'
      }
    ];

    const coverageLimitsData = [
      {
        coverage: 'Dwelling Limit',
        value: `$ ${normalizeNumbers(_get(coverageLimits, 'dwelling.amount'))}`
      },
      {
        coverage: 'Other Structures Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'otherStructures.amount')
        )}`
      },
      {
        coverage: 'Personal Property Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'personalProperty.amount')
        )}`
      },
      {
        coverage: 'Loss of Use Limit',
        value: `$ ${normalizeNumbers(_get(coverageLimits, 'lossOfUse.amount'))}`
      },
      {
        coverage: 'Personal Liability Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'personalLiability.amount')
        )}`
      },
      {
        coverage: 'Medical Payments to Others Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'medicalPayments.amount')
        )}`
      }
    ];

    const coverageOptionsData = [
      {
        coverage: 'Mold Property Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'moldProperty.amount')
        )}`
      },
      {
        coverage: 'Mold Liability Limit',
        value: `$ ${normalizeNumbers(
          _get(coverageLimits, 'moldLiability.amount')
        )}`
      },
      {
        coverage: 'Personal Property Repl Cost',
        value: _get(coverageOptions, 'personalPropertyReplacementCost.answer')
          ? 'Yes'
          : 'No'
      },
      {
        coverage: 'Ordinance or Law Coverage Limit',
        value: `${_get(coverageLimits, 'ordinanceOrLaw.amount')}%`
      },
      {
        coverage: 'Incidental Occ Main',
        value: _get(
          coverageOptions,
          'propertyIncidentalOccupanciesMainDwelling.answer'
        )
          ? 'Yes'
          : 'No'
      },
      {
        coverage: 'Incidental Occ Other',
        value: _get(
          coverageOptions,
          'propertyIncidentalOccupanciesOtherStructures.answer'
        )
          ? 'Yes'
          : 'No'
      },
      {
        coverage: 'Incidental Occ Liability',
        value: _get(coverageOptions, 'liabilityIncidentalOccupancies.answer')
          ? 'Yes'
          : 'No'
      }
    ];

    const premium = [
      {
        premium: 'Current Premium',
        value: `$ ${normalizeNumbers(
          _get(summaryLedger, 'currentPremium') || 0
        )}`
      },
      {
        premium: 'Initial Premium',
        value: `$ ${normalizeNumbers(
          _get(summaryLedger, 'initialPremium') || 0
        )}`
      },
      {
        premium: 'Balance Due',
        value: `$ ${normalizeNumbers(
          _get(summaryLedger, 'balance.$numberDecimal') || 0
        )}`
      }
    ];

    const billing = [
      {
        coverage: 'Next Payment',
        value: `$ ${normalizeNumbers(
          _get(summaryLedger, 'noticeAmountDue.$numberDecimal') || 0
        )}`
      },
      {
        coverage: 'Payment Due',
        value: _get(summaryLedger, 'invoiceDueDate')
          ? moment(_get(summaryLedger, 'invoiceDueDate')).format('L')
          : '-'
      },
      {
        coverage: 'Bill To',
        value: `${_get(
          _find(
            _get(paymentOptions, 'options'),
            option => option.billToId === _get(policy, 'billToId')
          ),
          'displayText'
        )}`
      },
      {
        coverage: 'Bill Plan',
        value: _get(policy, 'billPlan')
      }
    ];

    const deductibleData = [
      {
        displayText: 'All Other Perils',
        amount: `$ ${normalizeNumbers(
          _get(deductibles, 'allOtherPerils.amount')
        )}`
      },
      {
        displayText: 'Hurricane',
        amount: `${_get(deductibles, 'hurricane.amount')}%`
      },
      {
        displayText: 'Sinkhole',
        amount: _get(deductibles, 'sinkhole.amount')
          ? `${_get(deductibles, 'sinkhole.amount')}%`
          : 'No'
      }
    ];

    const propertyData = property || {};
    if (!policy.policyID) return <Loader />;

    return (
      <React.Fragment>
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section>
                <h3>Coverage and Premium</h3>
                <div className="coverage-premium">
                  <div className="responsive-tables">
                    <div className="table-view">
                      <BootstrapTable
                        className=""
                        data={coverageLimitsData}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="coverage"
                          className="coverage"
                          columnClassName="coverage"
                        >
                          Coverage Limits
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="value"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable
                        className=""
                        data={coverageOptionsData}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="coverage"
                          className="coverage"
                          columnClassName="coverage"
                        >
                          Coverage Limits
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="value"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable
                        className=""
                        data={discountSurcharge}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="discountSurcharge"
                          className="discountSurcharge"
                          columnClassName="discountSurcharge"
                        >
                          Discount/Surcharge
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="value"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                  <div className="responsive-tables">
                    <div className="table-view">
                      <BootstrapTable
                        className="deductible"
                        data={deductibleData}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="displayText"
                          className="coverage"
                          columnClassName="coverage"
                        >
                          Deductible
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="amount"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable
                        className="premium"
                        data={premium}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="premium"
                          className="coverage"
                          columnClassName="coverage"
                        >
                          Premium
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="value"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                    <div className="table-view">
                      <BootstrapTable
                        className="billing"
                        data={billing}
                        striped
                        hover
                      >
                        <TableHeaderColumn
                          isKey
                          dataField="coverage"
                          className="coverage"
                          columnClassName="coverage"
                        >
                          Billing
                        </TableHeaderColumn>
                        <TableHeaderColumn
                          dataField="value"
                          className="value"
                          columnClassName="value"
                          dataAlign="right"
                        >
                          Value
                        </TableHeaderColumn>
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
                      <dd className="yearHomeBuilt">
                        {propertyData.yearBuilt}
                      </dd>
                      <dt className="construction">Construction</dt>
                      <dd className="construction">
                        {propertyData.constructionType}
                      </dd>
                      <dt className="yearRoofBuilt">Year Roof Built</dt>
                      <dd className="yearRoofBuilt">
                        {propertyData.yearOfRoof}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="protectionClass">Protection Class</dt>
                      <dd className="protectionClass">
                        {propertyData.protectionClass}
                      </dd>
                      <dt className="BCEG">BCEG</dt>
                      <dd className="BCEG">
                        {propertyData.buildingCodeEffectivenessGrading}
                      </dd>
                      <dt className="familyUnits">Family Units</dt>
                      <dd className="familyUnits">
                        {propertyData.familyUnits}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="distToTidalWaters">
                        Dist. to Tidal Waters
                      </dt>
                      <dd className="distToTidalWaters">
                        {normalizeNumbers(propertyData.distanceToTidalWater)}{' '}
                        ft.
                      </dd>
                      <dt className="distToFireHydrant">
                        Dist. to Fire Hydrant
                      </dt>
                      <dd className="distToFireHydrant">
                        {propertyData.distanceToFireHydrant
                          ? `${normalizeNumbers(
                              propertyData.distanceToFireHydrant
                            )} ft.`
                          : '-'}
                      </dd>
                      <dt className="distToFireStation">
                        Dist. to Fire Station
                      </dt>
                      <dd className="distToFireStation">
                        {propertyData.distanceToFireStation} mi.
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="residenceType">Residence Type</dt>
                      <dd className="residenceType">
                        {propertyData.residenceType}
                      </dd>
                      <dt className="squareFootage">Square Footage</dt>
                      <dd className="squareFootage">
                        {propertyData.squareFeet}
                      </dd>
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
                          href={
                            getPropertyAppraisalLink(
                              propertyData.physicalAddress.county,
                              questions
                            ).answer
                          }
                        >
                          {
                            getPropertyAppraisalLink(
                              propertyData.physicalAddress.county,
                              questions
                            ).label
                          }
                        </a>
                      </dd>
                      <dt className="territory">Territory</dt>
                      <dd className="territory">
                        {_get(
                          rating,
                          'worksheet.elements.territoryFactors.name'
                        ) || '-'}
                      </dd>
                      <dt className="igdid">IGD ID</dt>
                      <dd className="igdid">{propertyData.id}</dd>
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
                      <dd className="roofCovering">
                        {property.windMitigation.roofCovering}
                      </dd>
                      <dt className="roofDeckAttachment">
                        Roof Deck Attachment
                      </dt>
                      <dd className="roofDeckAttachment">
                        {property.windMitigation.roofDeckAttachment}
                      </dd>
                      <dt className="roofToWallAttachment">
                        Roof to Wall Attachment
                      </dt>
                      <dd className="roofToWallAttachment">
                        {property.windMitigation.roofToWallConnection}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="roofGeometry">Roof Geometry</dt>
                      <dd className="roofGeometry">
                        {property.windMitigation.roofGeometry}
                      </dd>
                      <dt className="SWR">Secondary Water Resistance (SWR)</dt>
                      <dd className="SWR">
                        {property.windMitigation.secondaryWaterResistance}
                      </dd>
                      <dt className="openingProtection">Opening Protection</dt>
                      <dd className="openingProtection">
                        {property.windMitigation.openingProtection}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="windSpeed">FBC Wind Speed</dt>
                      <dd className="windSpeed">
                        {property.windMitigation.floridaBuildingCodeWindSpeed}
                      </dd>
                      <dt className="windSpeedDesign">FBC Wind Speed Design</dt>
                      <dd className="windSpeedDesign">
                        {
                          property.windMitigation
                            .floridaBuildingCodeWindSpeedDesign
                        }
                      </dd>
                      <dt className="terrain">Terrain</dt>
                      <dd className="terrain">
                        {property.windMitigation.terrain}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt className="internalPressureDesign">
                        Internal Pressure Design
                      </dt>
                      <dd className="internalPressureDesign">
                        {property.windMitigation.internalPressureDesign}
                      </dd>
                      <dt className="WBDR">Wind Borne Debris Region (WBDR)</dt>
                      <dd className="WBDR">
                        {property.windMitigation.windBorneDebrisRegion}
                      </dd>
                      <dt className="windMitFactor">Wind Mit Factor</dt>
                      <dd className="windMitFactor">
                        {_get(
                          _find(discountSurcharge, {
                            discountSurcharge: 'Wind Mit Factor'
                          }),
                          'value'
                        )}
                      </dd>
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
      </React.Fragment>
    );
  }
}

Coverage.propTypes = {
  paymentOptions: PropTypes.object,
  policy: PropTypes.object,
  policyID: PropTypes.string,
  questions: PropTypes.object,
  summaryLedger: PropTypes.object
};

const mapStateToProps = state => ({
  paymentOptions: state.policyState.billingOptions,
  policy: state.policyState.policy,
  policyID: state.policyState.policyID,
  questions: state.questions,
  summaryLedger: state.policyState.summaryLedger
});

export default connect(
  mapStateToProps,
  {
    getUIQuestions
  }
)(Coverage);
