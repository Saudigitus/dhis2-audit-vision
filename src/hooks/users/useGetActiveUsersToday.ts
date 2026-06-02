import { useGlobalError } from '../error/useGlobalError';
import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';

const DATA_SUMMARY_QUERY = {
  summary: {
    resource: 'dataSummary',
  },
};

export const useGetActiveUsersToday = () => {
  const { showError } = useGlobalError();
  const engine = useDataEngine();
  const [activeUsersCount, setActiveUsersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        setLoading(true);
        const response: any = await engine.query(DATA_SUMMARY_QUERY);
        // O usuário solicitou usar a chave 'activeUsers' e o objeto com valor '1'
        const activeUsers = response.summary?.activeUsers;
        if (activeUsers && activeUsers['1']) {
          setActiveUsersCount(activeUsers['1']);
        } else if (typeof activeUsers === 'number') {
          setActiveUsersCount(activeUsers);
        }
      } catch (err) {
      showError(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveUsers();
  }, [engine]);

  return { activeUsersCount, loading, error };
};
