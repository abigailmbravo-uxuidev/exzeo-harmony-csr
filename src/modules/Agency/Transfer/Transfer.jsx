import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Footer from '../../../components/Common/Footer'
import TransferModal from './TransferModal';

export class Transfer extends Component {
  state = { showTransferModal: false };

  componentDidMount() {
    // const { getAgencyAction, getAgentListAction, agency } = this.props;
    // get policies by agency
  }

  handleToggleTransferModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
  }

  render() {
    const {
      agency,
      agents,
      policies
    } = this.props;

    // if (!(agents && agents.length && agency)) return <Loader />;

    const { showTransferModal } = this.state;

    return (
      <React.Fragment>
        {showTransferModal && 
          <TransferModal
            toggleModal={this.handleToggleTransferModal}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policy-filter">
              <BootstrapTable
      className="transfer compact-table"
      data={policies}
      multiColumnSearch>
      <TableHeaderColumn dataField="_id" isKey hidden>ID</TableHeaderColumn>
      <TableHeaderColumn className="policyNumber" columnClassName="policyNumber" dataField="policyNumber" dataSort filterFormatted filter={ { type: 'TextFilter', defaultValue: '' } }>PolicyNumber</TableHeaderColumn>
      <TableHeaderColumn className="company" columnClassName="company" dataField="company" dataSort>Company</TableHeaderColumn>
      <TableHeaderColumn className="state" columnClassName="state" dataField="state" dataSort filter={ { type: 'TextFilter', defaultValue: '' } }>State</TableHeaderColumn>
      <TableHeaderColumn className="product" columnClassName="product" dataField="product" dataSort filter={ { type: 'TextFilter', defaultValue: '' } }>Product</TableHeaderColumn>
      <TableHeaderColumn className="agent" columnClassName="agent" dataField="agent" dataSort filter={ { type: 'TextFilter', defaultValue: '' } }>Agent</TableHeaderColumn>
      <TableHeaderColumn className="propertyAddress" columnClassName="propertyAddress" dataField="propertyAddress" dataSort>Property Address</TableHeaderColumn>
      <TableHeaderColumn className="primaryPolicyholder" columnClassName="primaryPolicyholder" dataField="primaryPolicyholder" dataSort>Primary Policyholder</TableHeaderColumn>
      <TableHeaderColumn className="effectiveDate" columnClassName="effectiveDate" dataField="effectiveDate" dataSort>Effective Date</TableHeaderColumn>
      <TableHeaderColumn className="terms" columnClassName="terms" dataField="terms" dataSort>Terms</TableHeaderColumn>

    </BootstrapTable>             
     </section>
              <section className="policy-filter-actions">
              Bootstrap Table Actions
              </section>
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

export default Transfer;