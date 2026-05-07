import { useState, useEffect } from 'react';
import { useDataEngine } from '@dhis2/app-runtime';
import { buildParams } from '../../utils/formater/dashboardDataFormater';
import { useParams } from '../common/useQueryParams';
import { useRecoilValue } from 'recoil';
import { DataStoreConfigState } from '../../packages/wrapper/types/DataStoreSchema';

const TOTAL_CHANGES_QUERY = ({ id, ...rest }: any) => ({
  changes: {
    resource: `sqlViews/${id}/data`,
    params: {
      paging: 'false',
      var: buildParams(rest),
    },
  },
});


export const useGetTotalChangesYear = () => {
  const engine = useDataEngine();
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const { startDate, endDate } = useParams()
  const dataStoreConfig = useRecoilValue(DataStoreConfigState)

  useEffect(() => {
    const fetchTotalChanges = async () => {
      if (!startDate || !endDate)
        return;
      try {
        const response: any = await engine.query(
          TOTAL_CHANGES_QUERY({
            endDate: endDate,
            actionType: "ALL",
            startDate: startDate,
            id: dataStoreConfig?.reports?.changesByPeriod,
          }));
        // SQL Views typically return data in listGrid or rows. 
        // Assuming the first row, first column contains the count if it's an aggregate view.
        // Or if it's a list of changes, we might need the length.
        // Given the context of "total of changes", it's likely a count.
        const rows = response.changes?.listGrid?.rows || response.changes?.rows || [];
        if (rows.length > 0 && rows[0].length > 0) {
          setTotalChanges(Number(rows[0][0]));
        } else {
          setTotalChanges(0);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalChanges();
  }, [engine, startDate, endDate, dataStoreConfig?.reports?.changesByPeriod]);

  return { totalChanges, loading, error };
};
