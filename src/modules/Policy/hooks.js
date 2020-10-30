import { useState, useEffect } from 'react';
import {
  fetchAgency,
  fetchAgentsByAgencyCode,
  sortPaymentHistoryByDate
} from './utilities';
import {
  getPaymentOptions,
  getPaymentHistory,
  fetchPastEndorsements,
  fetchPendingEndorsements
} from './data';

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

export const useFetchPaymentOptions = () => {
  const [paymentOptions, setPaymentOptions] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const fetchPaymentOptions = async () => {
      setLoaded(false);

      try {
        const response = await getPaymentOptions();

        const cashDescriptions = {};
        const cashTypes = response.map(res => {
          const description = res.paymentDescription.map(desc => ({
            answer: desc,
            label: desc
          }));
          cashDescriptions[res.paymentType] = description;

          return {
            answer: res.paymentType,
            label: res.paymentType
          };
        });

        setPaymentOptions({ cashTypes, cashDescriptions });
      } catch (error) {
        console.error('Error fetching Payment Options: ', error);
      }
      setLoaded(true);
    };

    fetchPaymentOptions();
  }, []);

  return { paymentOptions, loaded };
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

export const useFetchEndorsements = policy => {
  const [endorsements, setEndorsements] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        const [pastEndorsements, pendingEndorsements] = await Promise.all([
          fetchPastEndorsements(policy.policyNumber),
          fetchPendingEndorsements(policy.policyNumber)
        ]);

        setEndorsements({ pastEndorsements, pendingEndorsements });
      } catch (error) {
        console.error('Error fetching Endorsements');
      }
      setLoaded(true);
    };
    fetchEndorsements();
  }, [policy]);
  return { endorsements, loaded };
};
