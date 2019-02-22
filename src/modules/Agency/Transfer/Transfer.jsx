import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export class Transfer extends Component {
  state = { showTransferModal: false, selectedPolicies: [], fadeOutPolicy: undefined };

  handleToggleModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
  }

  handleCheckPolicy = (policyNumber) => () => {

    this.setState({ fadeOutPolicy: policyNumber });
    const self = this;

    setTimeout(function () {
      const { policies } = self.props;
      const { selectedPolicies } = self.state;
      const policy = policies.filter(v => v.policyNumber === policyNumber)[0];
      selectedPolicies.push(policy);
      self.setState({ selectedPolicies, fadeOutPolicy: undefined });
    }, 500)

  }

  handleUncheckPolicy = (policyNumber) => () => {
    const { selectedPolicies } = this.state;
    this.setState({ selectedPolicies: selectedPolicies.filter(p => p.policyNumber !== policyNumber) });
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

    const { showTransferModal, selectedPolicies, fadeOutPolicy } = this.state;
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
                  fadeOutPolicy={fadeOutPolicy}
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