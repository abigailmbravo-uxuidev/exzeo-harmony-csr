import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BaseConnect from './Base';
import SearchBar from '../components/Search/SearchBar';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';

var data = [{
        type: "Quote",
        number: "12-123456",
        Policyholder: "Product1",
        address: "123 NE 132ND TER",
        location: "GAINESVILLE, FL 32641",
        status: "STATUS",
        effectiveDate: "01/01/2018"

    },
    {
    type: "Quote",
    number: "12-123456",
    Policyholder: "Product1",
    address: "123 NE 132ND TER",
    location: "GAINESVILLE, FL 32641",
    status: "STATUS",
    effectiveDate: "01/01/2018"
}];

const Splash = () => (
    <BaseConnect>
        <ClearErrorConnect/>
        <div className="dashboard" role="article">
            <div className="route">
                <div className="search route-content">
                    <SearchBar/>
                    <div className="survey-wrapper scroll">
                        <div className="results-wrapper">
                            <nav className="tabs">
                              <a href="" className="btn selected">Recently Viewed</a>
                              {/*<a href="">My Assigned Quotes</a>*/}
                              {/*<a href="">My Assigned Claims</a>*/}
                              <a href="" className="btn">Search Results</a>
                            </nav>
                            <div className="card-view">
                            <BootstrapTable data={ data } striped hover>
                                <TableHeaderColumn isKey dataField='type' dataSort={ true }>Type</TableHeaderColumn>
                                <TableHeaderColumn isKey dataField='number' dataSort={ true }>Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='policyHolder' dataSort={ true }>Policyholder</TableHeaderColumn>
                                <TableHeaderColumn dataField='address' dataSort={ true }>Address</TableHeaderColumn>
                                <TableHeaderColumn dataField='status' dataSort={ true }>Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='effectiveDate' dataSort={ true }>Effective Date</TableHeaderColumn>
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
