import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from 'lodash';
import {reduxForm, propTypes} from 'redux-form';
import * as cgActions from '../actions/cgActions';
import * as appStateActions from '../actions/appStateActions';
import PolicyConnect from './Policy';
import ClearErrorConnect from '../components/Error/ClearError';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const handleInitialize = (state) => {
  const formValues = {
    textField1: '',
    billTo: 'Mortgagee',
    billPlan: 'Annual',
    textField2: '5000',
    isActive: true,
    deductible: 200000
  };
  return formValues;
};

const claims = [
  {
    claimNumber: '12345',
    lossID: '1234',
    lossDate: '01/01/2000',
    reportDate: '01/09/2000',
    closedDate: '03/01/2000',
    examiner: 'William Churchhill',
    examinerPhone: '555-555-5555',
    lossDescription: 'Desc: Noticed discoloration on floor.'
  }, {
    claimNumber: '67890',
    lossID: '5678',
    lossDate: '01/01/2002',
    reportDate: '01/05/2002',
    closedDate: '02/01/2002',
    examiner: 'Bob McCann',
    examinerPhone: '555-555-5523',
    lossDescription: 'Desc: Noticed discoloration on wall.'
  }
];

const cov1 = [
  {
    coverage: 'Building',
    value: '$257,500'
  }, {
    coverage: 'Other Structures',
    value: '$25,750'
  }, {
    coverage: 'Contents',
    value: '$90,125'
  }, {
    coverage: 'Additional Living Expenses',
    value: '$25,750'
  }, {
    coverage: 'Liability',
    value: '$300,000'
  }, {
    coverage: 'Medical Payment',
    value: '$2,000'
  }
];

const cov2 = [
  {
    coverage: 'Mold Property',
    value: '$ 25,000'
  }, {
    coverage: 'Mold Liability',
    value: '$ 50,000'
  }, {
    coverage: 'Loss Assessment',
    value: '$ 1,000'
  }, {
    coverage: 'Wind Mit Factor',
    value: '0.46'
  }, {
    coverage: 'Flood Building',
    value: '0'
  }, {
    coverage: 'Flood Contents',
    value: '0'
  }
];

const cov3 = [
  {
    coverage: 'Wind Excluded',
    value: 'No'
  }, {
    coverage: 'Flood Excluded',
    value: 'No'
  }, {
    coverage: 'Content Replacement Cost',
    value: 'Yes'
  }, {
    coverage: 'Inc Ordinance Coverage',
    value: 'No'
  }, {
    coverage: 'Condo Owners Special',
    value: 'No'
  }
];

const cov4 = [
  {
    coverage: 'Property Ever Rented',
    value: 'No'
  }, {
    coverage: 'Seasonally Occupied',
    value: 'No'
  }, {
    coverage: 'No Prior Insurance',
    value: 'No'
  }, {
    coverage: 'Voluntary Writing Credit',
    value: 'No'
  }, {
    coverage: 'Incidental Occ Main',
    value: 'No'
  }, {
    coverage: 'Incidental Occ Other',
    value: 'No'
  }
];

const deduc1 = [
  {
    coverage: 'Deductible',
    value: '$ 2,500'
  }, {
    coverage: 'Hurricane Deductible',
    value: '2% ($ 5,150)'
  }, {
    coverage: 'Other Wind Deductible',
    value: 'Excl'
  }
];

const deduc2 = [
  {
    coverage: 'Sinkhole Deductible',
    value: 'Excl'
  }, {
    coverage: 'Flood Deductible',
    value: '2% ($5,150)'
  }
];

const prem = [
  {
    coverage: 'Current Premium',
    value: '$ 3,422'
  }, {
    coverage: 'Initial Premium',
    value: '$ 3,422'
  }
];

const bill = [
  {
    coverage: 'Balance Due',
    value: '$ 3,422'
  }, {
    coverage: 'Next Payment',
    value: '$ 3,422'
  }, {
    coverage: 'Bill To',
    value: 'Annual'
  }, {
    coverage: 'Bill Plan',
    value: '1st Mortgagee'
  }
];

/** 
------------------------------------------------
The render is where all the data is being pulled 
from the props. The quote data data comes from the 
previous task which is createQuote / singleQuote. 
This might not be the case in later calls, you may 
need to pull it from another place in the model
------------------------------------------------
*/

export const Coverage = (props) => {
  return (
    <PolicyConnect>
      <ClearErrorConnect/>
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <section>
              <h4>Covreage &amp; Premium</h4>
              <div className="coverage-premium">
                <div className="responsive-tables">
                  <div className="table-view">
                    <BootstrapTable className="" data={cov1} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="" data={cov2} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="" data={cov3} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="" data={cov4} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Coverage</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
                <div className="responsive-tables">
                  <div className="table-view">
                    <BootstrapTable className="deductible" data={deduc1} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Deductible</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="deductible" data={deduc2} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Deductible</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="premium" data={prem} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Premium</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                  <div className="table-view">
                    <BootstrapTable className="billing" data={bill} striped hover>
                      <TableHeaderColumn isKey dataField="coverage" className="coverage" columnClassName="coverage">Billing</TableHeaderColumn>
                      <TableHeaderColumn dataField="value" className="value" columnClassName="value" dataAlign='right'>Value</TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h4>Property Info</h4>
              <div className="property-info">
                <dl>
                  <div>
                    <dt>Year Built</dt>
                    <dd>2001</dd>
                    <dt>Year of Roof</dt>
                    <dd>2001</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Construction Type</dt>
                    <dd>Masonry</dd>
                    <dt>Territory</dt>
                    <dd>Tampa, Hillsborough</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Square Footage</dt>
                    <dd>2,124</dd>
                    <dt>Number of Stories</dt>
                    <dd>1</dd>
                  </div>
                </dl>
                <dl>
                  <div>
                    <dt>Flood Zone</dt>
                    <dd>X</dd>
                    <dt>Iffy</dt>
                    <dd>--</dd>
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
            <section>
              <h4>Claims</h4>
              <div className="table-view claims">
                <BootstrapTable className="" data={claims} striped hover>
                  <TableHeaderColumn isKey dataField="claimNumber" className="claimNumber" columnClassName="claimNumber" dataSort>Claim No</TableHeaderColumn>
                  <TableHeaderColumn dataField="lossID" className="lossID" columnClassName="lossID" dataSort>Loss ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="lossDate" className="lossDate" columnClassName="lossDate" dataSort>Loss Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="reportDate" className="reportDate" columnClassName="reportDate" dataSort>Loss Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="closedDate" className="closedDate" columnClassName="closedDate" dataSort>Closed Date</TableHeaderColumn>
                  <TableHeaderColumn dataField="examiner" className="examiner" columnClassName="examiner" dataSort>Examiner</TableHeaderColumn>
                  <TableHeaderColumn dataField="examinerPhone" className="examinerPhone" columnClassName="examinerPhone" dataSort>Examiner Ph</TableHeaderColumn>
                  <TableHeaderColumn dataField="lossDescription" className="lossDescription" columnClassName="lossDescription" dataSort>Loss Description</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </section>
          </div>
        </div>
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
    data: PropTypes.shape({submitting: PropTypes.boolean})
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
  initialValues: handleInitialize(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'Coverage'})(Coverage));
