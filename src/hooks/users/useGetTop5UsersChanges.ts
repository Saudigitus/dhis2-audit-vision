import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';
import { ChartData } from '../../types/users/users';

const TOP_USERS_QUERY:any = {
  topUsers: {
    resource: 'sqlViews/xZQp6Isnhkj/data',
    params: {
      var: [['startDate:2026-01-01'], ['endDate:2027-01-01']],
    },
  },
};

export const useGetTop5UsersChanges = () => {
  const engine = useDataEngine();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const response: any = await engine.query(TOP_USERS_QUERY);
        
        const rows = response.topUsers?.listGrid?.rows || response.topUsers?.rows || [];
        
        // Estrutura fornecida pelo usuário:
        // Coluna 0: period (data)
        // Coluna 1: username
        // Coluna 2: audit_count
        
        const dataMap: Record<string, ChartData> = {};
        const uniqueUsernames = new Set<string>();

        rows.forEach((row: any[]) => {
          const period = row[0];
          const username = row[1];
          const count = Number(row[2]) || 0;

          if (!dataMap[period]) {
            dataMap[period] = { name: period };
          }

          dataMap[period][username] = count;
          uniqueUsernames.add(username);
        });

        // Converter o mapa para array ordenado por data
        const mappedData = Object.values(dataMap).sort((a, b) => 
          new Date(a.name).getTime() - new Date(b.name).getTime()
        );

        setUsernames(Array.from(uniqueUsernames));
        setChartData(mappedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, [engine]);

  return { chartData, usernames, loading, error };
};
