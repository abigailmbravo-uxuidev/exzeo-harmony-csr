import React, { useState } from 'react';

import Footer from '../../../components/Common/Footer';

import TransferModal from './TransferModal';
import TransferList from './TransferList';
import TransferFilter from './TransferFilter';

export const Transfer = ({
  agencyCode,
  agentsList,
  policies,
  policyNumberList,
  listAnswersAsKey,
  getPoliciesForAgency,
  transferPoliciesToAgent
}) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [fadePolicy, setFadePolicy] = useState(undefined);
  const [refresh, setRefresh] = useState(undefined);

  const checkPolicy = policyNumber => {
    const policy = policies.find(v => v.policyNumber === policyNumber);
    setSelectedPolicies([...selectedPolicies, policy]);
    setFadePolicy(null);
  };

  const unCheckPolicy = policyNumber => {
    setSelectedPolicies(
      selectedPolicies.filter(p => p.policyNumber !== policyNumber)
    );
    setFadePolicy(null);
  };

  const handleCheckPolicy = async (policyNumber, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setFadePolicy(policyNumber);
    await new Promise(resolve => setTimeout(resolve, 500));
    checkPolicy(policyNumber);
  };

  const handleUncheckPolicy = async (policyNumber, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setFadePolicy(policyNumber);
    await new Promise(resolve => setTimeout(resolve, 500));
    unCheckPolicy(policyNumber);
  };

  const handleCheckAllPolicies = () => {
    if (policies.length === selectedPolicies.length) {
      clearSelectedPolicies();
    } else {
      setSelectedPolicies(policies);
    }
  };

  const clearSelectedPolicies = () => {
    setSelectedPolicies([]);
  };

  return (
    <React.Fragment>
      {showTransferModal && (
        <TransferModal
          transferPoliciesToAgent={transferPoliciesToAgent}
          clearSelectedPolicies={clearSelectedPolicies}
          selectedPolicies={selectedPolicies}
          closeModal={() => setShowTransferModal(false)}
          setRefresh={setRefresh}
        />
      )}
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <section className="policy-filter">
              <TransferFilter
                agencyCode={agencyCode}
                clearSelectedPolicies={clearSelectedPolicies}
                policyNumberList={policyNumberList}
                listAnswersAsKey={listAnswersAsKey}
                agentsList={agentsList}
                getPoliciesForAgency={getPoliciesForAgency}
                refresh={refresh}
              />
              <TransferList
                fadePolicy={fadePolicy}
                clearSelectedPolicies={clearSelectedPolicies}
                selectedPolicies={selectedPolicies}
                checkAllPolicies={handleCheckAllPolicies}
                checkPolicy={handleCheckPolicy}
                uncheckPolicy={handleUncheckPolicy}
                policyNumberList={policyNumberList}
                policies={policies}
                openModal={() => setShowTransferModal(true)}
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
};

export default Transfer;
