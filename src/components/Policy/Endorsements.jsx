import React from 'react';
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
import UnderwritingValidationBarConnect from '../../components/Quote/UnderwritingValidationBar';

const handleGetPolicy = (state) => {
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
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

export const Coverage = (props) => {
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
      amount: `${_.get(deductibles, 'sinkhole.amount') ? _.get(deductibles, 'sinkhole.amount')  + '%' : 'No'}`
    }
  ];

  var endorsements = [
    { date: '03/30/2017', amount: '-$ 85', type: '???'},
    { date: '02/20/2016', amount: '-$ 20', type: '???'},
    { date: '01/10/2015', amount: '-$ 35', type: '???'}

  ]

  class PrevEndorsements extends React.Component {
    render() {
      return (
        <BootstrapTable data={ endorsements }>
          <TableHeaderColumn dataField='date' isKey>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
          <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
        </BootstrapTable>
      );
    }
}

  const propertyData = property || {};
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

            <a name="coverage"></a>
              <section>

                <h3>Coverage</h3>

              <div className="flex-parent">
                {/* Col1 */}
                <div className="flex-child col3">

                    <div className="form-group labels">
                      <label></label><label>Current</label><label>New</label>
                    </div>
                    <div className="form-group">
                      <label>Dwelling (<span>A $ 120,000 - $ 1,200,000</span>)</label>
                        <input type="numeric" value="298900" disabled/>
                        <input type="numeric" value="298900"/>
                    </div>
                    <div className="form-group">
                      <label>Other Structures (B)</label>
                      <input type="numeric" value="298900" disabled/>
                      <input type="numeric" value="298900"/>
                    </div>
                    <div className="form-group">
                      <label></label>
                      <input type="text" value="2%" disabled/>
                      <select>
                        <option>2%</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Peronal Property (C)</label>
                      <input type="numeric" value="5000" disabled/>
                      <input type="numeric" value="5000"/>
                    </div>
                    <div className="form-group">
                      <label></label>
                      <input type="text" value="Other" disabled/>
                      <select>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Additional Living Expenses</label>
                        <input type="numeric" value="25750" disabled/>
                        <input type="numeric" value="25750" disabled/>
                    </div>
                    <div className="form-group">
                      <label>Loss of Use (D)</label>
                        <input type="numeric" value="5000" disabled/>
                        <input type="numeric" value="5000" disabled/>
                    </div>
                    <div className="form-group">
                      <label>Personal Liability (E)</label>
                      <input type="numeric" value="100000" disabled/>
                      <select>
                        <option>100000</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Medical Payments (F)</label>
                      <input type="numeric" value="2000" disabled/>
                      <input type="numeric" value="2000" disabled/>
                    </div>
                    <div className="form-group">
                      <label>Mold Property Limit</label>
                      <input type="numeric" value="25,000" disabled/>
                      <select>
                        <option>25,000</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Mold Liability Limit</label>
                      <input type="numeric" value="50,000" disabled/>
                      <select>
                        <option>50,000</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>AOP Deductible</label>
                      <input type="numeric" value="2500" disabled/>
                      <input type="numeric" value="2500" />
                    </div>
                    <div className="form-group">
                      <label>Hurricane Deductible</label>
                      <input type="text" value="2%" disabled/>
                      <select>
                        <option>2%</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Sinkhole Deductible</label>
                      <input type="text" value="Excluded" disabled/>
                      <select>
                        <option>Excluded</option>
                      </select>
                    </div>



                </div>

              {/* Col2 */}
                <div className="flex-child col3">
                  <div className="form-group labels">
                    <label></label><label>Current</label><label>New</label>
                  </div>
                  <div className="form-group">
                    <label>Personal Property Repl Cost</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ordinance or Law Coverage</label>
                    <input type="text" value="25%" disabled/>
                    <select>
                      <option>25%</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Incidental Occ Main</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Incidental Occ Other</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Wind Excluded</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Property Ever Rented</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Seasonally Occupied</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>No Prior Insurance</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Burglar Alarm</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Fire Alarm</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sprinkler</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>BillTo</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Bill Plan</label>
                    <input type="text" value="No" disabled/>
                    <select>
                      <option>No</option>
                    </select>
                  </div>

                </div>

              </div>
              </section>

              <section>

                <div className="flex-parent">
                {/* Col1 */}
                <div className="flex-child col3">

                    <div className="form-group labels">
                      <label></label><label>Current</label><label>New</label>
                    </div>
                    <div className="form-group">
                      <label>Roof Covering</label>
                        <input type="text" value="Non-FBC" disabled/>
                        <select>
                          <option>
                            Non-FBC
                          </option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Roof Deck Attachment</label>
                        <input type="text" value="A" disabled/>
                        <select>
                          <option>
                            A
                          </option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Roof to Wall Attachment</label>
                        <input type="text" value="Toe Nails" disabled/>
                        <select>
                          <option>
                            Toe Nails
                          </option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Roof Geometry</label>
                        <input type="text" value="Flat" disabled/>
                        <select>
                          <option>
                            Flat
                          </option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Secondary Water Resistance (<span>SWR</span>)</label>
                        <input type="text" value="Yes" disabled/>
                        <select>
                          <option>
                            Yes
                          </option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Opening Protection</label>
                        <input type="text" value="Basic" disabled/>
                        <select>
                          <option>
                            Basic
                          </option>
                        </select>
                    </div>

                  </div>

                  {/* Col2 */}
                  <div className="flex-child col3">

                      <div className="form-group labels">
                        <label></label><label>Current</label><label>New</label>
                      </div>
                      <div className="form-group">
                        <label>FBC Wind Speed</label>
                          <input type="numeric" value="120" disabled/>
                          <input type="numeric" value="120"/>
                      </div>
                      <div className="form-group">
                        <label>FBC Wind Speed Design</label>
                          <input type="numeric" value="120" disabled/>
                          <input type="numeric" value="120"/>
                      </div>
                      <div className="form-group">
                        <label>Terrain</label>
                          <input type="text" value="B" disabled/>
                          <select>
                            <option>
                              B
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Internal Pressure Design</label>
                          <input type="text" value="Enclosed" disabled/>
                          <select>
                            <option>
                              Enclosed
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Wind Borne Debris Region (<span>WBDR</span>)</label>
                          <input type="text" value="Yes" disabled/>
                          <select>
                            <option>
                              Yes
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Wind Mit Factor</label>
                          <input type="text" value="Yes" disabled/>
                          <select>
                            <option>
                              Yes
                            </option>
                          </select>
                      </div>

                    </div>

                  </div>
                </section>

                <a name="home"></a>
                <section>

                  <h3>Home / Location</h3>

                <div className="flex-parent">
                  {/* Col1 */}
                  <div className="flex-child col3">

                      <div className="form-group labels">
                        <label></label><label>Current</label><label>New</label>
                      </div>
                      <div className="form-group">
                        <label>Year Home Built</label>
                          <input type="numeric" value="1985" disabled/>
                          <select>
                            <option>
                              1985
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Construction</label>
                          <input type="text" value="Masonry" disabled/>
                          <select>
                            <option>
                              Masonry
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Year Roof Built</label>
                          <input type="numeric" value="1981" disabled/>
                          <select>
                            <option>
                              1981
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Protection Class</label>
                          <input type="numeric" value="05" disabled/>
                          <select>
                            <option>
                              05
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>BCEG</label>
                          <input type="numeric" value="99" disabled/>
                          <select>
                            <option>
                              99
                            </option>
                          </select>
                      </div>
                      <div className="form-group">
                        <label>Family Units</label>
                          <input type="text" value="1-2" disabled/>
                          <select>
                            <option>
                              1-2
                            </option>
                          </select>
                      </div>

                    </div>

                    {/* Col2 */}
                    <div className="flex-child col3">

                        <div className="form-group labels">
                          <label></label><label>Current</label><label>New</label>
                        </div>
                        <div className="form-group">
                          <label>Tidal Waters Dist.</label>
                            <input type="numeric" value="1214.4" disabled/>
                            <select>
                              <option>1214.4</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label>Fire Hydrant Dist.</label>
                            <input type="numeric" value="1000" disabled/>
                            <select>
                              <option>1000</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label>Fire Station Dist.</label>
                            <input type="numeric" value="1000" disabled/>
                            <select>
                              <option>1000</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label>Residence Type</label>
                            <input type="text" value="Single Family" disabled/>
                            <select>
                              <option>Single Family</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label>Sq. Ft. of Home</label>
                            <input type="numeric" value="3506" disabled/>
                            <select>
                              <option>3506</option>
                            </select>
                        </div>
                        <div className="form-group">
                          <label>Flood Zone</label>
                            <input type="text" value="A" disabled/>
                            <select>
                              <option>A</option>
                            </select>
                        </div>

                      </div>
                    </div>
                  </section>


                  <section>

                    <h3>Previous Endorsements</h3>

                    <PrevEndorsements />


            </section>

            <a name="policy"></a>
            <section>

            <div className="flex-parent col2">
              {/* Col1 */}
              <div className="flex-child">
                <h3>Primary Policyholder</h3>

                <div className="flex-parent col2">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value="John" />
                  </div>
                </div>

                <div className="flex-parent col2">
                  <div className="form-group">
                    <label>Primary Phone</label>
                    <input type="text" value="555-555-5555" />
                  </div>
                  <div className="form-group">
                    <label>Secondary Phone</label>
                    <input type="text" value="555-555-5555" />
                  </div>
                </div>

                <div className="flex-parent">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value="user@domain.com" />
                </div>
              </div>

              </div>

              {/* Col2 */}
              <div className="flex-child">
                <h3>Secondary Policyholder</h3>

                <div className="flex-parent col2">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value="John" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value="John" />
                  </div>
                </div>

                <div className="flex-parent col2">
                  <div className="form-group">
                    <label>Primary Phone</label>
                    <input type="text" value="555-555-5555" />
                  </div>
                  <div className="form-group">
                    <label>Secondary Phone</label>
                    <input type="text" value="555-555-5555" />
                  </div>
                </div>

                <div className="flex-parent">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value="user@domain.com" />
                </div>
              </div>

              </div>

            </div>

          </section>

          <a name="addresses"></a>
          <section>
            <h3>Mailing Address</h3>
          <div className="flex-parent col2">


            <div className="flex-child">
              <div className="form-group">
                <label>Address 1</label>
                <input type="text" value="123 M St" />
              </div>
              </div>

              <div className="flex-child">
                <div className="form-group">
                  <label>Address 2</label>
                  <input type="text" value="Apt A" />
                </div>
                </div>

          </div>


          <div className="flex-parent col211">


            <div className="flex-child">
              <div className="form-group">
                <label>City</label>
                <input type="text" value="Anytowne" />
              </div>
              </div>

              <div className="flex-child">
                <div className="form-group">
                  <label>State</label>
                  <select>
                    <option>Please Select</option>
                  </select>
                </div>
                </div>

                <div className="flex-child">
                  <div className="form-group">
                    <label>Zip</label>
                    <input type="numeric" value="12345" />
                  </div>
                  </div>

          </div>

          </section>


          <section>
            <h3>Property Address</h3>
          <div className="flex-parent col2">


            <div className="flex-child">
              <div className="form-group">
                <label>Address 1</label>
                <input type="text" value="123 M St" />
              </div>
              </div>

              <div className="flex-child">
                <div className="form-group">
                  <label>Address 2</label>
                  <input type="text" value="Apt A" />
                </div>
                </div>

          </div>


          <div className="flex-parent col211">


            <div className="flex-child">
              <div className="form-group">
                <label>City</label>
                <input type="text" value="Anytowne" />
              </div>
              </div>

              <div className="flex-child">
                <div className="form-group">
                  <label>State</label>
                  <select>
                    <option>Please Select</option>
                  </select>
                </div>
                </div>

                <div className="flex-child">
                  <div className="form-group">
                    <label>Zip</label>
                    <input type="numeric" value="12345" />
                  </div>
                  </div>

          </div>

          </section>

          <a name="addInt"></a>
          <section className="additionalInterests">
            <h3>Additional Interest</h3>

              <div className="button-group">
                <button className="btn btn-sm btn-secondary" type="button"> <div><i className="fa fa-plus" /><span>Mortgagee</span></div></button>
                <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Insured</span></div></button>
                <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Additional Interest</span></div></button>
                { /* <button disabled={quoteData && _.filter(quoteData.additionalInterests, ai => ai.type === 'Lienholder').length > 1} onClick={() => this.addAdditionalInterest('Lienholder')} className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Lienholder</span></div></button> */ }
                <button className="btn btn-sm btn-secondary" type="button"><div><i className="fa fa-plus" /><span>Billpayer</span></div></button>
              </div>

              <div className="results-wrapper"><ul className="results result-cards"><li><a><div className="card-icon"><i className="fa fa-circle Mortgagee"></i><label>Mortgagee</label></div><section><h4>BANK OF AMERICA</h4><p class="address">123 Main Street, Suite A, Tampa, FL 33333</p></section>
              <div className="ref-number"><label for="ref-number">Reference Number</label><span>76532487</span></div><i className="fa fa-pencil"></i></a></li></ul></div>


          </section>


          </div>

        </div>
        <div className="endo-results-calc">


            <div className="flex-parent">
              <div className="form-group">
                <label>New Endorsement Amount</label>
                <input type="numeric" value="52" />
              </div>
              <div className="form-group">
                <label>New Endorsement Premium</label>
                <input type="numeric" value="3732" />
              </div>
              <div className="form-group">
                <label>New Annual Premium</label>
                <input type="numeric" value="4711" />
              </div>
          </div>


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
                <div className="btn-footer">
                  <button className="btn btn-secondary">Cancel</button>
                  <button className="btn btn-primary">Calculate</button>
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
