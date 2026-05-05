import { useState } from "react";
import { useRecoilValue } from "recoil";
import { format, addDays } from "date-fns";
import { useDataEngine } from "@dhis2/app-runtime";
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema";
import { buildParams, getSingleValue, mapChangesByType, mapRowsToSeries, mapUserActions } from "../../utils/formater/dashboardDataFormater";


const QUERY = ({ id, ...rest }: any) => ({
    results: {
        resource: `sqlViews/${id}/data`,
        params: {
            var: buildParams(rest),
        },
    },
});

type DashboardData = {
    riskChanges: number;
    todayChanges: number;
    totalUpdates: number;
    totalChanges: number;

    changesByType: {
        value: number;
        name: string;
        color: string;
    }[];

    changesOverTime: {
        name: string;
        value: number;
    }[];

    mostActiveUsers: {
        name: string;
        CREATE: number;
        UPDATE: number;
        DELETE: number;
    }[];
};

const useGetDashboardData = () => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(true);
    const dataStoreConfig = useRecoilValue(DataStoreConfigState);
    const { reports } = dataStoreConfig;

    const [data, setData] = useState<DashboardData>({
        riskChanges: 0,
        todayChanges: 0,
        totalUpdates: 0,
        totalChanges: 0,
        changesOverTime: [],
        mostActiveUsers: [],
        changesByType: mapChangesByType([]),
    });

    const today = format(new Date(), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

    const getDashboardData = async ({ startDate, endDate }: any) => {
        setLoading(true);

        try {
            const [totalChanges, totalUpdates, todayChanges, changesByType, changesOverTime, mostActiveUsers]: any = await Promise.all([
                engine.query(QUERY({ id: reports?.changesByPeriod, startDate, endDate, actionType: "ALL" })),
                engine.query(QUERY({ id: reports?.changesByPeriod, startDate, endDate, actionType: "UPDATE" })),
                engine.query(QUERY({ id: reports?.changesByPeriod, startDate: today, endDate: tomorrow, actionType: "ALL" })),
                engine.query(QUERY({ id: reports?.changesByType, startDate, endDate })),
                engine.query(QUERY({ id: reports?.changesOverTime, startDate, endDate })),
                engine.query(QUERY({ id: reports?.mostActiveUsers, startDate, endDate, offset: 0 })),
            ]);

            setData({
                riskChanges: 0,
                totalChanges: getSingleValue(totalChanges),
                totalUpdates: getSingleValue(totalUpdates),
                todayChanges: getSingleValue(todayChanges),
                changesByType: mapChangesByType(changesByType?.results?.listGrid?.rows),
                mostActiveUsers: mapUserActions(mostActiveUsers?.results?.listGrid?.rows),
                changesOverTime: mapRowsToSeries(changesOverTime?.results?.listGrid?.rows),
            });
        } catch (e) {
            console.error("Dashboard error:", e);
        }

        setLoading(false);
    };

    return { getDashboardData, loading, data };
};

export { useGetDashboardData };