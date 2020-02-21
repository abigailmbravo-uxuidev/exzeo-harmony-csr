import React, { Component } from 'react';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export class Transfer extends Component {
  state = {
    showTransferModal: false,
    selectedPolicies: [],
    fadePolicy: undefined
  };

  handleToggleModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
  };

  checkPolicy = policyNumber => {
    const { policies } = this.props;
    const { selectedPolicies } = this.state;
    const policy = policies.find(v => v.policyNumber === policyNumber);
    this.setState({
      selectedPolicies: [...selectedPolicies, policy],
      fadePolicy: undefined
    });
  };

  unCheckPolicy = policyNumber => {
    const { selectedPolicies } = this.state;
    this.setState({
      selectedPolicies: selectedPolicies.filter(
        p => p.policyNumber !== policyNumber
      ),
      fadePolicy: undefined
    });
  };

  handleCheckPolicy = (policyNumber, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    this.setState({ fadePolicy: policyNumber }, () =>
      setTimeout(() => this.checkPolicy(policyNumber), 500)
    );
  };

  handleUncheckPolicy = (policyNumber, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    this.setState({ fadePolicy: policyNumber }, () =>
      setTimeout(() => this.unCheckPolicy(policyNumber), 500)
    );
  };

  handleCheckAllPolicies = () => {
    const { policies } = this.props;
    const { selectedPolicies } = this.state;

    if (policies.length === selectedPolicies.length) {
      this.clearSelectedPolicies();
    } else {
      this.setState({ selectedPolicies: policies });
    }
  };

  clearSelectedPolicies = () => {
    this.setState({ selectedPolicies: [] });
  };

  render() {
    const {
      agencyCode,
      agentsList,
      policies,
      policyNumberList,
      listAnswersAsKey,
      getPoliciesForAgency,
      getAgentListByAgencyCode
    } = this.props;

    const { showTransferModal, selectedPolicies, fadePolicy } = this.state;
    const filteredPolicies = policies.filter(
      p => !selectedPolicies.some(s => s.policyNumber === p.policyNumber)
    );
    return (
      <React.Fragment>
        {showTransferModal && (
          <TransferModal
            getPoliciesForAgency={getPoliciesForAgency}
            activeAgencyCode={agencyCode}
            getAgentListByAgencyCode={getAgentListByAgencyCode}
            clearSelectedPolicies={this.clearSelectedPolicies}
            selectedPolicies={selectedPolicies}
            toggleModal={this.handleToggleModal}
          />
        )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policy-filter">
                <TransferFilter
                  agencyCode={agencyCode}
                  clearSelectedPolicies={this.clearSelectedPolicies}
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
                  agencyCode={agencyCode}
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
