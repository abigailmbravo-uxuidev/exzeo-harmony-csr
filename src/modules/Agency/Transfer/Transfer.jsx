import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export class Transfer extends Component {
  state = { showTransferModal: false };

  componentDidMount() {
    // const { getAgencyAction, getAgentListAction, agency } = this.props;
    // get policies by agency
  }

  handleToggleTransferModal = (data) => { 
    const checkedPolicies = [];
    Object.keys(data || {}).forEach(p => {
      if(data[p] === true) checkedPolicies.push(p)
    });
    this.handleToggleModal(checkedPolicies)
  }

  handleToggleModal = (data) => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal, selectedPolicies: data }));
  }

  filterPropertyAddress = (property) => {
      const { physicalAddress } = property || {};
    if(!physicalAddress) return '';
    return physicalAddress.address1;
  }

  filterPrimaryPolicyHolder = (policyHolders) => {
      if(!Array.isArray(policyHolders)) return '';
      return policyHolders[0].firstName + ' ' + policyHolders[0].lastName;
  }

  render() {
    const {
      agency,
      agentsList,
      policies,
      policyNumberList,
      listAnswersAsKey,
      getPoliciesForAgency
    } = this.props;

    // if (!(agents && agents.length && agency)) return <Loader />;

    const { showTransferModal, selectedPolicies } = this.state;

    return (
      <React.Fragment>
        {showTransferModal && 
          <TransferModal
            selectedPolicies={selectedPolicies}
            toggleModal={this.handleToggleModal}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policy-filter"> 
              <TransferFilter policyNumberList={policyNumberList} listAnswersAsKey={listAnswersAsKey} agentsList={agentsList} getPoliciesForAgency={getPoliciesForAgency} />
              <TransferList policyNumberList={policyNumberList} policies={policies} toggleTransferModal={this.handleToggleTransferModal} agencyCode={agency.agencyCode} />        
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