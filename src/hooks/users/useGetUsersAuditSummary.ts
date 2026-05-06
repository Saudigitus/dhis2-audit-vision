import { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';
import { useParams } from '../common/useQueryParams';

const USERS_AUDIT_SUMMARY_QUERY: any = {
  summary: {
    resource: 'sqlViews/B7DrTkhIYld/data',
    params: ({ startDate, endDate, offset }: any) => ({
      var: [
        `startDate:${startDate}`,
        `endDate:${endDate}`,
        `offset:${offset}`,
      ],
    }),
  },
};

export const useGetUsersAuditSummary = (pageSize: number = 10) => {
  const engine = useDataEngine();
  const [auditSummary, setAuditSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(0);
  const { startDate, endDate } = useParams();

  const fetchAuditSummary = async (offset: number) => {
    setLoading(true);
    try {
      const response: any = await engine.query(USERS_AUDIT_SUMMARY_QUERY, {
        variables: {
          startDate: startDate,
          endDate: endDate,
          offset: offset.toString(),
        },
      });

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
  }, []);

  return { auditSummary, loading, error, hasMore, loadMore };
};
