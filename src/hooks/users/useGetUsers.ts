import { useGlobalError } from '../error/useGlobalError';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';

const USERS_QUERY = (id: string) => ({
  users: {
    resource: `sqlViews/${id}/data`,
    params: { paging: 'false' },
  }
})

export const useGetUsers = () => {
  const { showError } = useGlobalError();
  const engine = useDataEngine();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [users, setUsers] = useState<string[]>([]);
  const dataStoreConfig = useRecoilValue(DataStoreConfigState)

  const fetchUsers = async () => {
    try {
      const response: any = await engine.query(USERS_QUERY(dataStoreConfig?.reports?.users || ""));
      const rows = response.users?.listGrid?.rows || response.users?.rows || [];
      setUsers(rows?.map((item: any) => item[0]));

    } catch (err) {
      showError(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [engine, dataStoreConfig?.reports?.users]);

  return { users, loading, error };
};