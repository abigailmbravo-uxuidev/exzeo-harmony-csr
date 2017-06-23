import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, propTypes } from 'redux-form';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizeNumbers from '../Form/normalizeNumbers';

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
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

const handleInitialize = state => handleGetPolicy(state);

export class Coverage extends Component {

  componentDidMount() {
    const isNewTab = localStorage.getItem('isNewTab') === 'true';

    if (isNewTab) {
      localStorage.setItem('isNewTab', false);

      this.props.actions.cgActions.startWorkflow('csrQuote', {}).then((result) => {
        const steps = [];
        const lastSearchData = JSON.parse(localStorage.getItem('lastSearchData'));

        steps.push({ name: 'search', data: lastSearchData });

        if (lastSearchData.searchType === 'policy') {
          const policyId = localStorage.getItem('policyID');
          steps.push({
            name: 'choosePolicy',
            data: {
              policyId
            }
          });
        }

        const startResult = result.payload[0].workflowData.csrQuote.data;

        this.props.actions.appStateActions.setAppState('csrQuote', startResult.modelInstanceId, { ...this.props.appState.data, submitting: true });
        this.props.actions.cgActions.batchCompleteTask(startResult.modelName, startResult.modelInstanceId, steps).then(() => {
        });
      });
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
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'dwelling.amount'))}`
      }, {
        coverage: 'Other Structures',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'otherStructures.amount'))}`
      }, {
        coverage: 'Personal Property',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'personalProperty.amount'))}`
      }, {
        coverage: 'Additional Living Expenses',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'lossOfUse.amount'))}`
      }, {
        coverage: 'Personal Liability',
        value: `$ ${normalizeNumbers(_.get(coverageLimits, 'personalLiability.amount'))}`
      }, {
        coverage: 'Medical Payments',
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
      value: `$ ${normalizeNumbers(_.get(rating, 'totalPremium'))}`
    }, {
      premium: 'Initial Premium',
      value: `$ ${normalizeNumbers(_.get(rating, 'netPremium'))}`
    }];

    const billing = [
      {
        coverage: 'Balance Due',
        value: `$ ${normalizeNumbers(_.get(rating, 'totalPremium'))}`
      }, {
        coverage: 'Next Payment',
        value: `$ ${normalizeNumbers(_.get(rating, 'totalPremium'))}`
      }, {
        coverage: 'Bill To',
        value: _.get(this.props.policy, 'billToType')
      }, {
        coverage: 'Bill Plan',
        value: _.get(this.props.policy, 'billPlan')
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
                      <dt>Territory</dt>
                      <dd>{propertyData.territory}</dd>
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
                      <dt>Number of Stories</dt>
                      <dd>-</dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Dist. to Tidal Waters</dt>
                      <dd>{propertyData.distanceToTidalWater} mi.</dd>
                      <dt>Dist. to Fire Hydrant</dt>
                      <dd>-</dd>
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
                        <a href="">appraiser-website.com</a>
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
            </section>*/}
            </div>
          </div>
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
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'Coverage.values', {}),
  initialValues: handleInitialize(state),
  policy: handleGetPolicy(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'Coverage' })(Coverage));
