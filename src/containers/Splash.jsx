import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import BaseConnect from './Base';
import SearchBar from '../components/Search/SearchBar';
import ClearErrorConnect from '../components/Error/ClearError';
import Footer from '../components/Common/Footer';

var data = [{
        type: 1,
        Policyholder: "Product1",
        address: 120,
        status: 123,
        effectiveDate: "01/01/01"
    }, {
        type: 2,
        Policyholder: "Product2",
        address: 80,
        status: 123,
        effectiveDate: "01/01/01"
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
                            <nav className="tabs"><a href="" class="active">Recently Viewed</a><a href="">My Assigned Quotes</a><a href="">My Assigned Claims</a><a href="">Search Results</a></nav>
                            <BootstrapTable data={ data } striped hover>
                                <TableHeaderColumn isKey dataField='type'>Type / Number</TableHeaderColumn>
                                <TableHeaderColumn dataField='policyHolder'>Policyholder</TableHeaderColumn>
                                <TableHeaderColumn dataField='address'>Address</TableHeaderColumn>
                                <TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
                                <TableHeaderColumn dataField='effectiveDate'>Effective Date</TableHeaderColumn>
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
