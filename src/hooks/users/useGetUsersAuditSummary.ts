import { useGlobalError } from '../error/useGlobalError';
import { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';
import { useParams } from '../common/useQueryParams';
import { buildParams } from '../../utils/formater/dashboardDataFormater';
import { useRecoilValue } from 'recoil';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';

const USERS_AUDIT_SUMMARY_QUERY = ({ id, ...rest }: any) => ({
  summary: {
    resource: `sqlViews/${id}/data`,
    params: {
      // paging: 'false',
      var: buildParams({ ...rest }),
    },
  },
});

export const useGetUsersAuditSummary = (pageSize: number = 10) => {
  const { showError } = useGlobalError();
  const engine = useDataEngine();
  const [auditSummary, setAuditSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const { startDate, endDate } = useParams();
  const dataStoreConfig = useRecoilValue(DataStoreConfigState)

  const fetchAuditSummary = async (offset: number) => {
    if (!startDate || !endDate)
      return;
    try {
      const response: any = await engine.query(USERS_AUDIT_SUMMARY_QUERY({
        id: dataStoreConfig?.reports?.mostActiveUsers,
        startDate: startDate,
        endDate: endDate,
        offset: offset.toString()
      }));

      const rows = response.summary?.listGrid?.rows || response.summary?.rows || [];

      // Use functional update to avoid stale state issues
      setAuditSummary(prevSummary => {
        const newSummary: Record<string, number> = { ...prevSummary };
        rows.forEach((row: any[]) => {
          const username = row[0];
          const count = Number(row[2]) || 0;
          newSummary[username] = (newSummary[username] || 0) + count;
        });
        return newSummary;
      });

      // Check if we have more data
      if (rows.length < pageSize) {
        setHasMore(false);
      }
    } catch (err) {
      showError(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextOffset = currentOffset + pageSize;
      setCurrentOffset(nextOffset);
      fetchAuditSummary(nextOffset);
    }
  };

  useEffect(() => {
    fetchAuditSummary(0);
  }, [engine, startDate, endDate, dataStoreConfig?.reports?.mostActiveUsers]);

  return { auditSummary, loading, error, hasMore, loadMore };
};
