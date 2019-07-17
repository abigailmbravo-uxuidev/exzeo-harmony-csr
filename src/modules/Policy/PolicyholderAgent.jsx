import React from 'react';
import { defaultMemoize } from 'reselect';
import _find from 'lodash/find';
import _get from 'lodash/get';
import { useFetchAgents, useFetchAgency } from './hooks';

const PolicyholderAgent = ({ initialValues, options }) => {
  const { agents } = useFetchAgents(initialValues.agencyCode);
  const { agency } = useFetchAgency(initialValues.agencyCode);
  console.log(agency, agents);
  return <React.Fragment>policyHolder</React.Fragment>;
};

export default PolicyholderAgent;
