import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import localStorage from 'localStorage';
import { reduxForm, propTypes } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as questionsActions from '../../actions/questionsActions';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as policyStateActions from '../../actions/policyStateActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';

export const getPropertyAppraisialLink = (county, questions) => {
  const answers = _.get(_.find(questions, { name: 'propertyAppraisal' }), 'answers') || [];
  return _.find(answers, { label: county }) || {};
};

const handleInitialize = state => state.service.latestPolicy;

export class Coverage extends Component {

  componentDidMount() {
    this.props.actions.questionsActions.getUIQuestions('propertyAppraisalCSR');
    const isNewTab = localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      localStorage.setItem('isNewTab', false);
      const policyNumber = localStorage.getItem('policyNumber');
      this.props.actions.policyStateActions.updatePolicy(true, policyNumber);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy.policyNumber) {
        this.props.actions.serviceActions.getSummaryLedger(nextProps.policy.policyNumber);
        const paymentOptions = {
          effectiveDate: nextProps.policy.effectiveDate,
          policyHolders: nextProps.policy.policyHolders,
          additionalInterests: nextProps.policy.additionalInterests,
          netPremium: nextProps.policy.rating.netPremium,
          fees: {
            empTrustFee: nextProps.policy.rating.worksheet.fees.empTrustFee,
            mgaPolicyFee: nextProps.policy.rating.worksheet.fees.mgaPolicyFee
          },
          totalPremium: nextProps.policy.rating.totalPremium
        };
        this.props.actions.serviceActions.getBillingOptions(paymentOptions);
      }
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

    const { questions, summaryLedger, paymentOptions } = this.props;

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
        value: `${_.get(_.find(_.get(paymentOptions, 'options'), option => option.billToId === _.get(summaryLedger, 'billToId')), 'displayText')}`
      }, {
        coverage: 'Bill Plan',
        value: _.get(summaryLedger, 'billPlan')
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
      return (<PolicyConnect>
        <ClearErrorConnect />
      </PolicyConnect>);
    }
    return (
      <PolicyConnect>
        <ClearErrorConnect />
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
                      <dt>Year Home Built</dt>
                      <dd>{propertyData.yearBuilt}</dd>
                      <dt>Construction</dt>
                      <dd>{propertyData.constructionType}</dd>
                      <dt>Year Roof Built</dt>
                      <dd>{propertyData.yearOfRoof}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Protection Class</dt>
                      <dd>{propertyData.protectionClass}</dd>
                      <dt>BCEG</dt>
                      <dd>{propertyData.buildingCodeEffectivenessGrading}</dd>
                      <dt>Family Units</dt>
                      <dd>{propertyData.familyUnits}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Dist. to Tidal Waters</dt>
                      <dd>{propertyData.distanceToTidalWater} ft.</dd>
                      <dt>Dist. to Fire Hydrant</dt>
                      <dd>{propertyData.distanceToFireHydrant ? `${propertyData.distanceToFireHydrant} ft.` : '-'}</dd>
                      <dt>Dist. to Fire Station</dt>
                      <dd>{propertyData.distanceToFireStation} mi.</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Residence Type</dt>
                      <dd>{propertyData.residenceType}</dd>
                      <dt>Square Footage</dt>
                      <dd>{propertyData.squareFeet}</dd>
                      <dt>Flood Zone</dt>
                      <dd>{propertyData.floodZone}</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Appraiser</dt>
                      <dd>
                        <a
                          target="_blank" rel="noopener noreferrer"
                          href={getPropertyAppraisialLink(propertyData.physicalAddress.county, questions).answer}
                        >{getPropertyAppraisialLink(propertyData.physicalAddress.county, questions).label}</a>
                      </dd>
                      <dt>Territory</dt>
                      <dd>{_.get(rating, 'worksheet.elements.territoryFactors.name') || '-'}</dd>
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
            </section>*/}
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
  policyId: state.policy.policyId,
  updatePolicy: state.policy.updatePolicy,
  paymentOptions: state.service.billingOptions,
  summaryLedger: state.service.getSummaryLedger,
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
