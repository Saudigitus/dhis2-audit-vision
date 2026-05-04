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
        
        const dataMap: Record<string, ChartData> = {};
        const uniqueUsernames = new Set<string>();
        const allPeriods = new Set<string>();

        rows.forEach((row: any[]) => {
          const period = row[0];
          const username = row[1];
          const count = Number(row[2]) || 0;

          allPeriods.add(period);
          uniqueUsernames.add(username);

          if (!dataMap[period]) {
            dataMap[period] = { name: period };
          }

          dataMap[period][username] = count;
        });

        // Converter o Set de períodos para array ordenado por data
        const sortedPeriods = Array.from(allPeriods).sort((a, b) => 
          new Date(a).getTime() - new Date(b).getTime()
        );

        // Garantir que todos os períodos tenham dados para todos os usernames (preencher com 0 onde faltar)
        const usernamesArray = Array.from(uniqueUsernames);
        const completeData = sortedPeriods.map(period => {
          const periodData = dataMap[period] || { name: period };
          const completePeriodData: ChartData = { name: period };
          
          usernamesArray.forEach(username => {
            completePeriodData[username] = periodData[username] || 0;
          });
          
          return completePeriodData;
        });

        setUsernames(usernamesArray);
        setChartData(completeData);
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
