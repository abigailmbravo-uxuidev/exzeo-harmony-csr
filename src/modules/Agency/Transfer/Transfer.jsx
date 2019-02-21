import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export class Transfer extends Component {
  state = { showTransferModal: false, selectedPolicies: [] };

  componentDidMount() {
    // const { getAgencyAction, getAgentListAction, agency } = this.props;
    // get policies by agency
  }

  handleToggleModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
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

  handleCheckPolicy = (policyNumber) => () => {
    const { policies } = this.props;
    const { selectedPolicies } = this.state;
    const policy = policies.filter(v => v.policyNumber === policyNumber)[0];
    selectedPolicies.push(policy);
     this.setState({ selectedPolicies });
  }

  handleUncheckPolicy = (policyNumber) => () => {
    const { selectedPolicies } = this.state;
    this.setState({ selectedPolicies: selectedPolicies.filter(p => p.policyNumber !== policyNumber) });

    
 }

  handleCheckAllPolicies = () => {
    const { policies } = this.props;
    const { selectedPolicies } = this.state;

    if(policies.length === selectedPolicies.length){
      this.setState({ selectedPolicies:  [] });
    }
    else {
      this.setState({ selectedPolicies:  policies });
    }

  }

  clearSelectedPolicies = () => {
    this.setState({ selectedPolicies:  [] });
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
              <TransferList clearSelectedPolicies={this.clearSelectedPolicies} selectedPolicies={selectedPolicies} checkAllPolicies={this.handleCheckAllPolicies} checkPolicy={this.handleCheckPolicy} uncheckPolicy={this.handleUncheckPolicy} policyNumberList={policyNumberList} policies={policies} toggleTransferModal={this.handleToggleModal} agencyCode={agency.agencyCode} />        
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