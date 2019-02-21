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

  handleCheckPolicy = (v, pv, av) => {
    const { policies } = this.props;
    const selectedPolicies = [];
     Object.keys(av).forEach(p => {
      if(av[p] === true) {
        const policy = policies.filter(v => v.policyNumber === p)[0];
        selectedPolicies.push(policy)
      }
        
     });
     this.setState({ selectedPolicies });
    return v;
  }

  handleUncheckPolicy = (v, pv, av) => {
    const { selectedPolicies } = this.state;
    const checkedPolicies =  Object.keys(av).filter(p => av[p] === true);
    console.log(checkedPolicies);
    const filterPolicies = selectedPolicies.filter(p => checkedPolicies.includes(p.policyNumber));
    this.setState({ selectedPolicies: filterPolicies });

   return v;
 }

  handleCheckAllPolicies = (v, pv, av) => {
    const { policies } = this.props;
    console.log(v)
    if(v){
      this.setState({ selectedPolicies:  policies });
    }
    else {
      this.setState({ selectedPolicies:  [] });
    }

    return v;

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
              <TransferList selectedPolicies={selectedPolicies} checkAllPolicies={this.handleCheckAllPolicies} checkPolicy={this.handleCheckPolicy} uncheckPolicy={this.handleUncheckPolicy} policyNumberList={policyNumberList} policies={policies} toggleTransferModal={this.handleToggleTransferModal} agencyCode={agency.agencyCode} />        
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