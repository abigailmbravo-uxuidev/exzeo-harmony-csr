import { useState, useEffect } from 'react';
import {
  fetchAgency,
  fetchAgentsByAgencyCode,
  sortPaymentHistoryByDate
} from './utilities';
import { getPaymentHistory } from './data';

export const useFetchAgency = agencyCode => {
  const [agency, setAgency] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getAgency = async () => {
      setLoaded(false);
      try {
        const result = await fetchAgency(agencyCode);
        setAgency(result);
      } catch {
        setAgency({});
      }
      setLoaded(true);
    };
    getAgency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCode]);

  return { agency, loaded };
};

export const useFetchAgents = agencyCode => {
  const [agents, setAgents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getAgents = async () => {
      setLoaded(false);
      try {
        const result = await fetchAgentsByAgencyCode(agencyCode);
        setAgents(result);
      } catch {
        setAgents([]);
      }
      setLoaded(true);
    };
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCode]);

  return { agents, loaded };
};

export const useFetchPaymentHistory = (policyNumber, paymentAdded) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      setLoaded(false);

      try {
        const response = await getPaymentHistory(policyNumber);
        const sortedPaymentHistory = sortPaymentHistoryByDate(response);

        setPaymentHistory(sortedPaymentHistory);
      } catch (error) {
        console.error('Error fetching Payment History: ', error);
      }
      setLoaded(true);
    };

    fetchPaymentHistory();
  }, [policyNumber, paymentAdded]);

  return { paymentHistory, loaded };
};
