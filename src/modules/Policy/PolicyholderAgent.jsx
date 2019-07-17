import React from 'react';
import { defaultMemoize } from 'reselect';
import _find from 'lodash/find';
import _get from 'lodash/get';
import { useFetchAgents, useFetchAgency } from './hooks';

import AgencyCard from './AgencyCard';
import AgentCard from './AgentCard';

const PolicyholderAgent = ({ initialValues, options }) => {
  const { agents } = useFetchAgents(initialValues.agencyCode);
  const { agency } = useFetchAgency(initialValues.agencyCode);
  const selectedAgent = agents.find(
    a => a.agentCode === initialValues.agentCode
  );
  return (
    <React.Fragment>
      <section className="policyholder-cards">
        <h3>Policyholder</h3>
      </section>
      <section className="agency-cards">
        <h3>
          Agency / Agent{' '}
          <button
            className="btn btn-link btn-sm"
            onClick={null}
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
