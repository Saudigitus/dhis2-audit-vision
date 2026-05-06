import { useState } from "react";
import { useRecoilValue } from "recoil";
import { format, addDays } from "date-fns";
import { useDataEngine } from "@dhis2/app-runtime";
import { SeverityRulesSchema } from "../../schema/severityRulesSchema";
import { DataStoreConfigState } from "../../packages/wrapper/types/DataStoreSchema";
import {
    buildParams, countRiskChanges, getSingleValue,
    mapChangesByType, mapRowsToSeries, mapUserActions
} from "../../utils/formater/dashboardDataFormater";
import { DashboardData } from "../../pages/Dashboard";


const QUERY = ({ id, ...rest }: any) => ({
    results: {
        resource: `sqlViews/${id}/data`,
        params: {
            var: buildParams(rest),
        },
    },
});


const useGetDashboardData = (setData: (data: DashboardData) => void) => {
    const engine = useDataEngine();
    const [loading, setLoading] = useState(true);
    const severityrules = useRecoilValue(SeverityRulesSchema);
    const dataStoreConfig = useRecoilValue(DataStoreConfigState);
    const { reports } = dataStoreConfig;

    const today = format(new Date(), "yyyy-MM-dd");
    const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

    const getDashboardData = async ({ startDate, endDate }: any) => {
        if (!severityrules?.notifications?.length)
            return;

        try {
            const [
                totalChanges, totalUpdates, todayChanges, changesByType, changesOverTime, mostActiveUsers, riskChanges] =
                await Promise.all([
                    engine.query(QUERY({ id: reports?.changesByPeriod, startDate, endDate, actionType: "ALL" })).catch(() => null),
                    engine.query(QUERY({ id: reports?.changesByPeriod, startDate, endDate, actionType: "UPDATE" })).catch(() => null),
                    engine.query(QUERY({ id: reports?.changesByPeriod, startDate: today, endDate: tomorrow, actionType: "ALL" })).catch(() => null),
                    engine.query(QUERY({ id: reports?.changesByType, startDate, endDate })).catch(() => null),
                    engine.query(QUERY({ id: reports?.changesOverTime, startDate, endDate })).catch(() => null),
                    engine.query(QUERY({ id: reports?.mostActiveUsers, startDate, endDate, offset: 1 })).catch(() => null),
                    engine.query(QUERY({ id: reports?.riskChanges, startDate, endDate })).catch(() => null),
                ]);

            setData({
                totalChanges: getSingleValue(totalChanges),
                totalUpdates: getSingleValue(totalUpdates),
                todayChanges: getSingleValue(todayChanges),
                changesByType: mapChangesByType(changesByType),
                mostActiveUsers: mapUserActions(mostActiveUsers),
                changesOverTime: mapRowsToSeries(changesOverTime),
                riskChanges: countRiskChanges({ severityRules: severityrules?.notifications, res: riskChanges }),
            });
        } catch (e) {
            console.error("Dashboard error:", e);
        }
        finally {
        }
        setLoading(false);
    };

    return { getDashboardData, loading };
};

export { useGetDashboardData };