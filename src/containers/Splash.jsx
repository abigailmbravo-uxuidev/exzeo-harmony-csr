import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';
import NewNoteFileUploader from '../components/Common/NewNoteFileUploader';

var data = [
  {
    type: "quote",
    number: "12-123456",
    policyHolder: "William McWilliamson",
    address: "123 NE 132ND TER, GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "01/01/2018"
  }, {
    type: "policy",
    number: "12-123457-00",
    policyHolder: "William Donaldson",
    address: "123 MAIN ST, GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "12/03/2017"
  }, {
    type: "address",
    number: "--",
    policyHolder: "--",
    address: "123 NE 17 AVE, FT. LAUDERDALE, FL 33301",
    status: "--",
    effectiveDate: "--"
  }, {
    type: "quote",
    number: "12-123458",
    policyHolder: "Michelle Kleinfelterson",
    address: "123 NE 9 AVE, DEERFIELD BEACH, FL 33441",
    status: "STATUS",
    effectiveDate: "11/01/2017"
  }, {
    type: "policy",
    number: "12-123459-00",
    policyHolder: "Tracy Miller",
    address: "123 NW 106 AVE, PLANTATION FL 33324",
    status: "STATUS",
    effectiveDate: "10/01/2016"
  }, {
    type: "policy",
    number: "12-123450-00",
    policyHolder: "Fred Flintstone",
    address: "123 VIRGINIA RD, WEST PARK, FL 33023",
    status: "STATUS",
    effectiveDate: "09/01/2016"
  }, {
    type: "policy",
    number: "12-123457-00",
    policyHolder: "William Donaldson",
    address: "123 MAIN ST, GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "12/03/2017"
  }, {
    type: "address",
    number: "--",
    policyHolder: "--",
    address: "123 NE 17 AVE, FT. LAUDERDALE, FL 33301",
    status: "--",
    effectiveDate: "--"
  }, {
    type: "quote",
    number: "12-123458",
    policyHolder: "Michelle Kleinfelterson",
    address: "123 NE 9 AVE, DEERFIELD BEACH, FL 33441",
    status: "STATUS",
    effectiveDate: "11/01/2017"
  }, {
    type: "policy",
    number: "12-123459-00",
    policyHolder: "Tracy Miller",
    address: "123 NW 106 AVE, PLANTATION FL 33324",
    status: "STATUS",
    effectiveDate: "10/01/2016"
  }, {
    type: "policy",
    number: "12-123450-00",
    policyHolder: "Fred Flintstone",
    address: "123 VIRGINIA RD, WEST PARK, FL 33023",
    status: "STATUS",
    effectiveDate: "09/01/2016"
  }, {
    type: "policy",
    number: "12-123457-00",
    policyHolder: "William Donaldson",
    address: "123 MAIN ST, GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "12/03/2017"
  }, {
    type: "address",
    number: "--",
    policyHolder: "--",
    address: "123 NE 17 AVE, FT. LAUDERDALE, FL 33301",
    status: "--",
    effectiveDate: "--"
  }, {
    type: "quote",
    number: "12-123458",
    policyHolder: "Michelle Kleinfelterson",
    address: "123 NE 9 AVE, DEERFIELD BEACH, FL 33441",
    status: "STATUS",
    effectiveDate: "11/01/2017"
  }, {
    type: "policy",
    number: "12-123459-00",
    policyHolder: "Tracy Miller",
    address: "123 NW 106 AVE, PLANTATION FL 33324",
    status: "STATUS",
    effectiveDate: "10/01/2016"
  }, {
    type: "policy",
    number: "12-123450-00",
    policyHolder: "Fred Flintstone",
    address: "123 VIRGINIA RD, WEST PARK, FL 33023",
    status: "STATUS",
    effectiveDate: "09/01/2016"
  }
];

const Splash = () => (
  <BaseConnect>
    <ClearErrorConnect/>
    <div className="dashboard" role="article">
      <div className="route">
        <div className="search route-content">
            <div className="results-wrapper">
              <div className="grid-controls">
                <nav className="tabs">
                  <a href="" className="btn btn-link selected">Recently Viewed</a>
                  {/*<a href="">My Assigned Quotes</a>*/}
                  {/*<a href="">My Assigned Claims</a>*/}
                  <a href="" className="btn btn-link">Search Results</a>
                </nav>
                <div className="filters-wrapper">
                    <div className="filters">
                        <a href="" className="btn btn-sm selected">All</a>
                        <a href="" className="btn btn-sm">Quotes</a>
                        <a href="" className="btn btn-sm">Policies</a>
                    </div>
                    <div className="filters">
                        <a className="btn btn-sm selected"><i className="fa fa-list-ul"></i></a>
                        <a className="btn btn-sm"><i className="fa fa-table"></i></a>
                    </div>
                    <NewNoteFileUploader />

                </div>
              </div>
              <div className="table-view">
                <BootstrapTable className="results-grid" data={data} striped hover>
                  <TableHeaderColumn isKey dataField='type' className="type" columnClassName="type" dataSort={true}>Type</TableHeaderColumn>
                  <TableHeaderColumn dataField='number' className="number" columnClassName="number" dataSort={true}>Number</TableHeaderColumn>
                  <TableHeaderColumn dataField='policyHolder' className="policyholder" columnClassName="policyholder" dataSort={true}>Policyholder</TableHeaderColumn>
                  <TableHeaderColumn dataField='address' className="address" columnClassName="address" dataSort={true}>Address</TableHeaderColumn>
                  <TableHeaderColumn dataField='status' className="status" columnClassName="status" dataSort={true}>Status</TableHeaderColumn>
                  <TableHeaderColumn dataField='effectiveDate' className="effectiveDate" columnClassName="effectiveDate" dataSort={true}>Effective Date</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
            <Footer/>
        </div>
      </div>
    </div>
  </BaseConnect>
);

Splash.propTypes = {
  splashScreen: PropTypes.bool
};

Splash.displayName = 'Splash';

export default Splash;
