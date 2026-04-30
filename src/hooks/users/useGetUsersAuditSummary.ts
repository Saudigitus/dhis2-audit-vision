import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';

const USERS_AUDIT_SUMMARY_QUERY: any = {
  summary: {
    resource: 'sqlViews/B7DrTkhIYld/data',
    params: ({ startDate, endDate, username }: any) => ({
      var: [
        `startDate:${startDate}`,
        `endDate:${endDate}`,
        ...(username ? [`username:${username}`] : []),
      ],
    }),
  },
};

export const useGetUsersAuditSummary = (usernames: string[]) => {
  const engine = useDataEngine();
  const [auditSummary, setAuditSummary] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (usernames.length === 0) return;

    const fetchSummaries = async () => {
      setLoading(true);
      try {
        const results: Record<string, number> = { ...auditSummary };
        
        // Filtrar apenas usernames que ainda não temos no estado para evitar requisições duplicadas
        const missingUsernames = usernames.filter(u => results[u] === undefined);
        
        if (missingUsernames.length === 0) {
          setLoading(false);
          return;
        }

        // Fazer requisições em paralelo para cada username faltante
        // Nota: Em um sistema real com muitos usuários, o ideal seria uma SQL View que aceitasse múltiplos IDs
        // ou fazer o fetch em lotes para não sobrecarregar o servidor.
        await Promise.all(missingUsernames.map(async (username) => {
          const response: any = await engine.query(USERS_AUDIT_SUMMARY_QUERY, {
            variables: {
              startDate: '2026-01-01',
              endDate: '2027-01-01',
              username: username,
            },
          });
          
          const rows = response.summary?.listGrid?.rows || response.summary?.rows || [];
          if (rows.length > 0) {
            results[username] = Number(rows[0][1]) || 0;
          } else {
            results[username] = 0;
          }
        }));

        setAuditSummary(results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, [engine, usernames]);

  return { auditSummary, loading, error };
};
