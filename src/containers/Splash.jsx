import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BaseConnect from './Base';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';

var data = [{
        type: "",
        number: "12-123456",
        policyHolder: "William McWilliamson",
        address: "123 NE 132ND TER, GAINESVILLE, FL 32641",
        status: "STATUS",
        effectiveDate: "01/01/2018"

    },
    {
    type: "",
    number: "12-123456-00",
    policyHolder: "William McWilliamson",
    address: "123 MAIN ST, GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "12/01/2017"
}];


const Splash = () => (
    <BaseConnect>
        <ClearErrorConnect/>
        <div className="dashboard" role="article">
            <div className="route">
                <div className="search route-content">

                    <div className="survey-wrapper scroll">
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
                                    </div>
                            </div>
                            <div className="table-view">
                            <BootstrapTable className="results-grid" data={ data } striped hover>
                                <TableHeaderColumn isKey dataField='type' className="icon" columnClassName="icon" dataAlign='center' dataSort={ true }>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField='number' className="number" columnClassName="number" dataSort={ true }>Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='policyHolder' className="policyholder" columnClassName="policyholder" dataSort={ true }>Policyholder</TableHeaderColumn>
                                <TableHeaderColumn dataField='address' className="address" columnClassName="address" dataSort={ true }>Address</TableHeaderColumn>
                                <TableHeaderColumn dataField='status' className="status" columnClassName="status" dataSort={ true }>Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='effectiveDate' className="effectiveDate" columnClassName="effectiveDate" dataSort={ true }>Effective Date</TableHeaderColumn>
                            </BootstrapTable>
                            </div>
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
