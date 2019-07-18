import React, { useState } from 'react';
import { defaultMemoize } from 'reselect';
import _find from 'lodash/find';
import _get from 'lodash/get';
import { callService } from '@exzeo/core-ui/src/@Harmony';

import { useFetchAgents, useFetchAgency } from './hooks';
import AgencyCard from './AgencyCard';
import AgentCard from './AgentCard';
import PolicyholderCard from './PolicyholderCard';
import TransferAORModal from './TransferAORModal';

const PolicyholderAgent = ({ initialValues, formValues, options }) => {
  const [showTransferAOR, setShowTransferAOR] = useState(false);
  const { agents } = useFetchAgents(initialValues.agencyCode);
  const { agency } = useFetchAgency(initialValues.agencyCode);
  const selectedAgent = agents.find(
    a => a.agentCode === initialValues.agentCode
  );

  const submitTransferAOR = async (data, dispatch, props) => {
    const { policyNumber, getPolicy, setAppError } = props;
    const transferData = {
      service: 'policy-manager',
      method: 'POST',
      path: 'update-agent-of-record',
      data: { ...data, policyNumber: policyNumber }
    };

    this.setState({ isLoading: true });

    await callService(transferData).catch(err => setAppError(err));

    await getPolicy(policyNumber);
    await props.getAgency(data.agencyCode);
    await props.getAgentsByAgencyCode(data.agencyCode);

    this.setState({ isLoading: false });
    this.props.toggleModal();
  };
  const {
    policyHolders,
    policyHolderMailingAddress,
    policyNumber
  } = initialValues;
  return (
    <React.Fragment>
      {showTransferAOR && (
        <TransferAORModal
          initialValues={initialValues}
          formValues={formValues}
          closeModal={() => setShowTransferAOR(false)}
          submitTransferAOR={submitTransferAOR}
        />
      )}
      <section className="policyholder-cards">
        <h3>Policyholder</h3>
        {policyHolders &&
          policyHolders.map((policyHolder, index) => (
            <PolicyholderCard
              policyHolder={policyHolder}
              index={index}
              label={`Policyholder ${index + 1}`}
              policyHolderMailingAddress={policyHolderMailingAddress}
              subject={`${policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
            />
          ))}
      </section>
      <section className="agency-cards">
        <h3>
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
        {agency.agencyCode && (
          <AgencyCard
            agency={agency}
            policyNumber={initialValues.policyNumber}
            policyHolders={initialValues.policyHolders}
          />
        )}
        {selectedAgent && (
          <AgentCard
            agent={selectedAgent}
            policyNumber={initialValues.policyNumber}
            policyHolders={initialValues.policyHolders}
          />
        )}
      </section>
    </React.Fragment>
  );
};

export default PolicyholderAgent;
