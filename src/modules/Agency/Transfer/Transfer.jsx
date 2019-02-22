import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export class Transfer extends Component {
  state = { showTransferModal: false, selectedPolicies: [], fadePolicy: undefined };

  handleToggleModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
  }

  handleCheckPolicy = (policyNumber) => (e) => {
    if(e.stopPropagation) e.stopPropagation();
    this.setState({ fadePolicy: policyNumber });
    const self = this;

    setTimeout(function () {
      const { policies } = self.props;
      const { selectedPolicies } = self.state;
      const policy = policies.filter(v => v.policyNumber === policyNumber)[0];
      selectedPolicies.push(policy);
      self.setState({ selectedPolicies, fadePolicy: undefined });
    }, 500)

  }

  handleUncheckPolicy = (policyNumber) => (e) => {
    if(e.stopPropagation) e.stopPropagation();
    this.setState({ fadePolicy: policyNumber });
    const self = this;
    const { selectedPolicies } = this.state;
    setTimeout(function () {
      self.setState({ selectedPolicies: selectedPolicies.filter(p => p.policyNumber !== policyNumber), fadePolicy: undefined });
    }, 500);
  }

  handleCheckAllPolicies = () => {
    const { policies } = this.props;
    const { selectedPolicies } = this.state;

    if (policies.length === selectedPolicies.length) {
      this.setState({ selectedPolicies: [] });
    }
    else {
      this.setState({ selectedPolicies: policies });
    }

  }

  clearSelectedPolicies = () => {
    this.setState({ selectedPolicies: [] });
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

    const { showTransferModal, selectedPolicies, fadePolicy } = this.state;
    const filteredPolicies = policies.filter(p => !selectedPolicies.some(s => s.policyNumber === p.policyNumber));

    return (
      <React.Fragment>
        {showTransferModal &&
          <TransferModal
            clearSelectedPolicies={this.clearSelectedPolicies}
            selectedPolicies={selectedPolicies}
            toggleModal={this.handleToggleModal}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policy-filter">
                <TransferFilter
                  policyNumberList={policyNumberList}
                  listAnswersAsKey={listAnswersAsKey}
                  agentsList={agentsList}
                  getPoliciesForAgency={getPoliciesForAgency}
                />
                <TransferList
                  fadePolicy={fadePolicy}
                  filteredPolicies={filteredPolicies}
                  clearSelectedPolicies={this.clearSelectedPolicies}
                  selectedPolicies={selectedPolicies}
                  checkAllPolicies={this.handleCheckAllPolicies}
                  checkPolicy={this.handleCheckPolicy}
                  uncheckPolicy={this.handleUncheckPolicy}
                  policyNumberList={policyNumberList}
                  policies={policies}
                  toggleTransferModal={this.handleToggleModal}
                  agencyCode={agency.agencyCode}
                />
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