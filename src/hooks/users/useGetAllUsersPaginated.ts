import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect, useCallback } from 'react';

const USERS_QUERY = {
  users: {
    resource: 'users',
    params: ({ page, pageSize }: any) => ({
      page,
      pageSize,
      fields: 'id,name,email,userCredentials[username,lastLogin,userRoles[name,authorities]]',
    }),
  },
};

export const useGetAllUsersPaginated = (initialPageSize = 9) => {
  const engine = useDataEngine();
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = useCallback(async (pageNum: number) => {
    try {
      setLoading(true);
      const response: any = await engine.query(USERS_QUERY, {
        variables: {
          page: pageNum,
          pageSize: initialPageSize,
        },
      });

      const newUsers = response.users?.users || [];
      const pager = response.users?.pager;

      if (pageNum === 1) {
        setUsers(newUsers);
      } else {
        setUsers((prev) => [...prev, ...newUsers]);
      }

      setHasMore(pager?.page < pager?.pageCount);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [engine, initialPageSize]);

  useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUsers(nextPage);
    }
  };

  return { users, loading, error, hasMore, loadMore };
};
