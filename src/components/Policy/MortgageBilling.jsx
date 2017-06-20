import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, Form, reset } from 'redux-form';
import moment from 'moment';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
<<<<<<< HEAD
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import CurrencyField from '../Form/inputs/CurrencyField';

const payments = [
  {
    cashDate: '2017-05-17',
    cashDescription: 'PAYMENT RECEIVED',
    batchNumber: '20170527-44',
    amount: 3123,
    cashType: 'CASH'
=======
import normalizeNumber from '../Form/normalizeNumbers';

const payments = [
  {
    date: '05/27/2017',
    description: 'PAYMENT RECEIVED',
    note: '20170527-44',
    amount: `$ ${normalizeNumber(3123)}`
>>>>>>> develop
  }
];

const setRank = (additionalInterests) => {
  _.forEach(additionalInterests, (value) => {
    switch (value.type) {
      case 'Mortgagee':
value.rank = 1; // eslint-disable-line
        break;
      case 'Additional Insured':
value.rank = 2; // eslint-disable-line
        break;
      case 'Additional Interest':
value.rank = 3; // eslint-disable-line
        break;
      case 'Lienholder':
value.rank = 4; // eslint-disable-line
        break;
      case 'Bill Payer':
value.rank = 5; // eslint-disable-line
        break;
      default:
        break;
    }
  });
};

// const handleInitialize = (state) => {
//   const quoteData = handleGetQuoteData(state);

//   const values = {};

//   values.agencyCode = '20000'; // _.get(quoteData, 'agencyCode');
//   values.agentCode = '60000'; // _.get(quoteData, 'agentCode');
//   values.effectiveDate = moment.utc(_.get(quoteData, 'effectiveDate')).format('YYYY-MM-DD');

//   values.pH1email = _.get(quoteData, 'policyHolders[0].emailAddress');
//   values.pH1FirstName = _.get(quoteData, 'policyHolders[0].firstName');
//   values.pH1LastName = _.get(quoteData, 'policyHolders[0].lastName');
//   values.pH1phone = normalizePhone(_.get(quoteData, 'policyHolders[0].primaryPhoneNumber') || '');
//   values.pH1secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[0].secondaryPhoneNumber') || '');

//   values.pH2email = _.get(quoteData, 'policyHolders[1].emailAddress');
//   values.pH2FirstName = _.get(quoteData, 'policyHolders[1].firstName');
//   values.pH2LastName = _.get(quoteData, 'policyHolders[1].lastName');
//   values.pH2phone = normalizePhone(_.get(quoteData, 'policyHolders[1].primaryPhoneNumber') || '');
//   values.pH2secondaryPhone = normalizePhone(_.get(quoteData, 'policyHolders[1].secondaryPhoneNumber') || '');


//   values.address1 = _.get(quoteData, 'property.physicalAddress.address1');
//   values.address2 = _.get(quoteData, 'property.physicalAddress.address2');
//   values.city = _.get(quoteData, 'property.physicalAddress.city');
//   values.state = _.get(quoteData, 'property.physicalAddress.state');
//   values.zip = _.get(quoteData, 'property.physicalAddress.zip');
//   values.protectionClass = _.get(quoteData, 'property.protectionClass');
//   values.constructionType = _.get(quoteData, 'property.constructionType');
//   values.yearOfRoof = _.get(quoteData, 'property.yearOfRoof');
//   values.squareFeet = _.get(quoteData, 'property.squareFeet');
//   values.yearBuilt = _.get(quoteData, 'property.yearBuilt');
//   values.buildingCodeEffectivenessGrading = _.get(quoteData, 'property.buildingCodeEffectivenessGrading');
//   values.familyUnits = _.get(quoteData, 'property.familyUnits');
//   values.distanceToTidalWater = _.get(quoteData, 'property.distanceToTidalWater');
//   values.distanceToFireHydrant = _.get(quoteData, 'property.distanceToFireHydrant');
//   values.distanceToFireStation = _.get(quoteData, 'property.distanceToFireStation');
//   values.floodZone = _.get(quoteData, 'property.floodZone');

//   values.burglarAlarm = _.get(quoteData, 'property.burglarAlarm');
//   values.fireAlarm = _.get(quoteData, 'property.fireAlarm');
//   values.sprinkler = _.get(quoteData, 'property.sprinkler');

//   values.dwellingAmount = _.get(quoteData, 'coverageLimits.dwelling.amount');
//   values.dwellingMin = _.get(quoteData, 'coverageLimits.dwelling.minAmount');
//   values.dwellingMax = _.get(quoteData, 'coverageLimits.dwelling.maxAmount');

//   values.lossOfUse = _.get(quoteData, 'coverageLimits.lossOfUse.amount');
//   values.medicalPayments = _.get(quoteData, 'coverageLimits.medicalPayments.amount');
//   values.moldLiability = _.get(quoteData, 'coverageLimits.moldLiability.amount');
//   values.moldProperty = _.get(quoteData, 'coverageLimits.moldProperty.amount');
//   values.ordinanceOrLaw = _.get(quoteData, 'coverageLimits.ordinanceOrLaw.amount');

//   const otherStructures = _.get(quoteData, 'coverageLimits.otherStructures.amount');
//   const dwelling = _.get(quoteData, 'coverageLimits.dwelling.amount');
//   const personalProperty = _.get(quoteData, 'coverageLimits.personalProperty.amount');
//   const hurricane = _.get(quoteData, 'deductibles.hurricane.amount');

//   values.otherStructuresAmount = otherStructures;
//   values.otherStructures = String(calculatePercentage(otherStructures, dwelling));
//   values.personalLiability = _.get(quoteData, 'coverageLimits.personalLiability.amount');
//   values.personalPropertyAmount = String(personalProperty);
//   values.personalProperty = String(calculatePercentage(personalProperty, dwelling));
//   values.personalPropertyReplacementCostCoverage = _.get(quoteData, 'coverageOptions.personalPropertyReplacementCost.answer');

//   values.sinkholePerilCoverage = _.get(quoteData, 'coverageOptions.sinkholePerilCoverage.answer');

//   values.allOtherPerils = _.get(quoteData, 'deductibles.allOtherPerils.amount');
//   values.hurricane = hurricane;

//   values.calculatedHurricane = _.get(quoteData, 'deductibles.hurricane.calculatedAmount');

//   values.floridaBuildingCodeWindSpeed = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeed');
//   values.floridaBuildingCodeWindSpeedDesign = _.get(quoteData, 'property.windMitigation.floridaBuildingCodeWindSpeedDesign');
//   values.internalPressureDesign = _.get(quoteData, 'property.windMitigation.internalPressureDesign');
//   values.openingProtection = _.get(quoteData, 'property.windMitigation.openingProtection');
//   values.roofCovering = _.get(quoteData, 'property.windMitigation.roofCovering');
//   values.roofDeckAttachment = _.get(quoteData, 'property.windMitigation.roofDeckAttachment');
//   values.roofGeometry = _.get(quoteData, 'property.windMitigation.roofGeometry');
//   values.roofToWallConnection = _.get(quoteData, 'property.windMitigation.roofToWallConnection');
//   values.secondaryWaterResistance = _.get(quoteData, 'property.windMitigation.secondaryWaterResistance');
//   values.terrain = _.get(quoteData, 'property.windMitigation.terrain');
//   values.windBorneDebrisRegion = _.get(quoteData, 'property.windMitigation.windBorneDebrisRegion');
//   values.residenceType = _.get(quoteData, 'property.residenceType');

//   values.propertyIncidentalOccupanciesMainDwelling = false;
//   values.propertyIncidentalOccupanciesOtherStructures = false;
//   values.liabilityIncidentalOccupancies = false;

//   return values;
// };

const paymentTotal = () => {
  let total = 0;
  for (let i = 0; i < payments.length; i += 1) {
    if (payments[i].cashDescription === 'PAYMENT RECEIVED') {
      total += payments[i].amount;
    }
    if (payments[i].cashDescription === 'PAYMENT RETURNED') {
      total -= payments[i].amount;
    }
  }
  return total.toLocaleString();
};

const handleGetPolicy = (state) => {
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
};

export class PolicyholderAgent extends Component {

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;
    const submitData = data;

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: true });

    submitData.cashDate = moment.utc(data.cashDate).format('YYYY-MM-DD');
    submitData.batchNumber = String(data.batchNumber);
    submitData.amount = Number(String(data.amount).replace(/[^\d]/g, ''));
    submitData.cashType = String(data.cashType);
    submitData.cashDescription = String(data.cashDescription);
    // const steps = [
    //   { name: 'hasUserEnteredData', data: { answer: 'Yes' } },
    //   { name: 'askCustomerData', data: submitData },
    //   { name: 'askToCustomizeDefaultQuote', data: { shouldCustomizeQuote: 'Yes' } },
    //   { name: 'customizeDefaultQuote', data: submitData }

    // ];

    // this.props.actions.cgActions.batchCompleteTask(this.props.appState.modelName, workflowId, steps)
    //   .then(() => {
    //     // now update the workflow details so the recalculated rate shows
    //     this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
    //       workflowId, { ...this.props.appState.data, recalc: false, quote: this.props.quoteData });
    //   });
    payments.push(data);
    this.clearForm();
    paymentTotal();
    console.log(data, payments, 'form data');
  };

  clearForm = () => {
    const { dispatch } = this.props;
    const workflowId = this.props.appState.instanceId;

    dispatch(reset('PolicyholderAgent'));
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName,
      workflowId, { ...this.props.appState.data, submitting: false });
  };

  amountFormatter = cell => `$ ${cell.toLocaleString()}`;

  render() {
    const { additionalInterests } = this.props.policy;
    const { handleSubmit, pristine, summaryLedger } = this.props;
    setRank(additionalInterests);
    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="payment-summary">
                <h3>Billing</h3>
                <div className="payment-summary">
                  <dl>
                    <div>
                      <dt>Bill To</dt>
                      <dd>{this.props.policy.billToType}
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <div>
                      <dt>Bill Plan</dt>
                      <dd>{this.props.policy.billPlan}</dd>
                    </div>
                  </dl>
                </div>
                <div className="flex-parent">
                  <h3 className="flex-child">Payments</h3>
                </div>
                <div className="payment-summary grid">
                  <div className="table-view">
                    <BootstrapTable className="" data={payments} striped hover>
                      <TableHeaderColumn isKey dataField="cashDate" className="date" columnClassName="date" width="100" dataSort>Date</TableHeaderColumn>
                      <TableHeaderColumn dataField="cashDescription" className="description" columnClassName="description" dataSort>Description</TableHeaderColumn>
                      <TableHeaderColumn dataField="cashType" className="type" columnClassName="type" dataSort width="200" >Type</TableHeaderColumn>
                      <TableHeaderColumn dataField="batchNumber" className="note" columnClassName="note" dataSort width="200" >Note</TableHeaderColumn>
                      <TableHeaderColumn dataField="amount" dataFormat={this.amountFormatter} className="amount" columnClassName="amount" width="150" dataSort dataAlign="right">Amount</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <dl className="total">
                    <div>
                    {console.log(summaryLedger, 'summaryLedger')}
                      {`Total $ ${paymentTotal()}`}
                    </div>
                  </dl>
                </div>
<<<<<<< HEAD
              </section>


              {/* TODO: This section needs to be hidden per role */}
              <section className="add-payment">

                <h3>Add Payment</h3>

                <Form id="PolicyholderAgent" onSubmit={handleSubmit(this.handleFormSubmit)} noValidate>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Cash Date'} styleName={''} name={'cashDate'} type={'date'} />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <TextField validations={['required']} label={'Batch Number'} styleName={''} name={'batchNumber'} />
                      </div>
                    </div>
                  </div>

                  <div className="flex-parent">
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashType" component="select" label="Cash Type" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'CASH',
                              label: 'Cash'
                            }, {
                              answer: 'CREDIT',
                              label: 'Credit'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <SelectField
                          name="cashDescription" component="select" label="Description" onChange={function () {}} validations={['required']} answers={[
                            {
                              answer: 'PAYMENT RECEIVED',
                              label: 'Payment Received'
                            }, {
                              answer: 'PAYMENT RETURNED',
                              label: 'Payment Returned'
                            }
                          ]}
                        />
                      </div>
                    </div>
                    <div className="flex-child">
                      <div className="form-group">
                        <CurrencyField
                          validations={['required']} label="Amount" styleName={''} name={'amount'}
                        />
                      </div>
                    </div>
=======
                <dl className="total">
                  <div>
                    <dt>Total Received</dt>
                    <dd>$ {normalizeNumber(3123)}</dd>
>>>>>>> develop
                  </div>
                  <div className="btn-footer">
                    <button className="btn btn-secondary" type="button" form="PolicyholderAgent" onClick={this.clearForm}>Cancel</button>
                    <button className="btn btn-primary" type="submit" form="PolicyholderAgent" disabled={this.props.appState.data.submitting || pristine}>Save</button>
                  </div>
                </Form>
              </section>

              <section className="additional-interests">
                <h3>Additional Interests</h3>
                <div className="results-wrapper">
                  <ul className="results result-cards">
                    {additionalInterests && _.sortBy(additionalInterests, ['rank', 'type']).map((ai, index) =>
                      <li key={index}>
                        <a>
                          {/* add className based on type - i.e. mortgagee could have class of mortgagee*/}
                          <div className="card-icon"><i className={`fa fa-circle ${ai.type}`} /><label>{ai.type} {ai.order + 1}</label></div>
                          <section><h4>{ai.name1}&nbsp;{ai.name2}</h4>
                            <p className="address">{
                             `${ai.mailingAddress.address1}, 
                              ${ai.mailingAddress.address2 ? `${ai.mailingAddress.address2},` : ''} ${ai.mailingAddress.city}, 
                              ${ai.mailingAddress.state} 
                              ${ai.mailingAddress.zip}`
                            }</p>
                          </section>
                          <div className="ref-number">
                            <label htmlFor="ref-number">Reference Number</label>
                            <span>{` ${ai.referenceNumber || ' - '}`}</span>
                          </div>
                        </a>
                      </li>
                      )}
                  </ul>
                </div>
              </section>

            </div>
          </div>
        </div>
      </PolicyConnect>
    );
  }
}

PolicyholderAgent.propTypes = {
  policy: PropTypes.shape()
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/

const mapStateToProps = state => ({
  policy: handleGetPolicy(state),
  tasks: state.cg,
  appState: state.appState
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'PolicyholderAgent', enableReinitialize: true })(PolicyholderAgent));
