import { useDataEngine } from '@dhis2/app-runtime';
import { useState, useEffect } from 'react';
import { ChartData } from '../../types/users/users';
import { useParams } from '../common/useQueryParams';
import { buildParams } from '../../utils/formater/dashboardDataFormater';
import { useRecoilValue } from 'recoil';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';

const TOP_USERS_QUERY = ({ id, startDate, endDate }: any) => ({
  topUsers: {
    resource: `sqlViews/${id}/data`,
    params: {
      var: buildParams({ startDate, endDate }),
    },
  },
});

export const useGetTop5UsersChanges = () => {
  const engine = useDataEngine();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { startDate, endDate } = useParams()
  const dataStoreConfig = useRecoilValue(DataStoreConfigState)

  useEffect(() => {
    const fetchTopUsers = async () => {
      if (!startDate || !endDate)
        return;
      try {
        const response: any = await engine.query(TOP_USERS_QUERY({
          id: dataStoreConfig?.reports?.topUsersChanges,
          startDate: startDate,
          endDate: endDate,
        }));

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
  }, [engine, startDate, endDate, dataStoreConfig?.reports?.topUsersChanges]);

  return { chartData, usernames, loading, error };
};
