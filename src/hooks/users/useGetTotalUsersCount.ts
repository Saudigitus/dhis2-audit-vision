import { useGlobalError } from '../error/useGlobalError';
import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';

const TOTAL_USERS_QUERY = {
  users: {
    resource: 'users',
    params: {
      pageSize: 1,
      fields: 'id',
    },
  },
};

export const useGetTotalUsersCount = () => {
  const { showError } = useGlobalError();
  const engine = useDataEngine();
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        setLoading(true);
        const response: any = await engine.query(TOTAL_USERS_QUERY);
        setTotalUsers(response.users?.pager?.total || 0);
      } catch (err) {
      showError(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, [engine]);

  return { totalUsers, loading, error };
};
