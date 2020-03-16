import React, { useState } from 'react';
import { ModalPortal, SectionLoader } from '@exzeo/core-ui';

import { useFetchAgents, useFetchAgency } from './hooks';
import AgencyCard from './AgencyCard';
import AgentCard from './AgentCard';
import ContactCard from './ContactCard';
import PolicyholderCard from './PolicyholderCard';
import TransferAORModal from './TransferAORModal';
import { useFetchTerritoryManagers } from '../../hooks/territoryManagers';

const PolicyholderAgent = ({ customHandlers, initialValues }) => {
  const [showTransferAOR, setShowTransferAOR] = useState(false);
  const { agents, loaded: agentsLoaded } = useFetchAgents(
    initialValues.agencyCode
  );
  const { agency, loaded: agencyLoaded } = useFetchAgency(
    initialValues.agencyCode
  );
  const { territoryManagers } = useFetchTerritoryManagers(initialValues.state);

  const selectedAgent = agents.find(
    a => a.agentCode === initialValues.agentCode
  );

  const territoryManager = territoryManagers.find(
    agent => agent._id === agency.territoryManagerId
  );

  const submitTransferAOR = async data => {
    await customHandlers.transferAOR({
      agencyCode: data.agencyCode,
      agentCode: data.agentCode,
      policyNumber: initialValues.policyNumber
    });
    setShowTransferAOR(false);
  };

  if (!agentsLoaded || !agencyLoaded) {
    return <SectionLoader />;
  }

  const {
    policyHolders,
    policyHolderMailingAddress,
    policyNumber
  } = initialValues;
  return (
    <React.Fragment>
      {showTransferAOR && (
        <ModalPortal>
          <TransferAORModal
            initialValues={initialValues}
            closeModal={() => setShowTransferAOR(false)}
            submitTransferAOR={submitTransferAOR}
          />
        </ModalPortal>
      )}
      <section className="policyholder-cards">
        <h3 className="title">Policyholder</h3>
        {policyHolders &&
          policyHolders.map((policyHolder, index) => (
            <PolicyholderCard
              policyHolder={policyHolder}
              key={index}
              label={`Policyholder ${index + 1}`}
              policyHolderMailingAddress={policyHolderMailingAddress}
              subject={`${policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
            />
          ))}
      </section>
      <section className="agency-cards">
        <h3 className="title">
          Agency / Agent{' '}
          <button
            className="btn btn-link btn-sm"
            onClick={() => setShowTransferAOR(true)}
            disabled={false}
          >
            <i className="fa fa-exchange" />
            Change AOR
          </button>
        </h3>
        <AgencyCard
          agency={agency}
          policyNumber={initialValues.policyNumber}
          policyHolders={initialValues.policyHolders}
        />
        <AgentCard
          agent={selectedAgent}
          policyNumber={initialValues.policyNumber}
          policyHolders={initialValues.policyHolders}
        />
      </section>
      <section className="agency-cards">
        <h3 className="title">Territory Manager</h3>
        {territoryManager && territoryManager.name && (
          <ContactCard
            {...territoryManager}
            policyNumber={initialValues.policyNumber}
            policyHolders={initialValues.policyHolders[0]}
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default PolicyholderAgent;
