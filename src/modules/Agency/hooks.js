import { useEffect, useState } from 'react';
import { fetchAvailableAgents, formatAgents } from './utilities';

export function useFetchAvailableAgents(agencyCode) {
  const [agents, setAgents] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const getAgents = async () => {
      setLoaded(false);
      try {
        const result = await fetchAvailableAgents(agencyCode);
        setAgents(formatAgents(result));
      } catch (error) {
        setAgents([]);
      }
      setLoaded(true);
    };
    if (!agencyCode) return;
    getAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agencyCode]);

  return { agents, loaded };
}
