import { useGlobalError } from '../error/useGlobalError';
import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';

const SUPER_USERS_QUERY = {
  users: {
    resource: 'users',
    params: {
      filter: 'userCredentials.userRoles.authorities:in:[ALL]',
      fields: 'id,name,userCredentials[username,lastLogin,userRoles[name,authorities]]',
      paging: 'false',
    },
  },
};

export const useGetSuperUsers = () => {
  const { showError } = useGlobalError();
  const engine = useDataEngine();
  const [superUsers, setSuperUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchSuperUsers = async () => {
      try {
        setLoading(true);
        const response: any = await engine.query(SUPER_USERS_QUERY);
        setSuperUsers(response.users?.users || []);
      } catch (err) {
      showError(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuperUsers();
  }, [engine]);

  return { superUsers, loading, error };
};
